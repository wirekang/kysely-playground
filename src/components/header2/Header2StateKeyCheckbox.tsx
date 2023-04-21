import { Header2CheckboxButton } from "src/components/header2/Header2CheckboxButton"

interface Props<T extends Record<string, any>> {
  keyName: keyof T
  state: T
  onChange: (state: T) => any
}

export function Header2StateKeyCheckbox<T extends Record<string, any>>(props: Props<T>): JSX.Element {
  const handleChange = (v: boolean) => {
    // @ts-ignore
    props.onChange((p) => ({ ...p, [props.keyName]: v }))
  }
  return (
    <Header2CheckboxButton
      checked={props.state[props.keyName]}
      title={props.keyName as any}
      onChange={handleChange}
      hoverColor="#252525"
    />
  )
}
