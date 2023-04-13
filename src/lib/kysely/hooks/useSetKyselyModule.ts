import { kyselyModuleState } from "src/lib/kysely/atoms/kyselyModuleState"
import { useRecoilState, useRecoilValue } from "recoil"
import { kyselyVersionState } from "src/lib/kysely/atoms/kyselyVersionState"
import { useLoadingScopeEffect } from "src/lib/loading/hooks/useLoadingScopeEffect"
import { KyselyUtils } from "src/lib/kysely/KyselyUtils"

export function useSetKyselyModule() {
  const [, setKyselyModule] = useRecoilState(kyselyModuleState)
  const kyselyVersion = useRecoilValue(kyselyVersionState)
  useLoadingScopeEffect(
    "kyselyModule",
    async () => {
      const module = await KyselyUtils.importModule(kyselyVersion)
      setKyselyModule({ ...module } as any)
    },
    [kyselyVersion, setKyselyModule]
  )
}
