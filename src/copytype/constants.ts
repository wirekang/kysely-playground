import KyselyInfo from "../../node_modules/kysely/package.json";

export const KYSELY_GLOBAL_TYPE = `
import {Kysely} from 'kysely';
declare global {
  interface DB{};
  declare const kysely: Kysely<DB>;
}
`;
export const KYSELY_VERSION = KyselyInfo.version;
