import type { State } from "./state/state";

export const DEBUG = (() => {
  if (typeof window === "undefined") {
    return false;
  }
  return new URLSearchParams(window.location.search).has("debug");
})();

export const JSDELIVR_API_SERVER = "https://data.jsdelivr.com";
export const JSDELIVR_API_LIST_TAGS = `${JSDELIVR_API_SERVER}/v1/packages/npm/`;
export const JSDELIVR_ESM = "https://esm.run";

export const GITHUB_MINIFIED_KYSELY_OWNER = "wirekang";
export const GITHUB_MINIFIED_KYSELY_REPO = "minified-kysely";
export const GITHUB_MINIFIED_KYSELY_MAIN_BRANCH = "main";

export const GITHUB_API_MINIFIED_KYSELY_MAIN_REFS = `https://api.github.com/repos/${GITHUB_MINIFIED_KYSELY_OWNER}/${GITHUB_MINIFIED_KYSELY_REPO}/git/refs/heads/${GITHUB_MINIFIED_KYSELY_MAIN_BRANCH}`;

export const FIRESTORE_PROJECT_ID = "kysely-playground";
export const FIRESTORE_COLLECTION_FRAGMENTS = "states";

export const CSS_MIN_WIDE_WIDTH = 600;

export const LOCALSTORAGE_THEME = "theme";
export const LOCALSTORAGE_SETTINGS = "settings:";
export const LOCALSTORAGE_HTTP_CACHE = "cache:";

export const LEGACY_PLAYGROUND_URL = "https://old.kyse.link";

export const QUERY_EDITOR_HEADER_DELIMITER = "\n/* __QUERY_EDITOR_HEADER_DELIMITER__ */\n";

export const SETTING_KEYS = [
  "ts-format:semi",
  "ts-format:single-quote",
  "ts-format:wider-width",
  "sql-format:inline-parameters",
  "sql-format:upper-keywords",
  "save:format-before-save",
  "save:copy-url-after-save",
  "save:save-view-state",
  "editor:indent-guide",
] as const;

export const SETTING_DEFAULTS: Record<(typeof SETTING_KEYS)[number], boolean> = {
  "ts-format:semi": true,
  "ts-format:single-quote": false,
  "ts-format:wider-width": false,
  "sql-format:inline-parameters": false,
  "sql-format:upper-keywords": true,
  "save:format-before-save": true,
  "save:copy-url-after-save": true,
  "save:save-view-state": true,
  "editor:indent-guide": true,
};

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
import { Generated, ColumnType } from "kysely";

export interface Database {
  person: Person;
  pet: Pet;
  toy: Toy;
  "toy_schema.toy": Toy;
}

export interface Person {
  id: Generated<number>;
  first_name: string | null;
  middle_name: ColumnType<
    string | null,
    string | undefined,
    string | undefined
  >;
  last_name: string | null;
  gender: Gender;
  marital_status: MaritalStatus | null;
  children: Generated<number>;
}

export interface Pet {
  id: Generated<number>;
  name: string;
  owner_id: number;
  species: Species;
}

export interface Toy {
  id: Generated<number>;
  name: string;
  price: number;
  pet_id: number;
}

export type Gender = "male" | "female" | "other";
export type MaritalStatus =
  | "single"
  | "married"
  | "divorced"
  | "widowed";
export type Species = "dog" | "cat" | "hamster";
    `.trim(),
    query: `
import { sql } from "kysely";
import { Species } from "type-editor";

const species: Species = "hamster";

const rows = await db
  .selectFrom("person")
  .innerJoin("pet", "owner_id", "person.id")
  .innerJoin("toy", "pet_id", "pet.id")
  .where("first_name", "=",sql.lit("Jennifer"))
  .where("species", "=", species)
  .select([
    "first_name",
    "pet.name as pet_name",
    "toy.name as toy_name",
  ])
  .execute();
`.trim(),
  },
};
