import { atom } from "recoil"
import { SqlDialect } from "src/lib/sql/types/SqlDialect"

export const sqlDialectState = atom({
  key: "sqlDialect",
  default: SqlDialect.Postgres,
})
