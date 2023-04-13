import type { Loading } from "src/lib/loading/types/Loading"
import { useRecoilState } from "recoil"
import { loadingState } from "src/lib/loading/atoms/loadingState"

export function useSetLoading(key: keyof Loading) {
  const [, setLoading] = useRecoilState(loadingState)

  return (v: boolean | string) => {
    setLoading((p) => ({ ...p, [key]: v }))
  }
}
