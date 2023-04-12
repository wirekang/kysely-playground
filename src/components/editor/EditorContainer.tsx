import { TypescriptEditor } from "src/components/editor/TypescriptEditor"
import { SqlEditor } from "src/components/editor/SqlEditor"
import { useIsCompact } from "src/lib/ui/hooks/useIsCompact"
import { useCompileSql } from "src/lib/kysely/hooks/useCompileSql"
import { useSetTypescriptCompilerOptions } from "src/lib/typescript/hooks/useSetTypescriptCompilerOptions"
import { useSetTypescriptTypes } from "src/lib/typescript/hooks/useSetTypescriptTypes"

export function EditorContainer(): JSX.Element {
  const compact = useIsCompact()
  useCompileSql()
  useSetTypescriptCompilerOptions()
  useSetTypescriptTypes()

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
