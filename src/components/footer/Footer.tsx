import { useRecoilValue } from "recoil"
import { loadingState } from "src/lib/loading/atoms/loadingState"

export function Footer(): JSX.Element {
  const loading = useRecoilValue(loadingState)
  return <div>{JSON.stringify(loading)}</div>
}
