import type { SharedState } from "src/lib/state/types/SharedState"
import { SqlDialect } from "src/lib/sql/types/SqlDialect"

export class StateConstants {
  public static readonly DEFAULT_SHARED_STATE: SharedState = {
    dialect: SqlDialect.Postgres,
    kyselyVersion: "",
    ts: "",
  }
}
