import type { ShareableState } from "src/lib/state/types/ShareableState"
import { SqlDialect } from "src/lib/sql/types/SqlDialect"

export class StateConstants {
  public static readonly DEFAULT_SHAREABLE_STATE: ShareableState = {
    dialect: SqlDialect.Postgres,
    kyselyVersion: "",
    ts: "",
  }
}
