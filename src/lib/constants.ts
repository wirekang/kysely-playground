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

export const QUERY_EDITOR_HEADER_DELIMITER = "\n/* __QUERY_EDITOR_HEADER_DELIMITER__ */\n";

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
    query: `await db
  .selectFrom("person")
  .select("person.last_name as ln")
  .where("first_name", "=", "Jennifer")
  .execute();

await db
  .selectFrom("person")
  .innerJoin("pet", "owner_id", "person.id")
  .innerJoin("toy", "pet_id", "pet.id")
  .where("first_name", "=", "Jennifer")
  .select([
    "first_name",
    "pet.name as pet_name",
    "toy.name as toy_name",
  ])
  .execute();
`.trim(),
  },
};
