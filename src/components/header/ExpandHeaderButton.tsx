import { useRecoilState } from "recoil"
import { expandHeaderState } from "src/lib/ui/atoms/expandHeaderState"
import { HeaderGroupContainer } from "src/components/header/HeaderGroupContainer"

export function ExpandHeaderButton(): JSX.Element {
  const [, setExpand] = useRecoilState(expandHeaderState)
  const toggle = () => {
    setExpand((v) => !v)
  }
  return (
    <HeaderGroupContainer>
      <button style={{ fontSize: "13px" }} onClick={toggle}>
        More Options...
      </button>
    </HeaderGroupContainer>
  )
}
