import { SelectHTMLAttributes } from "react"
import { HoverDiv } from "src/components/header/HoverDiv"

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {}

export function HeaderSelect(props: Props): JSX.Element {
  return (
    <HoverDiv
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        position: "relative",
        cursor: "pointer",
      }}
    >
      <select
        {...props}
        style={{
          ...props.style,
          margin: 4,
          padding: 4,
          paddingRight: 24,
          opacity: props.disabled ? 0.5 : 1,
        }}
      />

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
    </HoverDiv>
  )
}
