import { MonacoEditor } from "src/components/editor/MonacoEditor"
import { EditorConstants } from "src/lib/editor/EditorConstants"
import styles from "./Editor.module.css"

export function TypescriptEditor(): JSX.Element {
  return <MonacoEditor className={styles.ts} options={EditorConstants.TYPESCRIPT_EDITOR_OPTIONS} />
}
