import { useRecoilValue } from "recoil"
import { loadingState } from "src/lib/loading/atoms/loadingState"
import { useEffect, useState } from "react"

export function LoadingPane(): JSX.Element {
  const loading = useRecoilValue(loadingState)
  const loadingCount = Object.entries(loading).filter((v) => v[1] === true).length
  const [dotCount, setDotCount] = useState(1)

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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        opacity: loadingCount,
        height: loadingCount === 0 ? 0 : "auto",
        transition: "all 0.4s ease",
        fontSize: "1.5rem",
      }}
    >
      <div>
        Loading
        {".".repeat(dotCount)}
      </div>
    </div>
  )
}
