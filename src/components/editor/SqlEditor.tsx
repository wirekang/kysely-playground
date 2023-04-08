import { MonacoEditor } from "src/components/editor/MonacoEditor"
import { EditorConstants } from "src/lib/editor/EditorConstants"
import styles from "./Editor.module.css"

export function SqlEditor(): JSX.Element {
  return <MonacoEditor className={styles.sql} options={EditorConstants.SQL_EDITOR_OPTIONS} />
}
