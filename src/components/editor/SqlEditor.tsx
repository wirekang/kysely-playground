import { MonacoEditor } from "src/components/editor/MonacoEditor"
import { EditorConstants } from "src/lib/editor/EditorConstants"
import { sqlEditorEventsState } from "src/lib/editor/atoms/sqlEditorEventsState"
import { sqlResultState } from "src/lib/sql/atoms/sqlResultState"
import { useRecoilValue } from "recoil"
import { sqlEditorSizeState } from "src/lib/ui/atoms/sqlEditorSizeState"
import { showSqlState } from "src/lib/ui/atoms/showSqlState"

export function SqlEditor(): JSX.Element {
  const show = useRecoilValue(showSqlState)
  const size = useRecoilValue(sqlEditorSizeState)
  return (
    <MonacoEditor
      wrapperStyle={{
        display: show ? "flex" : "none",
        width: size,
      }}
      options={EditorConstants.SQL_EDITOR_OPTIONS}
      eventsState={sqlEditorEventsState}
      valueState={sqlResultState}
    />
  )
}
