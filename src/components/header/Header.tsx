import { HeaderBody } from "src/components/header/HeaderBody"
import { HeaderHeader } from "src/components/header/HeaderHeader"
import { HeaderExpansion } from "src/components/header/HeaderExpansion"
import { SharePopup } from "src/components/header/SharePopup"

export function Header(): JSX.Element {
  return (
    <>
      <HeaderHeader />
      <HeaderBody />
      <HeaderExpansion />
      <SharePopup />
    </>
  )
}
