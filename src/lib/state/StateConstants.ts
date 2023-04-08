import type { State } from "./types/State"
import { SqlDialect } from "src/lib/sql/types/SqlDialect"

export class StateConstants {
  public static readonly DEFAULT_STATE: State = {
    dialect: SqlDialect.Postgres,
    kyselyVersion: "",
    ts: "",
    sqlFormat: {
      inlineParameters: false,
      lowerKeywords: false,
    },
  }
}
