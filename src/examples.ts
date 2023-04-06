import { ExampleItem } from "./typings/example";

export const EXAMPLES: ExampleItem[] = [
  {
    name: "simple",
    enableSchema: false,
    ts: `
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
  user: User
}

interface User {
  id: string
  first_name: string | null
  last_name: string
}

result = kysely
  .selectFrom('user')
  .select(['first_name', 'last_name'])
    `,
  },
  {
    name: "importing",
    ts: `
import { ExpressionBuilder } from 'kysely'

declare global {
  interface DB {
    user: User
  }
}

interface User {
  id: string
  first_name: string | null
  last_name: string
}

result = kysely
  .selectFrom('user')
  .select(['first_name', 'last_name'])
  .where(selectNames)

function selectNames({ and, cmpr }: ExpressionBuilder<DB, 'user'>) {
  return and([
    cmpr('first_name', '=', 'foo'),
    cmpr('last_name', '=', 'bar'),
  ])
}
    `,
  },
];
