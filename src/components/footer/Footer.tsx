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
        justifyContent: "stretch",
        paddingLeft: 2,
        maxHeight: "100px",
        minHeight: "30px",
        overflow: "auto",
      }}
    >
      <LoadingPane />
      <ErrorPane />
    </div>
  )
}
