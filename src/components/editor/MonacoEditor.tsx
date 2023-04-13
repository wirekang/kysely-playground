import { Editor } from "@monaco-editor/react"
import { CSSProperties } from "react"
import { editor } from "monaco-editor"
import { useIsCompact } from "src/lib/ui/hooks/useIsCompact"
import { MonacoEditorEvents } from "src/lib/editor/types/MonacoEditorEvents"
import { RecoilState } from "recoil"
import { useSetMonacoEditorEvents } from "src/lib/editor/hooks/useSetMonacoEditorEvents"

interface Props {
  options: editor.IStandaloneEditorConstructionOptions
  wrapperStyle?: CSSProperties
  eventsState: RecoilState<MonacoEditorEvents | null>
  valueState: RecoilState<string>
}

export function MonacoEditor(props: Props): JSX.Element {
  const compact = useIsCompact()
  const set = useSetMonacoEditorEvents(props.eventsState, props.valueState)

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
      onMount={set}
      options={props.options}
      theme="vs-dark"
    />
  )
}
