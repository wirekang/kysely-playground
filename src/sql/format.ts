import { formatDialect as ff, KeywordCase, mysql, postgresql, sqlite } from "sql-formatter";
import { SQLDialect } from "../typings/dialect";

export function format(
  v: {
    sql: string;
    parameters: readonly unknown[];
  },
  options: {
    keywordCase?: KeywordCase;
    dialect: SQLDialect;
  }
) {
  return ff(v.sql, {
    dialect: parseDialect(options.dialect),
    keywordCase: options.keywordCase ?? "preserve",
    params: convertParams(
      v.parameters.map((p) => escapeParam(p)),
      options.dialect
    ),
  });
}

function parseDialect(dialect: SQLDialect) {
  switch (dialect) {
    case "mysql":
      return mysql;
    case "postgres":
      return postgresql;
    case "sqlite":
      return sqlite;
  }
}

function escapeParam(v: any) {
  if (typeof v !== "string") {
    return `${v}`;
  }
  const wrap = "'";
  return `${wrap}${v}${wrap}`;
}

function convertParams(p: string[], dialect: SQLDialect) {
  if (dialect === "postgres") {
    const rst: any = {};
    Object.keys(p).forEach((key, i) => {
      rst[i + 1] = p[key as any];
    });
    return rst;
  }
  return p;
}
