export class TypescriptConstants {
  public static readonly PLAYGROUND_GLOBAL_TYPE_CONTENT = `
  import {Kysely} from 'kysely';
  
  declare global {
    interface DB {}
    
    /**
    *  \`THIS MESSAGE IS FROM PLAYGROUND.\`
    *
    * Kysely instance for playground.
    * You can use \`db\` instead.
    */
    const kysely: Kysely<DB>
    
    /**
    *  \`THIS MESSAGE IS FROM PLAYGROUND.\`
    *
    * Alias for \`kysely\`.
    */
    const db: Kysely<DB>
  }
  `
}
