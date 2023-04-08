import { SqlDialect } from "src/lib/sql/types/SqlDialect"
import { SqlFormatOption } from "src/lib/sql/types/SqlFormatOption"

export type State = {
  dialect: SqlDialect
  ts: string
  kyselyVersion: string
  sqlFormatOption: SqlFormatOption
}
