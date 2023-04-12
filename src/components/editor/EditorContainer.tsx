import { TypescriptEditor } from "src/components/editor/TypescriptEditor"
import { SqlEditor } from "src/components/editor/SqlEditor"
import { useIsCompact } from "src/lib/ui/hooks/useIsCompact"

export function EditorContainer(): JSX.Element {
  const compact = useIsCompact()

  return (
    <div
      style={{
        display: "flex",
        flexDirection: compact ? "column" : "row",
        flexGrow: 1,
      }}
    >
      <TypescriptEditor />
      <SqlEditor />
    </div>
  )
}