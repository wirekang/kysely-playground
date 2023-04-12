import { KyselyConstants } from "src/lib/kysely/KyselyConstants"
import { useRecoilState, useRecoilValue } from "recoil"
import { shareableStateState } from "src/lib/state/atoms/shareableStateState"
import { HeaderSelect } from "src/components/header/HeaderSelect"
import { HeaderOption } from "src/components/header/HeaderOption"
import { loadingState } from "src/lib/loading/atoms/loadingState"

export function VersionSelect(): JSX.Element {
  const { kysely: loading } = useRecoilValue(loadingState)
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
      disabled={loading}
    >
      {KyselyConstants.VERSIONS.map((version) => (
        <HeaderOption key={version} value={version}>
          {version}
        </HeaderOption>
      ))}
    </HeaderSelect>
  )
}
