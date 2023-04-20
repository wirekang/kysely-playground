import { TypescriptQueryEditor } from "src/components/editor/TypescriptQueryEditor"
import { useIsCompact } from "src/lib/ui/hooks/useIsCompact"
import { TypescriptSchemaEditor } from "src/components/editor/TypescriptSchemaEditor"
import { SqlEditor } from "src/components/editor/SqlEditor"
import { TypescriptEditorContainer } from "src/components/editor/TypescriptEditorContainer"
import { useRecoilValue } from "recoil"
import { loadingState } from "src/lib/loading/atoms/loadingState"
import { useTimeout } from "src/lib/ui/hooks/useTimeout"

export function EditorContainer(): JSX.Element {
  const compact = useIsCompact()
  const { initShare } = useRecoilValue(loadingState)
  const timeout = useTimeout(300)

  return (
    <div
      style={{
        display: "flex",
        flexDirection: compact ? "column" : "row",
        flexGrow: 1,
        overflow: "auto",
        opacity: !timeout || initShare === true ? 0 : undefined,
        transition: "opacity 0.2s",
      }}
    >
      <TypescriptEditorContainer>
        <TypescriptSchemaEditor />
        <TypescriptQueryEditor />
      </TypescriptEditorContainer>
      <SqlEditor />
    </div>
  )
}
