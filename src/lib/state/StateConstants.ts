import type { ShareableState } from "src/lib/state/types/ShareableState"
import { SqlDialect } from "src/lib/sql/types/SqlDialect"

export class StateConstants {
  public static readonly DEFAULT_SHAREABLE_STATE: ShareableState = {
    dialect: SqlDialect.Postgres,
    kyselyVersion: "0.24.0",
    ts:
      "kysely\n" +
      '  .selectFrom("asdf")\n' +
      '  .select(["first_name", "last_name"])\n' +
      '  .where("id", "=", 123456)\n' +
      "  .execute()\n",
  }
}
