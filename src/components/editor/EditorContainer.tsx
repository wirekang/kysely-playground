import { TypescriptQueryEditor } from "src/components/editor/TypescriptQueryEditor"
import { TypescriptSchemaEditor } from "src/components/editor/TypescriptSchemaEditor"
import { SqlEditor } from "src/components/editor/SqlEditor"
import { useRecoilValue } from "recoil"
import { loadingState } from "src/lib/loading/atoms/loadingState"
import { useTimeout } from "src/lib/ui/hooks/useTimeout"
import { TypescriptBorder } from "src/components/editor/TypescriptBorder"
import { SqlBorder } from "src/components/editor/SqlBorder"
import { useSetEditorSizes } from "src/lib/ui/hooks/useSetEditorSizes"

export function EditorContainer(): JSX.Element {
  const { initShare } = useRecoilValue(loadingState)
  const timeout = useTimeout(300)
  useSetEditorSizes()

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexGrow: 1,
        overflow: "auto",
        opacity: !timeout || initShare === true ? 0 : undefined,
        transition: "opacity 0.2s",
      }}
    >
      <TypescriptSchemaEditor />
      <TypescriptBorder />
      <TypescriptQueryEditor />
      <SqlBorder />
      <SqlEditor />
    </div>
  )
}
