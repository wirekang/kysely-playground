import { useEffect } from "react"

export function useEventListener(key: string, cb: (e: any) => void) {
  useEffect(() => {
    window.addEventListener(key, cb)
    return () => {
      window.removeEventListener(key, cb)
    }
  }, [cb])
}
