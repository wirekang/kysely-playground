import { useEffect, useState } from "react"

export function useTimeout(ms: number) {
  const [timer, setTimer] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setTimer(true)
    }, ms)
  }, [])
  return timer
}
