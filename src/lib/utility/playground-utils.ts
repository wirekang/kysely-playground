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
/**
 * [playground]
 * 
 * A \`Kysely\` instance with \`Database\` type from \`type-editor\`.
 * 
 * \`\`\`ts
 * import type { Database } from "type-editor";
 * const db: Kysely<Database>;
 * \`\`\`
 */
declare const db: import("kysely").Kysely<import("type-editor").Database>;
// prettier-ignore
// @ts-ignore
const db = (await import("playground")).init(${k}.Kysely,new ${k}.${adapter}(),new ${k}.${introspector}(),new ${k}.${queryCompiler}()).kysely;
// prettier-ignore
export {}
      `.trim() + QUERY_EDITOR_HEADER_DELIMITER
    );
  }

  static trimQueryEditorHeader(v: string) {
    const i = v.indexOf(QUERY_EDITOR_HEADER_DELIMITER);
    return v.substring(i + QUERY_EDITOR_HEADER_DELIMITER.length);
  }
}
