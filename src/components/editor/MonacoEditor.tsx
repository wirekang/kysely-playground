import { Editor } from "@monaco-editor/react"
import { CSSProperties } from "react"
import { editor } from "monaco-editor"
import { MonacoEditorEvents } from "src/lib/editor/types/MonacoEditorEvents"
import { RecoilState } from "recoil"
import { useSetMonacoEditorEvents } from "src/lib/editor/hooks/useSetMonacoEditorEvents"
import { useIsCompact } from "src/lib/ui/hooks/useIsCompact"

interface Props {
  options: editor.IStandaloneEditorConstructionOptions
  wrapperStyle?: CSSProperties
  eventsState: RecoilState<MonacoEditorEvents | null>
  valueState: RecoilState<string>
}

export function MonacoEditor(props: Props): JSX.Element {
  const set = useSetMonacoEditorEvents(props.eventsState, props.valueState)

  return (
    <Editor
      wrapperProps={{
        style: {
          display: "flex",
          ...props.wrapperStyle,
          position: "relative",
          textAlign: "initial",
          height: "100%",
          border: "1px solid #333",
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
