const hr = ["", "---", ""]
const fromPlayground = ["@from_playground", "The whole comment is from playground.", ...hr]
const mockType = [...fromPlayground, "@mock_type", "The original type definition is too large for it's worth.", ...hr]

function comment(lines: string[], indent = 4): string {
    const space = " ".repeat(indent)
    return `/**\n${lines.map(v => `${space}* ${v}`).join("\n")}${space}*/`
}

const kyselyComment = comment([...fromPlayground, "Kysely instance for playground.", "You can use `db` instead."])
const dbComment = comment([...fromPlayground, "Alias for `kysely`"])
const bufferComment = comment([...mockType, "Node built-in Buffer"])

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
