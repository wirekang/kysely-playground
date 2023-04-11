import { KyselyConstants } from "src/lib/kysely/KyselyConstants"
import { useRecoilState } from "recoil"
import { shareableStateState } from "src/lib/state/atoms/shareableStateState"
import { HeaderSelect } from "src/components/header/HeaderSelect"
import { HeaderOption } from "src/components/header/HeaderOption"

export function VersionSelect(): JSX.Element {
  const [shareableState, setShareableState] = useRecoilState(shareableStateState)

  const setVersion = (kyselyVersion: string) => {
    setShareableState((v) => ({ ...v, kyselyVersion }))
  }

  return (
    <HeaderSelect
      title="kysely"
      value={shareableState.kyselyVersion}
      onChange={(e) => {
        setVersion(e.target.value)
      }}
    >
      {KyselyConstants.VERSIONS.map((version) => (
        <HeaderOption key={version} value={version}>
          {version}
        </HeaderOption>
      ))}
    </HeaderSelect>
  )
}
