export class TypeConstants {
  public static readonly GLOBAL = `
  import {Kysely, Compilable,ColumnType as kyselyColumnType, Generated as kyselyGenerated, sql as kyselySql} from 'kysely';
  declare global {
    interface DB {}
    const kysely: Kysely<DB>
    const db: Kysely<DB>
    let result: Compilable<any>
    type Generated<T> = kyselyGenerated<T>
    type ColumnType<S,I = S,U = S> = kyselyColumnType<S,I,U>
    const sql: typeof kyselySql
  }
  `.trim();

  public static readonly GLOBAL_ANY_DB = TypeConstants.GLOBAL.replace(
    "interface DB {}",
    "interface DB{[x:string]:any}"
  );
}
