interface Props {
  id: string
  state: any
  changeState: (v: any) => any
}

export function HeaderExpansionCheckbox(props: Props): JSX.Element {
  const checked = props.state[props.id]
  const change = () => {
    props.changeState((v: any) => ({ ...v, [props.id]: !checked }))
  }
  return (
    <button
      style={{
        border: "1px solid #777",
        padding: 4,
        width: 250,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: checked ? "#222" : "#333",
      }}
      onClick={change}
    >
      {props.id}:<div>{checked ? "☑" : "☐"}</div>
    </button>
  )
}
