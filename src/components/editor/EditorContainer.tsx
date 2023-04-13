import { TypescriptQueryEditor } from "src/components/editor/TypescriptQueryEditor"
import { useIsCompact } from "src/lib/ui/hooks/useIsCompact"
import { TypescriptSchemaEditor } from "src/components/editor/TypescriptSchemaEditor"
import { SqlEditor } from "src/components/editor/SqlEditor"
import { TypescriptEditorContainer } from "src/components/editor/TypescriptEditorContainer"

export function EditorContainer(): JSX.Element {
  const compact = useIsCompact()

  return (
    <div
      style={{
        display: "flex",
        flexDirection: compact ? "column" : "row",
        flexGrow: 1,
        overflow: "auto",
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
