import { useRecoilState, useRecoilValue } from "recoil"
import { kyselyVersionState } from "src/lib/kysely/atoms/kyselyVersionState"
import { typescriptGlobalTypesState } from "src/lib/typescript/atoms/typescriptGlobalTypesState"
import { EditorConstants } from "src/lib/editor/EditorConstants"
import { useLoadingScopeEffect } from "src/lib/loading/hooks/useLoadingScopeEffect"
import { KyselyUtils } from "src/lib/kysely/KyselyUtils"

export function useSetKyselyGlobalType() {
  const [, setTypescriptGlobalTypes] = useRecoilState(typescriptGlobalTypesState)
  const kyselyVersion = useRecoilValue(kyselyVersionState)

  useLoadingScopeEffect(
    "kyselyType",
    async () => {
      const typeContent = await KyselyUtils.loadType(kyselyVersion)
      setTypescriptGlobalTypes((v) => ({ ...v, [EditorConstants.KYSELY_TYPE_PATH]: typeContent }))
    },
    [kyselyVersion, setTypescriptGlobalTypes]
  )
}
