import type { State } from "./state/state";

export const JSDELIVR_API_SERVER = "https://data.jsdelivr.com";
export const JSDELIVR_API_LIST_TAGS = `${JSDELIVR_API_SERVER}/v1/packages/npm/`;
export const JSDELIVR_ESM = "https://esm.run";

export const GITHUB_MINIFIED_KYSELY_OWNER = "wirekang";
export const GITHUB_MINIFIED_KYSELY_REPO = "minified-kysely";
export const GITHUB_MINIFIED_KYSELY_MAIN_BRANCH = "main";

export const GITHUB_API_MINIFIED_KYSELY_MAIN_REFS = `https://api.github.com/repos/${GITHUB_MINIFIED_KYSELY_OWNER}/${GITHUB_MINIFIED_KYSELY_REPO}/git/refs/heads/${GITHUB_MINIFIED_KYSELY_MAIN_BRANCH}`;

export const FIRESTORE_PROJECT_ID = "kysely-playground";
export const FIRESTORE_COLLECTION_FRAGMENTS = "states";

export const CSS_MIN_WIDE_WIDTH = 650;

export const LOCALSTORAGE_THEME = "theme";

export const LEGACY_PLAYGROUND_URL = "https://old.kyse.link";

export const QUERY_EDITOR_HEADER_DELIMITER = "\n/* __QUERY_EDITOR_HEADER_DELIMITER__ */\n\n";

export const DIALECT_CONSTRUCTORS = {
  postgres: {
    adapter: "PostgresAdapter",
    introspector: "PostgresIntrospector",
    queryCompiler: "PostgresQueryCompiler",
  },
  mysql: {
    adapter: "MysqlAdapter",
    introspector: "MysqlIntrospector",
    queryCompiler: "MysqlQueryCompiler",
  },
  mssql: {
    adapter: "MssqlAdapter",
    introspector: "MssqlIntrospector",
    queryCompiler: "MssqlQueryCompiler",
  },
  sqlite: {
    adapter: "SqliteAdapter",
    introspector: "SqliteIntrospector",
    queryCompiler: "SqliteQueryCompiler",
  },
};

export const DEFUALT_STATE: State = {
  dialect: "postgres",
  editors: {
    type: `
import {
  ColumnType,
  Generated,
  Insertable,
  JSONColumnType,
  Selectable,
  Updateable
} from 'kysely'

export type Database = {
  person: PersonTable
  pet: PetTable
}

export interface PersonTable {
  id: Generated<number>
  first_name: string
  gender: 'man' | 'woman' | 'other'
  last_name: string | null
  created_at: ColumnType<Date, string | undefined, never>
    metadata: JSONColumnType<{
    login_at: string;
    ip: string | null;
    agent: string | null;
    plan: 'free' | 'premium';
  }>
}

export type Person = Selectable<PersonTable>
export type NewPerson = Insertable<PersonTable>
export type PersonUpdate = Updateable<PersonTable>

export interface PetTable {
  id: Generated<number>
  name: string
  owner_id: number
  species: 'dog' | 'cat'
}

export type Pet = Selectable<PetTable>
export type NewPet = Insertable<PetTable>
export type PetUpdate = Updateable<PetTable>
    `.trim(),
    query: `await db.selectFrom('person')
  .where('id', '=', 42)
  .selectAll()
  .executeTakeFirst()`,
  },
};
