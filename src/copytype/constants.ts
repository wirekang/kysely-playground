import KyselyInfo from "../../node_modules/kysely/package.json";

export const KYSELY_GLOBAL_TYPE = `
import {Kysely, Compilable, Generated as kyselyGenerated, sql as kyselySql} from 'kysely';
declare global {
  interface DB{};
  declare const kysely: Kysely<DB>;
  declare let result: Compilable<any>;
  type Generated<T> = kyselyGenerated<T>;
  declare const sql = kyselySql;
}
`;
export const KYSELY_VERSION = KyselyInfo.version;
