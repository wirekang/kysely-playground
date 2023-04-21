import { ReactNode } from "react"

interface Props {
  children?: ReactNode
}

export function Header2Container(props: Props): JSX.Element {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        padding: "2px 4px",
        alignItems: "stretch",
        backgroundColor: "#262626",
        position: "relative",
        flexWrap: "wrap",
      }}
    >
      {props.children}
    </div>
  )
}
