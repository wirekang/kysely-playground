import { Editor, OnMount } from "@monaco-editor/react"
import { CSSProperties, useEffect, useRef, useState } from "react"
import { editor, IRange, Range } from "monaco-editor"
import { useIsCompact } from "src/lib/ui/hooks/useIsCompact"

interface Props {
  options: editor.IStandaloneEditorConstructionOptions
  wrapperStyle?: CSSProperties
  onChange?: (v: string) => void
  value?: string
  name?: string
  onModel?: (v: editor.ITextModel) => void
}

export function MonacoEditor(props: Props): JSX.Element {
  const compact = useIsCompact()
  const [model, setModel] = useState<editor.ITextModel | null>(null)

  const handleOnMount: OnMount = (editor) => {
    const model = editor.getModel()
    if (!model) {
      throw Error("model is null")
    }
    setModel(model)
    props.onModel && props.onModel(model)
  }

  useEffect(() => {
    if (model) {
      model.onDidChangeContent((e) => {
        props.onChange && props.onChange(model.getValue())
      })
    }
  }, [model])

  useEffect(() => {
    if (props.value) {
      model?.setValue(props.value)
    }
  }, [props.value])

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
