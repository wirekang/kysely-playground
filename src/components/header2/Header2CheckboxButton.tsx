import { Header2Button } from "src/components/header2/Header2Button"

interface Props {
  title: string
  checked: boolean
  onChange: (v: boolean) => void
  hoverColor?: string
}

export function Header2CheckboxButton(props: Props): JSX.Element {
  const toggle = () => {
    props.onChange(!props.checked)
  }
  return (
    <Header2Button style={{ fontWeight: "bold" }} onClick={toggle} hoverColor={props.hoverColor}>
      <div>{props.title}</div>
      <div style={{ padding: "0 4px" }}>{props.checked ? "☑" : "☐"}</div>
    </Header2Button>
  )
}
