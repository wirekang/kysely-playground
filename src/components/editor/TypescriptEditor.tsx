import { MonacoEditor } from "src/components/editor/MonacoEditor"
import { EditorConstants } from "src/lib/editor/EditorConstants"
import { useRecoilState } from "recoil"
import { shareableStateState } from "src/lib/state/atoms/shareableStateState"
import { useCallback, useState } from "react"
import { editor } from "monaco-editor"
import { useSetTsEventListener } from "src/lib/editor/hooks/useSetTsEventListener"
import { EditorUtils } from "src/lib/editor/EditorUtils"

export function TypescriptEditor(): JSX.Element {
  const [shareableState, setShareableState] = useRecoilState(shareableStateState)
  const [model, setModel] = useState<editor.ITextModel>()

  const setTs = useCallback(
    (ts: string) => {
      model?.setValue(ts)
    },
    [model]
  )
  useSetTsEventListener(setTs)

  const initModel = (model: any) => {
    setModel(model)
    setTimeout(() => {
      EditorUtils.dispatchSetTs(shareableState.ts)
    })
  }

  return (
    <MonacoEditor
      onChange={(ts) => {
        setShareableState((p) => ({ ...p, ts }))
      }}
      wrapperStyle={{}}
      options={EditorConstants.TYPESCRIPT_EDITOR_OPTIONS}
      onModel={initModel}
    />
  )
}
