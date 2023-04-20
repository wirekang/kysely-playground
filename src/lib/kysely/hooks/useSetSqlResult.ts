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
import { userTypingState } from "src/lib/ui/atoms/userTypingState"

export function useSetSqlResult() {
  const [, setSqlResult] = useRecoilState(sqlResultState)
  const sqlDialect = useRecoilValue(sqlDialectState)
  const kyselyModule = useRecoilValue(kyselyModuleState)
  const typescriptQuery = useRecoilValue(typescriptQueryState)
  const sqlEditorEvents = useRecoilValue(sqlEditorEventsState)
  const sqlFormatOptions = useRecoilValue(sqlFormatOptionsState)
  const userTyping = useRecoilValue(userTypingState)

  const setSql = (v: string) => {
    setSqlResult(v)
    sqlEditorEvents?.setValue(v)
  }

  useLoadingScopeEffect(
    "compile",
    async () => {
      if (!kyselyModule || !sqlEditorEvents || userTyping) {
        return
      }
      const results: string[] = []
      await KyselyUtils.compile(
        kyselyModule,
        sqlDialect,
        typescriptQuery,
        (cq) => {
          const sql = SqlFormatUtils.format(cq.sql, cq.parameters as any, sqlDialect, sqlFormatOptions)
          results.push(sql)
        },
        { rows: [{}, {}, {}] }
      )
      setTimeout(() => {
        if (results.length === 0) {
          setSql("---- Call kysely.execute() ")
        } else if (results.length === 1) {
          setSql(results[0])
        } else {
          const sql =
            "/* execute() has been called multiple times. */\n\n" +
            results
              .map((sql, i) => {
                return `---- #${i + 1} ----\n${sql}`
              })
              .join("\n\n\n")
          setSql(sql)
        }
      })
    },
    [setSqlResult, sqlDialect, kyselyModule, typescriptQuery, sqlFormatOptions, sqlEditorEvents, userTyping],
    () => {
      setSql("-- Error")
    }
  )
}
