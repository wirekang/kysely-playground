import { atom } from "recoil"
import { SqlFormatOptions } from "src/lib/sql/types/SqlFormatOptions"

export const sqlFormatOptionsState = atom<SqlFormatOptions>({
  key: "sqlFormatOptions",
  default: {
    lowerKeywords: false,
    inlineParameters: false,
  },
})
