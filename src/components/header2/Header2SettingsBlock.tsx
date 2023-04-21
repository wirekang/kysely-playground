import { ReactNode } from "react"

interface Props {
  title: string
  children?: ReactNode
}

export function Header2SettingsBlock(props: Props): JSX.Element {
  return (
    <div>
      <div style={{ marginLeft: 2 }}>{props.title}</div>
      <div
        style={{
          border: "1px solid #555",
          paddingLeft: 4,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {props.children}
      </div>
    </div>
  )
}
