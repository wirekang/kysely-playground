import { MonacoEditor } from "src/components/editor/MonacoEditor"
import { EditorConstants } from "src/lib/editor/EditorConstants"
import { sqlEditorEventsState } from "src/lib/editor/atoms/sqlEditorEventsState"
import { sqlResultState } from "src/lib/sql/atoms/sqlResultState"

export function SqlEditor(): JSX.Element {
  return (
    <MonacoEditor
      options={EditorConstants.SQL_EDITOR_OPTIONS}
      eventsState={sqlEditorEventsState}
      valueState={sqlResultState}
    />
  )
}
