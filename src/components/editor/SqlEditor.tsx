import { MonacoEditor } from "src/components/editor/MonacoEditor"
import { EditorConstants } from "src/lib/editor/EditorConstants"

export function SqlEditor(): JSX.Element {
  return <MonacoEditor wrapperStyle={{}} options={EditorConstants.SQL_EDITOR_OPTIONS} />
}
