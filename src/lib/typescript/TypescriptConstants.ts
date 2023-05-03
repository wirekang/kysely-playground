export class TypescriptConstants {
  public static readonly PLAYGROUND_GLOBAL_TYPE_CONTENT = `
  import {Kysely} from 'kysely';
  
  declare global {
    interface DB {}
    
    /**
    *  \`THIS MESSAGE IS FROM PLAYGROUND.\`
    *
    * Pre-defined Kysely instance.
    * You can use \`db\` instead.
    */
    const kysely: Kysely<DB>
    
    /**
    *  \`THIS MESSAGE IS FROM PLAYGROUND.\`
    *
    * Alias for \`kysely\`.
    */
    const db: Kysely<DB>

    /**
    *  \`THIS MESSAGE IS FROM PLAYGROUND.\`
    *
    * @deprecated
    * use \`import { Generated } from "kysely"\` instead.
    */
    interface Generated<T> {}
    
    /**
    *  \`THIS MESSAGE IS FROM PLAYGROUND.\`
    *
    * @deprecated
    * use \`import { ColumnType } from "kysely"\` instead.
    */
    interface ColumnType<A,B=A,C=A> {}
    
    /**
    *  \`THIS MESSAGE IS FROM PLAYGROUND.\`
    *
    * @deprecated
    * use \`import { sql } from "kysely"\` instead.
    */
    const sql: any
  }
  `
}
