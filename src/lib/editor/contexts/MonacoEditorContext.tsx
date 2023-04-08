import { createContext, ReactNode, useState } from "react"
import { editor } from "monaco-editor"
import { Editor, OnMount } from "@monaco-editor/react"
import styles from "src/components/editor/Editor.module.css"
import { EditorConstants } from "src/lib/editor/EditorConstants"

export const MonacoEditorContext = createContext<editor.IStandaloneCodeEditor>(undefined as any)

interface Props {
  before: ReactNode
  after: ReactNode
}

export function MonacoEditorProvider({ before, after }: Props) {
  const [editor, setEditor] = useState<editor.IStandaloneCodeEditor>()
  const handleOnMount: OnMount = (editor) => {
    setEditor(editor)
  }
  return (
    <MonacoEditorContext.Provider value={editor as any}>
      {!!editor && before}
      <Editor
        onMount={handleOnMount}
        className={styles.editor}
        options={EditorConstants.TYPESCRIPT_EDITOR_OPTIONS}
        theme="vs-dark"
      />
      {!!editor && after}
    </MonacoEditorContext.Provider>
  )
}
