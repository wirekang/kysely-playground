import { MonacoEditor } from "src/components/editor/MonacoEditor"
import { EditorConstants } from "src/lib/editor/EditorConstants"
import { typescriptQueryEditorEventsState } from "src/lib/editor/atoms/typescriptQueryEditorEventsState"
import { typescriptQueryState } from "src/lib/typescript/atoms/typescriptQueryState"
import { useIsCompact } from "src/lib/ui/hooks/useIsCompact"

export function TypescriptQueryEditor(): JSX.Element {
  const compact = useIsCompact()
  return (
    <MonacoEditor
      wrapperStyle={{
        flexGrow: 1,
        flexBasis: compact ? undefined : "30%",
      }}
      options={EditorConstants.TYPESCRIPT_QUERY_EDITOR_OPTIONS}
      eventsState={typescriptQueryEditorEventsState}
      valueState={typescriptQueryState}
    />
  )
}
