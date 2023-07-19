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
    try {
      const params = option.inlineParameters
        ? SqlFormatUtils.getParams(parameters.map(SqlFormatUtils.inline), dialect)
        : undefined
      return (
        format(sql, {
          language: SqlFormatUtils.dialectLanguageMap[dialect],
          keywordCase: option.lowerKeywords ? "lower" : "upper",
          params,
        }) + this.formatParameters(parameters)
      )
    } catch (e: unknown) {
      return `-- Failed to format sql\n\n${sql}${this.formatParameters(parameters)}`
    }
  }

  private static formatParameters(parameters: any[]): string {
    if (parameters.length === 0) {
      return ""
    }

    return "\n\n-- Parameters\n" + parameters.map((v, i) => `-- [${i + 1}] ${v}`).join("\n")
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

  private static inline(v: any): string {
    if (typeof v === "string") {
      return `'${v}'`
    }
    return `${v}`
  }
}
