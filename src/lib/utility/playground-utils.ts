import { DIALECT_CONSTRUCTORS, QUERY_EDITOR_HEADER_DELIMITER } from "../constants";

export class PlaygroundUtils {
  static getEntrypointUrl() {
    return window.origin + "/playground.js";
  }

  static makeQueryEditorHeader(dialect: string) {
    const { adapter, introspector, queryCompiler } =
      DIALECT_CONSTRUCTORS[dialect as keyof typeof DIALECT_CONSTRUCTORS];

    const k = '(await import("kysely"))';
    return (
      `
// prettier-ignore
// @ts-ignore
const __playground_init_result__ = (await import("playground")).init(${k}.Kysely,new ${k}.${adapter}(),new ${k}.${introspector}(),new ${k}.${queryCompiler}());
const kysely: import("kysely").Kysely<import("type-editor").Database> = __playground_init_result__.kysely;
const db = kysely;
export {}
      `.trim() + QUERY_EDITOR_HEADER_DELIMITER
    );
  }

  static trimQueryEditorHeader(v: string) {
    const i = v.indexOf(QUERY_EDITOR_HEADER_DELIMITER);
    return v.substring(i + QUERY_EDITOR_HEADER_DELIMITER.length);
  }
}
