import { Editor, OnMount } from "@monaco-editor/react"
import { CSSProperties, useRef } from "react"
import { editor } from "monaco-editor"
import { useIsCompact } from "src/lib/ui/hooks/useIsCompact"

interface Props {
  options: editor.IStandaloneEditorConstructionOptions
  wrapperStyle?: CSSProperties
}

export function MonacoEditor(props: Props): JSX.Element {
  const compact = useIsCompact()
  const editorRef = useRef<editor.IStandaloneCodeEditor>(null)

  const handleOnMount: OnMount = (editor, monaco) => {
    // @ts-ignore
    editorRef.current = editor
  }
  return (
    <Editor
      wrapperProps={{
        style: {
          ...props.wrapperStyle,
          display: "flex",
          position: "relative",
          textAlign: "initial",
          width: compact ? "100%" : "50%",
          height: compact ? "50%" : "100%",
        } as CSSProperties,
      }}
      width="100%"
      height="100%"
      onMount={handleOnMount}
      options={props.options}
      theme="vs-dark"
    />
  )
}
