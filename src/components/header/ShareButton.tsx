import { HeaderButton } from "src/components/header/HeaderButton"
import { useRecoilState } from "recoil"
import { showSharePopupState } from "src/lib/ui/atoms/showSharePopupState"

export function ShareButton(): JSX.Element {
  const [, setShow] = useRecoilState(showSharePopupState)
  return (
    <HeaderButton
      onClick={() => {
        setShow(true)
      }}
    >
      Share
    </HeaderButton>
  )
}
