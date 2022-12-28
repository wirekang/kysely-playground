export const examples: { name: string; ts: string }[] = [
  {
    name: "disable type hinting",
    ts: `
interface DB {
  [x: string]: any
}

result = kysely
  .selectFrom("person")
  .select(["first_name", "last_name"])
  .where("id", ">", 234)
`,
  },
  {
    name: "DB schema",
    ts: `
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
  },
  {
    name: "statement",
    ts: `
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
  },
];
