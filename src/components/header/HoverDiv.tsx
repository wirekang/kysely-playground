import { CSSProperties, ReactNode, useState } from "react"

interface Props {
  hoverBgColor?: string
  children?: ReactNode
  style?: CSSProperties
}

export function HoverDiv(props: Props): JSX.Element {
  const [hover, setHover] = useState(false)
  return (
    <div
      style={{
        ...props.style,
        backgroundColor: hover ? props.hoverBgColor ?? "#333" : undefined,
      }}
      onMouseEnter={() => {
        setHover(true)
      }}
      onMouseLeave={() => {
        setHover(false)
      }}
    >
      {props.children}
    </div>
  )
}
