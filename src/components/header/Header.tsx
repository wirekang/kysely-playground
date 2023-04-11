import { HeaderBody } from "src/components/header/HeaderBody"
import { HeaderHeader } from "src/components/header/HeaderHeader"
import { HeaderExpansion } from "src/components/header/HeaderExpansion"

export function Header(): JSX.Element {
  return (
    <>
      <HeaderHeader />
      <HeaderBody />
      <HeaderExpansion />
    </>
  )
}
