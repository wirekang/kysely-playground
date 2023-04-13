import { typescriptSchemaEditorEventsState } from "src/lib/editor/atoms/typescriptSchemaEditorEventsState"
import { MonacoEditor } from "src/components/editor/MonacoEditor"
import { EditorConstants } from "src/lib/editor/EditorConstants"
import { typescriptSchemaState } from "src/lib/typescript/atoms/typescriptSchemaState"

export function TypescriptSchemaEditor(): JSX.Element {
  return (
    <MonacoEditor
      options={EditorConstants.TYPESCRIPT_SCHEMA_EDITOR_OPTIONS}
      eventsState={typescriptSchemaEditorEventsState}
      valueState={typescriptSchemaState}
    />
  )
}
