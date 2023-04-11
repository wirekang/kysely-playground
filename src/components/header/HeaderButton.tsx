import { CSSProperties, ReactNode } from "react"

interface Props {
  style?: CSSProperties
  children?: ReactNode
  onClick: () => void
}

export function HeaderButton(props: Props): JSX.Element {
  return (
    <button
      style={{
        ...props.style,
        border: "1px solid #555",
        borderRadius: 2,
        padding: 4,
        paddingLeft: 8,
        paddingRight: 8,
        margin: 4,
        backgroundColor: "#303030",
      }}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}
