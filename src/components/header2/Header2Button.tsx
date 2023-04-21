import { ButtonHTMLAttributes, useRef, useState } from "react"
import { useClickOutside } from "@react-hookz/web"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  overrideHover?: boolean
  hoverColor?: string
}

export function Header2Button(props: Props): JSX.Element {
  const [hover, setHover] = useState(false)
  const ref = useRef(null)
  useClickOutside(ref, () => {
    setHover(false)
  })
  const newProps = { ...props }
  delete newProps["hoverColor"]
  delete newProps["overrideHover"]
  return (
    <button
      {...newProps}
      ref={ref}
      style={{
        ...props.style,
        cursor: props.disabled ? "default" : "pointer",
        backgroundColor: hover || props.overrideHover ? props.hoverColor ?? "#333" : undefined,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "2px 4px",
        fontSize: "14px",
        opacity: props.disabled ? 0.5 : 1,
      }}
      onMouseEnter={() => {
        setHover(true)
      }}
      onMouseLeave={() => {
        setHover(false)
      }}
    />
  )
}
