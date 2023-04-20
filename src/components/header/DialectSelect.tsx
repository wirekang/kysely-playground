import { SqlDialect } from "src/lib/sql/types/SqlDialect"
import { useRecoilState, useRecoilValue } from "recoil"
import { EnumUtils } from "src/lib/EnumUtils"
import { HeaderSelect } from "src/components/header/HeaderSelect"
import { HeaderOption } from "src/components/header/HeaderOption"
import { loadingState } from "src/lib/loading/atoms/loadingState"
import { sqlDialectState } from "src/lib/sql/atoms/sqlDialectState"

export function DialectSelect(): JSX.Element {
  const [sqlDialect, setSqlDialect] = useRecoilState(sqlDialectState)
  const loading = useRecoilValue(loadingState)

  return (
    <HeaderSelect
      value={sqlDialect}
      onChange={(e) => {
        setSqlDialect(e.target.value as any)
      }}
      disabled={loading.compile === true}
    >
      {EnumUtils.values(SqlDialect).map((sqlDialect) => (
        <HeaderOption key={sqlDialect}>{sqlDialect}</HeaderOption>
      ))}
    </HeaderSelect>
  )
}
