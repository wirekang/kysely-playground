import { useMediaQuery } from "react-responsive"
import { useIsCompact } from "src/lib/ui/hooks/useIsCompact"
import { useRecoilValue } from "recoil"
import { showTypescriptSchemaState } from "src/lib/ui/atoms/showTypescriptSchemaState"

export function TypescriptEditorContainer({ children }: any): JSX.Element {
  const vertical = useMediaQuery({ query: "(max-width: 1000px)" })
  const compact = useIsCompact()
  const showTypescriptSchema = useRecoilValue(showTypescriptSchemaState)
  let flex = 2
  if (vertical && !compact) {
    flex = 1.3
  }
  if (!showTypescriptSchema) {
    flex = 1
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: vertical ? "column" : "row",
        flex,
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
