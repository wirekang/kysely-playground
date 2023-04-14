import { ErrorPane } from "src/components/footer/ErrorPane"
import { LoadingPane } from "src/components/footer/LoadingPane"

export function Footer(): JSX.Element {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        padding: 4,
        maxHeight: "100px",
        minHeight: "40px",
        overflow: "auto",
      }}
    >
      <LoadingPane />
      <ErrorPane />
    </div>
  )
}
