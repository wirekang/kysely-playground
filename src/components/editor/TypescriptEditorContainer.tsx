import { useMediaQuery } from "react-responsive"
import { useIsCompact } from "src/lib/ui/hooks/useIsCompact"
import { useRecoilValue } from "recoil"
import { showTypescriptSchemaState } from "src/lib/ui/atoms/showTypescriptSchemaState"

export function TypescriptEditorContainer({ children }: any): JSX.Element {
  const vertical = useMediaQuery({ query: "(max-width: 1000px)" })
  const compact = useIsCompact()
  const showTypescriptSchema = useRecoilValue(showTypescriptSchemaState)

  return (
    <div
      style={{
        display: "flex",
        flexDirection: vertical ? "column" : "row",
        flex: (vertical && !compact) || !showTypescriptSchema ? 1 : 2,
        width: "100%",
        height: "100%",
        alignItems: "stretch",
        justifyContent: "stretch",
      }}
    >
      {children}
    </div>
  )
}
