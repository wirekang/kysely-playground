import { kyselyModuleState } from "src/lib/kysely/atoms/kyselyModuleState"
import { useRecoilState, useRecoilValue } from "recoil"
import { kyselyVersionState } from "src/lib/kysely/atoms/kyselyVersionState"
import { useLoadingScopeEffect } from "src/lib/loading/hooks/useLoadingScopeEffect"
import { ModuleUtils } from "src/lib/module/ModuleUtils"

export function useSetKyselyModule() {
  const [, setKyselyModule] = useRecoilState(kyselyModuleState)
  const kyselyVersion = useRecoilValue(kyselyVersionState)
  useLoadingScopeEffect(
    "kyselyModule",
    async () => {
      const module = await ModuleUtils.getModuleVersion("kysely", kyselyVersion as "0.25.0").module()
      setKyselyModule({ ...module } as any)
    },
    [kyselyVersion, setKyselyModule]
  )
}
