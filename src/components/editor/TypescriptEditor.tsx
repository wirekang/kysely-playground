import { MonacoEditor } from "src/components/editor/MonacoEditor"
import { EditorConstants } from "src/lib/editor/EditorConstants"
import { useRecoilState } from "recoil"
import { shareableStateState } from "src/lib/state/atoms/shareableStateState"
import { useCallback, useState } from "react"
import { editor } from "monaco-editor"
import { useSetTsEventListener } from "src/lib/editor/hooks/useSetTsEventListener"
import { useInitShare } from "src/lib/share/hooks/useInitShare"
import { useCompileSql } from "src/lib/kysely/hooks/useCompileSql"
import { useSetTypescriptCompilerOptions } from "src/lib/typescript/hooks/useSetTypescriptCompilerOptions"
import { useSetTypescriptTypes } from "src/lib/typescript/hooks/useSetTypescriptTypes"
import { loadingState } from "src/lib/loading/atoms/loadingState"

export function TypescriptEditor(): JSX.Element {
  const [, setShareableState] = useRecoilState(shareableStateState)
  const [model, setModel] = useState<editor.ITextModel>()
  const [, setLoading] = useRecoilState(loadingState)

  const initModel = (v: any) => {
    setModel(v)
    setLoading((v) => ({ ...v, typescriptModel: false }))
  }

  const setTs = useCallback(
    (ts: string) => {
      model?.setValue(ts)
    },
    [model]
  )
  useSetTsEventListener(setTs)

  useCompileSql()
  useSetTypescriptCompilerOptions()
  useSetTypescriptTypes()
  useInitShare()

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
