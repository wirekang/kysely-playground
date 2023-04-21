import { useEventListener } from "@react-hookz/web"
import { useRef, useState } from "react"

interface Props {
  setSize: (v: (v: number) => number) => void
  show: boolean
  left?: boolean
}

export function EditorBorder(props: Props): JSX.Element {
  const deltaFactor = props.left ? 1 : -1
  const [dragging, setDragging] = useState(false)
  const ref = useRef(null)
  const [previousX, setPreviousX] = useState<number | null>(null)

  const dragOn = () => {
    setDragging(true)
  }

  const dragOff = () => {
    setDragging(false)
  }

  useEventListener(window, "mouseup", dragOff)
  useEventListener(window, "touchend", dragOff)

  const min = 50
  const max = window.document.body.clientWidth
  useEventListener(window, "mousemove", (e: MouseEvent) => {
    if (!dragging) {
      return
    }

    props.setSize((v) => Math.max(min, Math.min(v - e.movementX * deltaFactor, max)))
  })

  useEventListener(window, "touchmove", (e: TouchEvent) => {
    if (!dragging) {
      return
    }
    const touch = e.touches[0]
    setPreviousX(touch.pageX)
    if (previousX === null) {
      return
    }
    props.setSize((v) => Math.max(min, Math.min(v - (touch.pageX - previousX) * deltaFactor, max)))
  })

  return (
    <div
      ref={ref}
      style={{
        cursor: "col-resize",
        width: "6px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: dragging ? "#522" : "#333",
        userSelect: "none",
      }}
      onMouseDown={dragOn}
      onTouchStart={dragOn}
    ></div>
  )
}
