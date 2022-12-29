import {
  Compilable,
  Dialect,
  Kysely,
  MysqlDialect,
  PostgresDialect,
  SqliteDialect,
  sql as kyselySQL,
} from "kysely";
import { transpile } from "typescript";
import { SQLDialect } from "../typings/dialect";

export function compile(
  ts: string,
  options: {
    dialect: SQLDialect;
  }
) {
  const { result } = doEval({ ts, dialect: newKyselyDialect(options.dialect) });
  if (result === null) {
    throw new NoResultException();
  }
  if (typeof result.compile !== "function") {
    throw new ResultIsNotCompilableException();
  }
  return result.compile();
}

function newKyselyDialect(dialect: SQLDialect) {
  switch (dialect) {
    case "postgres":
      return new PostgresDialect({} as any);
      break;
    case "sqlite":
      return new SqliteDialect({} as any);
      break;
    default:
      return new MysqlDialect({} as any);
  }
}

function doEval(thisIsArgumentVariableName: { ts: string; dialect: Dialect }) {
  const sql = kyselySQL;
  const kysely = new Kysely({ dialect: thisIsArgumentVariableName.dialect });
  const db = kysely;
  let result: Compilable<any> | null = null as any;
  eval(transpile(thisIsArgumentVariableName.ts));

  // prevent minification
  return { kysely, db, result, sql };
}

export class NoResultException extends Error {
  constructor() {
    super(
      "no result.\nVariable result should be an Compilable such as SelectQueryBuilder.\nEx: result = kysely.selectFrom('person').selectAll()"
    );
  }
}

export class ResultIsNotCompilableException extends Error {
  constructor() {
    super("result is not a compilable");
  }
}
