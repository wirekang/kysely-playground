import {
  CompiledQuery,
  Dialect,
  Kysely,
  MysqlDialect,
  PostgresDialect,
  SqliteDialect,
} from "kysely";
import { transpile } from "typescript";

export function compile(
  ts: string,
  options: {
    dialect: "mysql" | "postgres" | "sqlite";
  }
) {
  let dialect: Dialect;
  switch (options.dialect) {
    case "postgres":
      dialect = new PostgresDialect({} as any);
      break;
    case "sqlite":
      dialect = new SqliteDialect({} as any);
      break;
    default:
      dialect = new MysqlDialect({} as any);
  }

  // @ts-ignore
  const kysely = new Kysely({ dialect });
  const compilable = eval(transpile(ts));
  if (!compilable.compile) {
    throw new Error("TODO: no compile()");
  }
  const query: CompiledQuery = compilable.compile();
  return query;
}
