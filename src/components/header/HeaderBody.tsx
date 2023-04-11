import { HeaderBodyContainer } from "src/components/header/HeaderBodyContainer"
import { useIsCompact } from "src/lib/ui/hooks/useIsCompact"
import { useRecoilValue } from "recoil"
import { showHeaderBodyState } from "src/lib/ui/atoms/showHeaderBodyState"
import { ExpandHeaderButton } from "src/components/header/ExpandHeaderButton"
import { ShareButton } from "src/components/header/ShareButton"
import { PrettifyButton } from "src/components/header/PrettifyButton"
import { DialectSelect } from "src/components/header/DialectSelect"
import { VersionSelect } from "src/components/header/VersionSelect"
import { GithubLinkWrapper } from "src/components/header/GithubLinkWrapper"

export function HeaderBody(): JSX.Element {
  const compact = useIsCompact()
  const show = useRecoilValue(showHeaderBodyState)
  if (compact && !show) {
    return <></>
  }
  return (
    <HeaderBodyContainer>
      <ShareButton />
      <PrettifyButton />
      <DialectSelect />
      <VersionSelect />
      <ExpandHeaderButton />
      <GithubLinkWrapper />
    </HeaderBodyContainer>
  )
}
