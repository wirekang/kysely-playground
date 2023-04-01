import { SqlDialect } from "../typings/state";

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
  schema: `
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
  statements: `
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
  "new expression in 0.24": `
 interface DB {
  person: {
    id: Generated<number>
    first_name: string
    last_name: string
  }
  pet: {
    id: Generated<number>
    owner_id: number
    species: string
  }
}

result = db
  .selectFrom('person')
  .where(({ and, or, cmpr, not, exists, selectFrom }) =>
    or([
      and([
        cmpr('first_name', '=', 'foo'),
        cmpr('last_name', '=', 'bar'),
      ]),
      not(
        exists(
          selectFrom('pet')
            .select('pet.id')
            .whereRef('pet.owner_id', '=', 'person.id')
            .where('pet.species', 'in', ['dog', 'cat']),
        ),
      ),
    ]),
  )
 
  `,
};

export const SQL_DIALECTS: SqlDialect[] = ["mysql", "postgres", "sqlite"];
