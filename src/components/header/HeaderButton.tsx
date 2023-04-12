import { ButtonHTMLAttributes } from "react"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function HeaderButton(props: Props): JSX.Element {
  return (
    <button
      {...props}
      style={{
        ...props.style,
        border: "1px solid #555",
        borderRadius: 2,
        padding: 4,
        paddingLeft: 8,
        paddingRight: 8,
        margin: 4,
        backgroundColor: "#303030",
        opacity: props.disabled ? 0.5 : 1,
      }}
      onClick={props.onClick}
    />
  )
}
