export function HeaderBodyContainer(props: any): JSX.Element {
  return (
    <div
      style={{
        padding: 4,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      {props.children}
    </div>
  )
}
