import KyselyInfo from "../../node_modules/kysely/package.json";

export const KYSELY_GLOBAL_TYPE = `
import {Kysely, Compilable, Generated as G} from 'kysely';
declare global {
  interface DB{};
  declare const kysely: Kysely<DB>;
  declare let result: Compilable<any>;
  type Generated<T> = G<T>;
}
`;
export const KYSELY_VERSION = KyselyInfo.version;
