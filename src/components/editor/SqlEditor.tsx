import { MonacoEditor } from "src/components/editor/MonacoEditor"
import { EditorConstants } from "src/lib/editor/EditorConstants"
import { useRecoilValue } from "recoil"
import { sqlResultState } from "src/lib/sql/atoms/sqlResultState"

export function SqlEditor(): JSX.Element {
  const sqlResult = useRecoilValue(sqlResultState)

  return <MonacoEditor value={sqlResult.sql} options={EditorConstants.SQL_EDITOR_OPTIONS} />
}
