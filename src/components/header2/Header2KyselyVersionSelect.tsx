import { Header2Select } from "src/components/header2/Header2Select"
import { KyselyConstants } from "src/lib/kysely/KyselyConstants"
import { useRecoilState } from "recoil"
import { kyselyVersionState } from "src/lib/kysely/atoms/kyselyVersionState"

export function Header2KyselyVersionSelect(): JSX.Element {
  const [kyselyVersion, setKyselyVersion] = useRecoilState(kyselyVersionState)
  return (
    <Header2Select values={KyselyConstants.VERSIONS} value={kyselyVersion} onChange={setKyselyVersion} prefix="v" />
  )
}
