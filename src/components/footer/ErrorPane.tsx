import { useRecoilValue } from "recoil"
import { loadingState } from "src/lib/loading/atoms/loadingState"
import { ErrorRow } from "src/components/footer/ErrorRow"

export function ErrorPane(): JSX.Element {
  const loading = useRecoilValue(loadingState)

  return (
    <div>
      {Object.keys(loading).map((id) => (
        <ErrorRow key={id} id={id as any} />
      ))}
    </div>
  )
}
