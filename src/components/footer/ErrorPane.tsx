import { useRecoilValue } from "recoil"
import { loadingState } from "src/lib/loading/atoms/loadingState"
import { ErrorRow } from "src/components/footer/ErrorRow"

export function ErrorPane(): JSX.Element {
  const loading = useRecoilValue(loadingState)

  return (
    <div
      style={{
        maxHeight: "100px",
        overflow: "auto",
        padding: 4,
      }}
    >
      {Object.keys(loading).map((id) => (
        <ErrorRow key={id} id={id as any} />
      ))}
    </div>
  )
}
