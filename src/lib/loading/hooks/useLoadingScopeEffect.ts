import type { Loading } from "src/lib/loading/types/Loading"
import { useSetLoading } from "src/lib/loading/hooks/useSetLoading"
import { useEffect } from "react"

export function useLoadingScopeEffect(
  key: keyof Loading,
  cb: () => Promise<void>,
  deps: any[],
  onError?: (e: any) => void,
  final?: () => void
) {
  const setLoading = useSetLoading(key)

  useEffect(() => {
    setLoading(true)
    cb()
      .then(
        () => {
          setLoading(false)
        },
        (e: any) => {
          onError && onError(e)
          setLoading(e.toString())
        }
      )
      .finally(final)
  }, deps)
}
