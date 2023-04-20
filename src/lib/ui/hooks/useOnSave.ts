import { useCallback, useEffect, useState } from "react"
import { usePrettify } from "src/lib/typescript/hooks/usePrettify"
import { StoreProviderId } from "src/lib/store/types/StoreProviderId"
import { useShare } from "src/lib/share/hooks/useShare"
import { ShareUtils } from "src/lib/share/ShareUtils"

export function useOnSave() {
  const prettify = usePrettify()
  const share = useShare()
  const [triggerShare, setTriggerShare] = useState(false)
  const onSave = useCallback(() => {
    prettify().then(() => {
      setTriggerShare(true)
    })
  }, [prettify, share, setTriggerShare])

  useEffect(() => {
    if (!triggerShare) {
      return
    }
    setTriggerShare(false)
    share(StoreProviderId.MsgPackBase64).then((i) => {
      window.history.replaceState("", "", ShareUtils.makeUrl(i))
    })
  }, [triggerShare, setTriggerShare, share])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault()
        onSave()
      }
    }
    document.addEventListener("keydown", handler)
    return () => {
      document.removeEventListener("keydown", handler)
    }
  }, [onSave])
}
