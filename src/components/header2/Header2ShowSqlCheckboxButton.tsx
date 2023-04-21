import { Header2CheckboxButton } from "src/components/header2/Header2CheckboxButton"
import { useRecoilState } from "recoil"
import { showSqlState } from "src/lib/ui/atoms/showSqlState"

export function Header2ShowSqlCheckboxButton(): JSX.Element {
  const [showSql, setShowSql] = useRecoilState(showSqlState)
  return <Header2CheckboxButton title="sql" checked={showSql} onChange={setShowSql} />
}
