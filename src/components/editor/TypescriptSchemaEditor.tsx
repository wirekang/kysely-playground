import { typescriptSchemaEditorEventsState } from "src/lib/editor/atoms/typescriptSchemaEditorEventsState"
import { MonacoEditor } from "src/components/editor/MonacoEditor"
import { EditorConstants } from "src/lib/editor/EditorConstants"
import { typescriptSchemaState } from "src/lib/typescript/atoms/typescriptSchemaState"
import { useRecoilValue } from "recoil"
import { typescriptSchemaEditorSizeState } from "src/lib/ui/atoms/typescriptSchemaEditorSizeState"
import { showTypescriptSchemaState } from "src/lib/ui/atoms/showTypescriptSchemaState"

export function TypescriptSchemaEditor(): JSX.Element {
  const show = useRecoilValue(showTypescriptSchemaState)
  const size = useRecoilValue(typescriptSchemaEditorSizeState)

  return (
    <MonacoEditor
      wrapperStyle={{
        display: show ? "flex" : "none",
        width: size,
      }}
      options={EditorConstants.TYPESCRIPT_SCHEMA_EDITOR_OPTIONS}
      eventsState={typescriptSchemaEditorEventsState}
      valueState={typescriptSchemaState}
    />
  )
}
