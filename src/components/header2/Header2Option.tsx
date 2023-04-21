import { Header2Button } from "src/components/header2/Header2Button"

interface Props {
  value: string
  setValue: (v: string) => void
}

export function Header2Option(props: Props): JSX.Element {
  return (
    <Header2Button
      style={{
        marginTop: 4,
      }}
      onClick={() => {
        props.setValue(props.value)
      }}
    >
      {props.value}
    </Header2Button>
  )
}
