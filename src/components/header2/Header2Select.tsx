import { Header2Button } from "src/components/header2/Header2Button"
import { useRef, useState } from "react"
import { useClickOutside } from "@react-hookz/web"
import { Header2Option } from "src/components/header2/Header2Option"

interface Props {
  values: string[]
  value: string
  onChange: (v: string) => void
  prefix?: string
  suffix?: string
}

export function Header2Select(props: Props): JSX.Element {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useClickOutside(ref, () => {
    setOpen(false)
  })

  const toggle = () => {
    setOpen((v) => !v)
  }

  const handleSelect = (v: string) => {
    setOpen(false)
    props.onChange(v)
  }

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
      }}
    >
      <Header2Button style={{ fontWeight: "bold" }} onClick={toggle}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {props.prefix}
          {props.value}
          {props.suffix}
          <div style={{ marginLeft: 4 }} />
          <div>▼</div>
        </div>
      </Header2Button>
      <div
        style={{
          position: "absolute",
          display: open ? "flex" : "none",
          flexDirection: "column",
          zIndex: 1,
          backgroundColor: "#242424",
          top: "calc(100% + 3px)",
          minWidth: "100%",
          maxHeight: "300px",
          overflowX: "hidden",
          overflowY: "auto",
          border: "2px solid #111",
          padding: 2,
        }}
      >
        {props.values.map((v) => (
          <Header2Option key={v} value={v} setValue={handleSelect} />
        ))}
      </div>
    </div>
  )
}
