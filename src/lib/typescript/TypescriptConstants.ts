export class TypescriptConstants {
  public static readonly PLAYGROUND_GLOBAL_TYPE_CONTENT = `
  import {Kysely, sql as kyselySql} from 'kysely';
  
  declare global {
    interface DB {}
    
    /**
    * PLAYGROUND: You can use \`db\` instead.
    */
    const kysely: Kysely<DB>
    
    /**
    * PLAYGROUND: Alias for \`kysely\`.
    */
    const db: Kysely<DB>
    
    /**
    * PLAYGROUND
    * @deprecated
    * use \`kysely.execute()\` instead.
    * \`\`\`ts
    * kysely.selectFrom("person").selectAll().execute()
    * \`\`\`
    */
    let result:any
  }
  `
}
