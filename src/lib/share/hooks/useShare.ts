import { useRecoilState, useRecoilValue } from "recoil"
import { useStoreManager } from "src/lib/store/context/StoreManagerContext"
import { sqlDialectState } from "src/lib/sql/atoms/sqlDialectState"
import { kyselyVersionState } from "src/lib/kysely/atoms/kyselyVersionState"
import { typescriptSchemaState } from "src/lib/typescript/atoms/typescriptSchemaState"
import { typescriptQueryState } from "src/lib/typescript/atoms/typescriptQueryState"
import { showTypescriptSchemaState } from "src/lib/ui/atoms/showTypescriptSchemaState"
import { ShareUtils } from "src/lib/share/ShareUtils"
import { loadingState } from "src/lib/loading/atoms/loadingState"
import { StoreProviderId } from "src/lib/store/types/StoreProviderId"
import { useCallback } from "react"

export function useShare() {
  const storeManager = useStoreManager()
  const sqlDialect = useRecoilValue(sqlDialectState)
  const kyselyVersion = useRecoilValue(kyselyVersionState)
  const typescriptSchema = useRecoilValue(typescriptSchemaState)
  const typescriptQuery = useRecoilValue(typescriptQueryState)
  const showTypescriptSchema = useRecoilValue(showTypescriptSchemaState)
  const [, setLoading] = useRecoilState(loadingState)

  return useCallback(
    async (storeProviderId: StoreProviderId) => {
      setLoading((v) => ({ ...v, share: true }))
      try {
        const value = await ShareUtils.generateShareItem(storeManager, storeProviderId, {
          kyselyVersion,
          showTypescriptSchema,
          sqlDialect,
          typescriptQuery,
          typescriptSchema,
        })
        setLoading((v) => ({ ...v, share: false }))
        return value
      } catch (e: any) {
        setLoading((v) => ({ ...v, share: e.toString() }))
        throw e
      }
    },
    [storeManager, sqlDialect, kyselyVersion, typescriptSchema, typescriptQuery, showTypescriptSchema, setLoading]
  )
}
