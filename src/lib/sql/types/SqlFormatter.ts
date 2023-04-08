import type { SqlDialect } from "src/lib/sql/types/SqlDialect"

export type SqlFormatter = {
  readonly dialect: SqlDialect
  format: (sql: string) => Promise<string>
}
