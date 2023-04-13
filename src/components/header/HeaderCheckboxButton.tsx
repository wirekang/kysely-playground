import { HeaderButton } from "src/components/header/HeaderButton"

interface Props {
  label: string
  checked: boolean
  onToggle: () => void
}

export function HeaderCheckboxButton(props: Props): JSX.Element {
  return (
    <HeaderButton
      style={{
        display: "flex",
        flexDirection: "row",
      }}
      onClick={() => {
        props.onToggle()
      }}
    >
      <div style={{ marginRight: 8 }}>{props.label}</div>
      <div>{props.checked ? "☑" : "☐"}</div>
    </HeaderButton>
  )
}
