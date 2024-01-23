import { LEGACY_PLAYGROUND_URL } from "../constants";
import { logger } from "../utility/logger";
import { StringUtils } from "../utility/string-utils";
import { ValidateUtils } from "../utility/validate-utils";
import { FirestoreStateRepository } from "./firestore-state-repository";

export class StateManager {
  constructor(private readonly firestoreStateRepository: FirestoreStateRepository) {}

  /**
   * Sync state into url fragment.
   */
  async save(state: State, shorten: boolean) {
    validate(state);
    logger.debug("encode state");
    const encoded = await encode(JSON.stringify(state));
    let header: FragmentHeader;
    let body: string;
    if (shorten) {
      header = "f";
      body = await this.firestoreStateRepository.add(encoded);
    } else {
      header = "r";
      body = encoded;
    }
    window.location.hash = header + "/" + body;
  }

  /**
   * Parse state from url fragment.
   *
   * @returns decoded state or null if fragment is empty.
   */
  async load(): Promise<State | null> {
    checkLegacyParams();
    const fragment = StringUtils.trimPrefix(window.location.hash, "#");
    if (fragment === "") {
      logger.debug("no fragment");
      return null;
    }
    const delimiterIndex = fragment.indexOf("/");
    if (delimiterIndex === -1) {
      throw new StateManagerError("no delimiter in fragment");
    }
    const header = fragment.substring(0, delimiterIndex) as FragmentHeader;
    const body = fragment.substring(delimiterIndex + 1);
    let json: string;
    switch (header) {
      case "r": {
        logger.debug("raw fragment");
        json = await decode(body);
        break;
      }
      case "f": {
        logger.debug(`get firestore state by id ${body}`);
        json = await decode(await this.firestoreStateRepository.get(body));
        break;
      }
      default:
        throw new StateManagerError(`unknown header ${header}`);
    }
    const state = JSON.parse(json) as State;
    validate(state);
    return state;
  }
}

async function encode(v: string) {
  const { compressToEncodedURIComponent } = await import("lz-string");
  return compressToEncodedURIComponent(v);
}

async function decode(v: string) {
  const { decompressFromEncodedURIComponent } = await import("lz-string");
  return decompressFromEncodedURIComponent(v);
}

function checkLegacyParams() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("i") !== null && params.get("p") !== null) {
    logger.info("legacy params");
    window.location.href = LEGACY_PLAYGROUND_URL + window.location.search;
  }
}

function validate(s: State) {
  ValidateUtils.typeEqual(s.editors, "object", "State.editors");
  ValidateUtils.typeEqual(s.editors.type, "string", "State.editors.type");
  ValidateUtils.typeIncludes(s.views, ["string", "undefined"], "State.views");
  ValidateUtils.typeIncludes(s.views?.type, ["boolean", "undefined"], "State.views.type");
  ValidateUtils.typeIncludes(s.views?.query, ["boolean", "undefined"], "State.views.query");
  ValidateUtils.typeIncludes(s.views?.result, ["boolean", "undefined"], "State.views.result");
}

export type State = {
  editors: {
    type: string;
    query: string;
  };
  views?: {
    type?: boolean;
    query?: boolean;
    result?: boolean;
  };
};

/**
 * r = raw
 *
 * f = firestore
 */
type FragmentHeader = "r" | "f";

class StateManagerError extends Error {}
