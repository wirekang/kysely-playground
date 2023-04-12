import type { SqlFormatOptions } from "src/lib/sql/types/SqlFormatOptions"
import { format } from "sql-formatter"
import { SqlDialect } from "src/lib/sql/types/SqlDialect"

export class SqlFormatUtils {
  private static readonly dialectLanguageMap = {
    [SqlDialect.Postgres]: "postgresql",
    [SqlDialect.Mysql]: "mysql",
    [SqlDialect.Sqlite]: "sqlite",
  }
  public static format(sql: string, parameters: any[], dialect: SqlDialect, option: SqlFormatOptions): string {
    const params = option.inlineParameters
      ? SqlFormatUtils.getParams(parameters.map(SqlFormatUtils.escape), dialect)
      : undefined
    return (
      format(sql, {
        language: SqlFormatUtils.dialectLanguageMap[dialect],
        keywordCase: option.lowerKeywords ? "lower" : "upper",
        params,
      }) + this.formatParameters(parameters)
    )
  }

  private static formatParameters(parameters: any[]): string {
    return "\n\n-- Parameters\n" + parameters.map((v, i) => `-- $${i + 1}: ${v}`).join("\n")
  }

  private static getParams(parameters: any[], dialect: SqlDialect): any {
    if (dialect === SqlDialect.Postgres) {
      const rst: any = {}
      parameters.forEach((value, i) => {
        rst[i + 1] = value
      })
      return rst
    }
    return parameters
  }

  private static escape(v: any): any {
    if (typeof v === "string") {
      return `'${v}'`
    }
    return v
  }
}
