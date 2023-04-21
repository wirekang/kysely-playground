import { EditorBorder } from "src/components/editor/EditorBorder"
import { useRecoilState } from "recoil"
import { showTypescriptSchemaState } from "src/lib/ui/atoms/showTypescriptSchemaState"
import { typescriptSchemaEditorSizeState } from "src/lib/ui/atoms/typescriptSchemaEditorSizeState"

export function TypescriptBorder(): JSX.Element {
  const [showTypescriptSchema, setShowTypescriptSchema] = useRecoilState(showTypescriptSchemaState)
  const [, setTypescriptSchemaEditorSize] = useRecoilState(typescriptSchemaEditorSizeState)
  return <EditorBorder show={showTypescriptSchema} setSize={setTypescriptSchemaEditorSize} />
}
