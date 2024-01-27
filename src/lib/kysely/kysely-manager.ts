import { HttpUtils } from "../utility/http-utils";
import {
  GITHUB_API_MINIFIED_KYSELY_MAIN_REFS,
  GITHUB_MINIFIED_KYSELY_OWNER,
  GITHUB_MINIFIED_KYSELY_REPO,
} from "../constants";
import { JsDelivrUtils } from "../utility/jsdelivr-utils";
import { KyselyModule } from "./kysely-module";

export class KyselyManager {
  static async init(): Promise<KyselyManager> {
    const minifiedCommitId = await getLatestMinifiedCommitId();
    const infoJson = await getInfoJson(minifiedCommitId);
    const lastCommitId = infoJson.lastCommitId;
    const modules: Array<KyselyModule> = [];

    infoJson.tags.forEach((tag: any) => {
      modules.unshift(
        new KyselyModule(
          "tag",
          tag.name,
          tag.commitId,
          minifiedCommitId,
          tag.dir,
          tag.files,
          tag.exports,
          tag.dependencies,
          tag.dialects,
        ),
      );
    });
    infoJson.branches.forEach((branch: any) => {
      modules.unshift(
        new KyselyModule(
          "branch",
          branch.name,
          branch.commitId,
          minifiedCommitId,
          branch.dir,
          branch.files,
          branch.exports,
          branch.dependencies,
          branch.dialects,
        ),
      );
    });

    return new KyselyManager(minifiedCommitId, lastCommitId, modules);
  }

  private constructor(
    private readonly minifiedCommitId: string,
    readonly lastCommitId: string,
    private readonly modules: ReadonlyArray<KyselyModule>,
  ) {}

  getModule(id: string) {
    return this.modules.find((it) => it.id === id);
  }

  findModule(type: string, name: string): KyselyModule | undefined {
    return this.modules.find((it) => it.type === type && it.name === name);
  }

  getModuleIds(): Array<string> {
    return this.modules.map((m) => m.id);
  }

  getLatestTagModule(): KyselyModule {
    return this.modules.find((m) => m.type === "tag")!;
  }
}

async function getLatestMinifiedCommitId() {
  try {
    return (await HttpUtils.getJsonOrCache(GITHUB_API_MINIFIED_KYSELY_MAIN_REFS, 120)).object.sha as string;
  } catch (e) {
    throw Error(`GitHub API Error: ${e}`);
  }
}

function getInfoJson(commitId: string) {
  return HttpUtils.getJson(
    JsDelivrUtils.github(
      GITHUB_MINIFIED_KYSELY_OWNER,
      GITHUB_MINIFIED_KYSELY_REPO,
      commitId,
      "dist/info.json",
    ),
  );
}
