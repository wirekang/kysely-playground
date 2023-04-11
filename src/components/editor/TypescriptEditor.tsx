import { MonacoEditor } from "src/components/editor/MonacoEditor"
import { EditorConstants } from "src/lib/editor/EditorConstants"

export function TypescriptEditor(): JSX.Element {
  return <MonacoEditor wrapperStyle={{}} options={EditorConstants.TYPESCRIPT_EDITOR_OPTIONS} />
}
