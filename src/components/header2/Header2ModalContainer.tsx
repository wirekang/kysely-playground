import { useRecoilState } from "recoil"
import { header2ModalState } from "src/lib/ui/atoms/header2ModalState"
import { Header2ShareModal } from "src/components/header2/Header2ShareModal"
import { Header2SettingsModal } from "src/components/header2/Header2SettingsModal"

interface Props {}

export function Header2ModalContainer(props: Props): JSX.Element {
  const [header2Modal, setHeader2Modal] = useRecoilState(header2ModalState)

  const stopPropagation = (e: any) => {
    e.stopPropagation()
  }

  const close = () => {
    setHeader2Modal(null)
  }

  return (
    <div
      style={{
        display: header2Modal === null ? "none" : "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        position: "fixed",
        zIndex: 2,
        top: 26,
        left: 0,
        right: 0,
        bottom: 0,
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
      onMouseDown={close}
      onTouchStart={close}
    >
      <div
        style={{
          backgroundColor: "#333",
          padding: 8,
          minWidth: "400px",
          borderBottomRightRadius: 20,
        }}
        onMouseDown={stopPropagation}
        onTouchStart={stopPropagation}
      >
        <div>
          {header2Modal === "share" && <Header2ShareModal />}
          {header2Modal === "settings" && <Header2SettingsModal />}
        </div>
      </div>
    </div>
  )
}
