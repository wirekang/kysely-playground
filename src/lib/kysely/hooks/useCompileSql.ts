import { useRecoilState, useRecoilValue } from "recoil"
import { shareableStateState } from "src/lib/state/atoms/shareableStateState"
import { KyselyUtils } from "src/lib/kysely/KyselyUtils"
import { useCallback, useEffect, useState } from "react"
import { loadingState } from "src/lib/loading/atoms/loadingState"
import { LogUtils } from "src/lib/log/LogUtils"
import type { CompiledQuery, Dialect } from "kysely_for_type"
import { kyselyTypeState } from "src/lib/kysely/atoms/kyselyTypeState"
import { sqlResultState } from "src/lib/sql/atoms/sqlResultState"
import { errorState } from "src/lib/error/atoms/errorState"
import { SqlFormatUtils } from "src/lib/sql/SqlFormatUtils"
import { sqlFormatOptionsState } from "src/lib/sql/atoms/sqlFormatOptionsState"

export function useCompileSql() {
  const [, setLoading] = useRecoilState(loadingState)
  const shareableState = useRecoilValue(shareableStateState)
  const [, setKyselyType] = useRecoilState(kyselyTypeState)
  const [, setSqlResult] = useRecoilState(sqlResultState)
  const [init, setInit] = useState(false)
  const [dialect, setDialect] = useState<Dialect>()
  const [module, setModule] = useState<any>()
  const [, setError] = useRecoilState(errorState)
  const sqlFormatOptions = useRecoilValue(sqlFormatOptionsState)

  const cb = useCallback(
    (cq: CompiledQuery) => {
      const sql = SqlFormatUtils.format(cq.sql, cq.parameters as any, shareableState.dialect, sqlFormatOptions)
      setSqlResult({ sql, parameters: cq.parameters as any })
    },
    [setSqlResult, shareableState.dialect, sqlFormatOptions]
  )

  useEffect(() => {
    ;(async () => {
      if (!init) {
        setInit(true)
      }
      setLoading((v) => ({ ...v, kysely: true }))
      LogUtils.info("stated changed", shareableState.kyselyVersion, shareableState.dialect)
      const module = await KyselyUtils.importModule(shareableState.kyselyVersion)
      const type = await KyselyUtils.loadType(shareableState.kyselyVersion)
      setKyselyType(type)
      setDialect(KyselyUtils.createDialect(module, shareableState.dialect, cb))
      setModule(module)
      setLoading((v) => ({ ...v, kysely: false }))
    })()
  }, [init, shareableState.dialect, shareableState.kyselyVersion, cb, setKyselyType, setDialect, setModule])

  useEffect(() => {
    if (!module || !dialect) {
      return
    }

    const Kysely = module["Kysely"]
    const kysely = new Kysely({ dialect })
    const sql = module["sql"]

    try {
      KyselyUtils.eval({ ts: shareableState.ts, instance: kysely, sql })
    } catch (e: any) {
      setError({ name: e.name, message: e.message })
      LogUtils.info(e.toString())
    }
  }, [dialect, shareableState.ts, module])
}
