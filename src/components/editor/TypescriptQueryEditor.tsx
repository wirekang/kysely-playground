import { MonacoEditor } from "src/components/editor/MonacoEditor"
import { EditorConstants } from "src/lib/editor/EditorConstants"
import { typescriptQueryEditorEventsState } from "src/lib/editor/atoms/typescriptQueryEditorEventsState"
import { typescriptQueryState } from "src/lib/typescript/atoms/typescriptQueryState"

export function TypescriptQueryEditor(): JSX.Element {
  return (
    <MonacoEditor
      options={EditorConstants.TYPESCRIPT_QUERY_EDITOR_OPTIONS}
      eventsState={typescriptQueryEditorEventsState}
      valueState={typescriptQueryState}
    />
  )
}
