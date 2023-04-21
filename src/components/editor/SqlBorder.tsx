import { EditorBorder } from "src/components/editor/EditorBorder"
import { useRecoilState } from "recoil"
import { showSqlState } from "src/lib/ui/atoms/showSqlState"
import { sqlEditorSizeState } from "src/lib/ui/atoms/sqlEditorSizeState"

export function SqlBorder(): JSX.Element {
  const [showSql, setShowSql] = useRecoilState(showSqlState)
  const [, setSqlEditorSize] = useRecoilState(sqlEditorSizeState)
  return <EditorBorder show={showSql} setSize={setSqlEditorSize} left />
}
