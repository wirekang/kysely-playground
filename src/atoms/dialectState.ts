import { atom } from "recoil"
import { SqlDialect } from "src/lib/sql/types/SqlDialect"

export const dialectState = atom({
  key: "dialect",
  default: SqlDialect.Postgres,
})
