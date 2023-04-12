import { SelectHTMLAttributes } from "react"

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  title: string
}

export function HeaderSelect(props: Props): JSX.Element {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        position: "relative",
      }}
    >
      <select
        {...props}
        style={{
          ...props.style,
          border: "1px solid #555",
          borderRadius: 2,
          margin: 4,
          padding: 4,
          paddingRight: 24,
          backgroundColor: "#303030",
          opacity: props.disabled ? 0.5 : 1,
        }}
      />
      <div
        style={{
          fontSize: "9px",
          position: "absolute",
          left: 9,
          top: -1,
          backgroundColor: "#303030",
        }}
      >
        {props.title}
      </div>
      <div
        style={{
          fontSize: "15px",
          position: "absolute",
          right: 10,
          top: 10,
          opacity: props.disabled ? 0.5 : 1,
        }}
      >
        ▼
      </div>
    </div>
  )
}
