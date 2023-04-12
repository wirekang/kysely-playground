import { atom } from "recoil"
import { SqlResult } from "src/lib/sql/types/SqlResult"

export const sqlResultState = atom<SqlResult>({
  key: "sql",
  default: {
    sql: "",
    parameters: [],
  },
})
