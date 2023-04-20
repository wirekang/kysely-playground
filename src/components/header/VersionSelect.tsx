import { KyselyConstants } from "src/lib/kysely/KyselyConstants"
import { useRecoilState, useRecoilValue } from "recoil"
import { HeaderSelect } from "src/components/header/HeaderSelect"
import { HeaderOption } from "src/components/header/HeaderOption"
import { loadingState } from "src/lib/loading/atoms/loadingState"
import { kyselyVersionState } from "src/lib/kysely/atoms/kyselyVersionState"

export function VersionSelect(): JSX.Element {
  const loading = useRecoilValue(loadingState)
  const [kyselyVersion, setKyselyVersion] = useRecoilState(kyselyVersionState)

  return (
    <HeaderSelect
      value={kyselyVersion}
      onChange={(e) => {
        setKyselyVersion(e.target.value)
      }}
      disabled={loading.kyselyType === true || loading.kyselyModule === true}
    >
      {KyselyConstants.VERSIONS.map((version) => (
        <HeaderOption key={version} value={version}>
          {version}
        </HeaderOption>
      ))}
    </HeaderSelect>
  )
}
