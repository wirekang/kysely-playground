import { Header2Button } from "src/components/header2/Header2Button"
import { CSSProperties, ReactNode } from "react"
import { useRecoilState } from "recoil"
import { header2ModalState } from "src/lib/ui/atoms/header2ModalState"
import { Header2Modal } from "src/lib/ui/types/Header2Modal"

interface Props {
  value: Header2Modal
  children?: ReactNode
  style?: CSSProperties
}

export function Header2ModalButton(props: Props): JSX.Element {
  const [header2Modal, setHeader2Modal] = useRecoilState(header2ModalState)
  const open = header2Modal === props.value
  const handleClick = () => {
    if (open) {
      setHeader2Modal(null)
      return
    }
    setHeader2Modal(props.value)
  }
  return (
    <Header2Button
      style={{
        ...props.style,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        fontWeight: "bold",
      }}
      onClick={handleClick}
      overrideHover={open}
    >
      <div>{props.children}</div>
      <div style={{ marginLeft: 4 }} />
      <div>▼</div>
    </Header2Button>
  )
}
