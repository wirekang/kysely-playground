import { SqlDialect } from "src/lib/sql/types/SqlDialect"

export type SharedState = {
  dialect: SqlDialect
  ts: string
  kyselyVersion: string
}
