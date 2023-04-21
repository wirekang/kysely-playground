import { useRecoilValue } from "recoil"
import { loadingState } from "src/lib/loading/atoms/loadingState"
import { Loading } from "src/lib/loading/types/Loading"

interface Props {
  id: keyof Loading
}

export function ErrorRow(props: Props): JSX.Element {
  const loading = useRecoilValue(loadingState)
  const value = loading[props.id]
  if (typeof value === "boolean") {
    return <></>
  }

  return (
    <div style={{ border: "1px solid red", padding: 2, whiteSpace: "pre" }}>
      {props.id}: {value}
    </div>
  )
}
