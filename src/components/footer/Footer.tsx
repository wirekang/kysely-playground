import { useRecoilValue } from "recoil"
import { loadingState } from "src/lib/loading/atoms/loadingState"

export function Footer(): JSX.Element {
  const loading = useRecoilValue(loadingState)
  return (
    <div
      style={{
        flexShrink: 1,
        overflow: "auto",
      }}
    >
      {JSON.stringify(loading)}
    </div>
  )
}
