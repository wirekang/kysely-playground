import { useLoadingScopeEffect } from "src/lib/loading/hooks/useLoadingScopeEffect"
import { useRecoilState, useRecoilValue } from "recoil"
import { sqlResultState } from "src/lib/sql/atoms/sqlResultState"
import { sqlDialectState } from "src/lib/sql/atoms/sqlDialectState"
import { kyselyModuleState } from "src/lib/kysely/atoms/kyselyModuleState"
import { KyselyUtils } from "src/lib/kysely/KyselyUtils"
import { typescriptQueryState } from "src/lib/typescript/atoms/typescriptQueryState"
import { sqlEditorEventsState } from "src/lib/editor/atoms/sqlEditorEventsState"
import { SqlFormatUtils } from "src/lib/sql/SqlFormatUtils"
import { sqlFormatOptionsState } from "src/lib/sql/atoms/sqlFormatOptionsState"

export function useSetSqlResult() {
  const [, setSqlResult] = useRecoilState(sqlResultState)
  const sqlDialect = useRecoilValue(sqlDialectState)
  const kyselyModule = useRecoilValue(kyselyModuleState)
  const typescriptQuery = useRecoilValue(typescriptQueryState)
  const sqlEditorEvents = useRecoilValue(sqlEditorEventsState)
  const sqlFormatOptions = useRecoilValue(sqlFormatOptionsState)

  const setSql = (v: string) => {
    setSqlResult(v)
    sqlEditorEvents?.setValue(v)
  }

  useLoadingScopeEffect(
    "compile",
    async () => {
      if (!kyselyModule || !sqlEditorEvents) {
        return
      }
      let didCallback = false
      await KyselyUtils.compile(kyselyModule, sqlDialect, typescriptQuery, (cq) => {
        didCallback = true
        const sql = SqlFormatUtils.format(cq.sql, cq.parameters as any, sqlDialect, sqlFormatOptions)
        setSql(sql)
      })
      if (!didCallback) {
        setSql("-- Call kysely.execute() ")
      }
    },
    [setSqlResult, sqlDialect, kyselyModule, typescriptQuery, sqlFormatOptions, sqlEditorEvents],
    () => {
      setSql("-- Error")
    }
  )
}
