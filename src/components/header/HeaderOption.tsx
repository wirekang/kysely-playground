import { OptionHTMLAttributes, ReactNode } from "react"

interface Props extends OptionHTMLAttributes<HTMLOptionElement> {}

export function HeaderOption(props: Props): JSX.Element {
  return <option {...props} style={{ ...props.style }} />
}
