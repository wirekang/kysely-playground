import { SqlDialect } from "src/lib/sql/types/SqlDialect"

export type ShareableState = {
  dialect: SqlDialect
  ts: string
  kyselyVersion: string
}
