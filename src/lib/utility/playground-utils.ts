import { DIALECT_CONSTRUCTORS, QUERY_EDITOR_HEADER_DELIMITER } from "../constants";

export class PlaygroundUtils {
  static getEntrypointUrl() {
    return window.origin + "/playground.js";
  }

  static makeQueryEditorHeader(dialect: string) {
    const { adapter, introspector, queryCompiler } =
      DIALECT_CONSTRUCTORS[dialect as keyof typeof DIALECT_CONSTRUCTORS];

    return (
      `
// prettier-ignore
// @ts-ignore
import { init as __$$0 } from "playground";
// prettier-ignore
// @ts-ignore
import { Kysely as __$$1, ${adapter} as __$$2, ${introspector} as __$$3, ${queryCompiler} as __$$4 } from "kysely";
// prettier-ignore
// @ts-ignore
const __$$5 = __$$0(__$$1,new __$$2(),new __$$3(),new __$$4())
import type { Kysely } from "kysely";
import type { Database } from "./type-editor"
const kysely: Kysely<Database> = __$$5.kysely;
const db = kysely;
      `.trim() + QUERY_EDITOR_HEADER_DELIMITER
    );
  }

  static trimQueryEditorHeader(v: string) {
    const i = v.indexOf(QUERY_EDITOR_HEADER_DELIMITER);
    return v.substring(i + QUERY_EDITOR_HEADER_DELIMITER.length);
  }
}
