import { useRecoilValue } from "recoil"
import { loadingState } from "src/lib/loading/atoms/loadingState"
import { useEffect, useState } from "react"
import { useTimeout } from "src/lib/ui/hooks/useTimeout"

export function LoadingPane(): JSX.Element {
  const loading = useRecoilValue(loadingState)
  const [dotCount, setDotCount] = useState(1)
  const [show, setShow] = useState(true)
  const timeout = useTimeout(1000)

  useEffect(() => {
    const loadingCount = Object.entries(loading).filter((v) => v[1] === true).length
    let t: any = null
    if (loadingCount > 0) {
      t = setTimeout(() => {
        setShow(true)
      }, 200)
    }
    setShow(false)
    return () => {
      clearTimeout(t)
    }
  }, [loading, setShow])

  useEffect(() => {
    const i = setInterval(() => {
      setDotCount((p) => {
        if (p === 3) {
          return 1
        }
        return p + 1
      })
    }, 400)
    return () => {
      clearInterval(i)
    }
  }, [setDotCount])

  const visible = show || !timeout
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        opacity: visible ? 1 : 0,
        height: visible ? undefined : 0,
        transition: "all 0.4s ease",
        fontSize: "1.5rem",
        padding: 0,
        margin: 0,
      }}
    >
      <div>Loading{".".repeat(dotCount)}</div>
    </div>
  )
}
