import { Editor, OnMount } from "@monaco-editor/react"
import { useRef } from "react"
import { editor } from "monaco-editor"
import styles from "./Editor.module.css"
import classNames from "classnames"

interface Props {
  className: string
  options: editor.IStandaloneEditorConstructionOptions
}

export function MonacoEditor(props: Props): JSX.Element {
  const editorRef = useRef<editor.IStandaloneCodeEditor>(null)

  const handleOnMount: OnMount = (editor, monaco) => {
    // @ts-ignore
    editorRef.current = editor
  }
  return (
    <Editor
      onMount={handleOnMount}
      className={classNames(styles.editor, props.className)}
      options={props.options}
      theme="vs-dark"
    />
  )
}
