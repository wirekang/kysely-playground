import { useRecoilState } from "recoil"
import { showHeaderBodyState } from "src/lib/ui/atoms/showHeaderBodyState"
import more from "src/assets/more.svg"
import { useIsCompact } from "src/lib/ui/hooks/useIsCompact"

interface Props {}

export function HeaderToggleButton(props: Props): JSX.Element {
  const compact = useIsCompact()
  const [, setShow] = useRecoilState(showHeaderBodyState)

  if (!compact) {
    return <></>
  }

  return (
    <button
      style={{ display: "flex" }}
      onClick={() => {
        setShow((v) => !v)
      }}
    >
      <img alt="more" src={more} width={25} />
    </button>
  )
}
