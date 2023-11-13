const hr = ["", "---", ""]
const playground = ["@playground", "The whole comment is from kysely-playground.", ...hr]
const typeOmitted = [
  ...playground,
  "@type_omitted",
  "The original type definition is too large for its worth at playground.",
  ...hr,
]

function comment(lines: string[], indent = 4): string {
  const space = " ".repeat(indent)
  return `/**\n${lines.map((v) => `${space}* ${v}`).join("\n")}${space}*/`
}

const kyselyComment = comment([...playground, "Kysely instance for playground.", "You can also use `db`."])
const dbComment = comment([...playground, "Alias for `kysely`"])
const bufferComment = comment([...typeOmitted, "Node built-in Buffer"])

export class TypescriptConstants {
  public static readonly PLAYGROUND_GLOBAL_TYPE_CONTENT = `
  import {Kysely} from 'kysely';
  
  declare global {
    interface DB {}
    
    ${kyselyComment}
    const kysely: Kysely<DB>
    
    ${dbComment}
    const db: Kysely<DB>
    
    ${bufferComment}
    interface Buffer extends Uint8Array {}
  }
  `
}
