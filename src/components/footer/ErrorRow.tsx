import { useRecoilValue } from "recoil"
import { loadingState } from "src/lib/loading/atoms/loadingState"
import { Loading } from "src/lib/loading/types/Loading"

interface Props {
  id: keyof Loading
}

export function ErrorRow(props: Props): JSX.Element {
  const loading = useRecoilValue(loadingState)
  const value = loading[props.id]
  if (value === false) {
    return <></>
  }

  return (
    <div style={{ border: "1px solid red" }}>
      {props.id}: {value}
    </div>
  )
}
