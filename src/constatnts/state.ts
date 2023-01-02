import { SqlDialect } from "../typings/state";

export const DEFAULT_TS = `
interface DB {
  user: UserTable
}

interface UserTable {
  id: Generated<string>
  name: string | null
  created_at: Generated<Date>
}

result = kysely
  .selectFrom("user")
  .selectAll()
  .where("name", "=", "foo")
  .orderBy("created_at", "desc")
`.trim();

export const EXAMPLES: Record<string, string> = {
  "disable type hinting": `
interface DB {
  [x: string]: any
}

result = kysely
  .selectFrom("person")
  .select(["first_name", "last_name"])
  .where("id", ">", 234)
`,
  "DB schema": `
interface DB {
  user: UserTable
}

interface UserTable {
  id: Generated<string>
  first_name: string | null
  last_name: string | null
  created_at: Generated<Date>
}

result = kysely
  .selectFrom("user")
  .selectAll()
  .orderBy("created_at")
`,
  statement: `
interface DB {
  [x: string]: any
}

let query = kysely
  .selectFrom("user")
  .selectAll()

if (1 == 1) {
  query = query.orderBy("id")
} else {
  query = query.orderBy("created_at")
}

result = query
    `,
  "sql template string": `
interface DB {
  user: UserTable
}

interface UserTable {
  id: Generated<string>
  first_name: string | null
  last_name: string | null
  created_at: Generated<Date>
}

result = kysely
  .selectFrom("user")
  .select(sql<string>\`concat(first_name, ' ', last_name)\`.as("full_name"))
    `,
};

export const SQL_DIALECTS: SqlDialect[] = ["mysql", "postgres", "sqlite"];
