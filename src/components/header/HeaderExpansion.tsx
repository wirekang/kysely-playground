import { useRecoilValue } from "recoil"
import { expandHeaderState } from "src/lib/ui/atoms/expandHeaderState"

export function HeaderExpansion(): JSX.Element {
  const show = useRecoilValue(expandHeaderState)
  if (!show) {
    return <></>
  }

  return (
    <div
      style={{
        backgroundColor: "#333",
        borderRadius: 20,
        width: "100%",
        padding: 4,
      }}
    >
      asdf
      <div>asdf</div>
      <div>asdf</div>
    </div>
  )
}
