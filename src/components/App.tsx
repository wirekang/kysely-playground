import styles from "./App.module.css"
import { MonacoProvider } from "src/lib/editor/contexts/MonacoContext"
import { Header } from "src/components/header/Header"
import { TypescriptEditor } from "src/components/editor/TypescriptEditor"
import { SqlEditor } from "src/components/editor/SqlEditor"
import classNames from "classnames"

function App() {
  return (
    <div className={styles.app}>
      <MonacoProvider fallback={<div>LOADING...</div>}>
        <Header />
        <div className={styles.wrapper}>
          <div className={classNames(styles.editorWrapper, styles.tsWrapper)}>
            <TypescriptEditor />
          </div>
          <div className={classNames(styles.editorWrapper, styles.sqlWrapper)}>
            <SqlEditor />
          </div>
        </div>
      </MonacoProvider>
    </div>
  )
}

export default App
