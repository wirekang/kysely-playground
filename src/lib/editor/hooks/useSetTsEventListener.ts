import { useEventListener } from "src/lib/event/hooks/useEventListener"
import { EditorConstants } from "src/lib/editor/EditorConstants"
import { useCallback } from "react"

export function useSetTsEventListener(cb: (ts: string) => void) {
  const handler = useCallback(
    (e: any) => {
      cb(e.detail)
    },
    [cb]
  )
  useEventListener(EditorConstants.EVENT_SET_TS, handler)
}
