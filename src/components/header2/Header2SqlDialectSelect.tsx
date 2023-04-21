import { Header2Select } from "src/components/header2/Header2Select"
import { useRecoilState } from "recoil"
import { sqlDialectState } from "src/lib/sql/atoms/sqlDialectState"
import { SqlDialect } from "src/lib/sql/types/SqlDialect"
import { EnumUtils } from "src/lib/EnumUtils"

export function Header2SqlDialectSelect(): JSX.Element {
  const [sqlDialect, setSqlDialect] = useRecoilState(sqlDialectState)
  return <Header2Select values={EnumUtils.values(SqlDialect)} value={sqlDialect} onChange={setSqlDialect as any} />
}
