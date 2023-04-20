import { useCallback, useEffect } from "react"
import { LogUtils } from "src/lib/log/LogUtils"
import { usePrettify } from "src/lib/typescript/hooks/usePrettify"

export function useOnSave() {
  const prettify = usePrettify()
  const onSave = useCallback(() => {
    prettify()
  }, [prettify])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault()
        LogUtils.info("onSave")
        onSave()
      }
    }
    document.addEventListener("keydown", handler)
    return () => {
      document.removeEventListener("keydown", handler)
    }
  }, [onSave])
}
