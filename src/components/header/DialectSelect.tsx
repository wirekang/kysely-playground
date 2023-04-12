import { SqlDialect } from "src/lib/sql/types/SqlDialect"
import { useRecoilState, useRecoilValue } from "recoil"
import { shareableStateState } from "src/lib/state/atoms/shareableStateState"
import { EnumUtils } from "src/lib/EnumUtils"
import { HeaderSelect } from "src/components/header/HeaderSelect"
import { HeaderOption } from "src/components/header/HeaderOption"
import { loadingState } from "src/lib/loading/atoms/loadingState"

export function DialectSelect(): JSX.Element {
  const [shareableState, setShareableState] = useRecoilState(shareableStateState)
  const { kysely: loading } = useRecoilValue(loadingState)

  const setDialect = (dialect: SqlDialect) => {
    setShareableState((v) => ({ ...v, dialect }))
  }

  return (
    <HeaderSelect
      title="dialect"
      value={shareableState.dialect}
      onChange={(e) => {
        setDialect(e.target.value as any)
      }}
      disabled={loading}
    >
      {EnumUtils.values(SqlDialect).map((sqlDialect) => (
        <HeaderOption key={sqlDialect}>{sqlDialect}</HeaderOption>
      ))}
    </HeaderSelect>
  )
}
