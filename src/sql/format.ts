import { formatDialect as ff, KeywordCase, mysql, postgresql, sqlite } from "sql-formatter";

export function format(
  v: {
    sql: string;
    parameters: readonly unknown[];
  },
  options: {
    keywordCase?: KeywordCase;
    language: "mysql" | "postgres" | "sqlite";
  }
) {
  return ff(v.sql, {
    dialect: parseDialect(options.language),
    keywordCase: options.keywordCase ?? "preserve",
    params:
      // https://github.com/sql-formatter-org/sql-formatter/issues/546
      options.language === "postgres"
        ? undefined
        : v.parameters.map((p) => escapeParam(p, options.language)),
  });
}

function parseDialect(language: "mysql" | "postgres" | "sqlite") {
  switch (language) {
    case "mysql":
      return mysql;
    case "postgres":
      return postgresql;
    case "sqlite":
      return sqlite;
  }
}

function escapeParam(v: any, language: "mysql" | "postgres" | "sqlite") {
  if (typeof v !== "string") {
    return `${v}`;
  }
  let wrap = '"';
  switch (language) {
    case "postgres":
      wrap = `'`;
  }
  return `${wrap}${v}${wrap}`;
}
