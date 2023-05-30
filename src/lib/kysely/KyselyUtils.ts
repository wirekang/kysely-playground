import type {
  CompiledQuery,
  DatabaseIntrospector,
  Dialect,
  DialectAdapter,
  Driver,
  Kysely,
  QueryCompiler,
  QueryResult,
} from "kysely_for_type"
import { KyselyPlaygroundDriver } from "src/lib/kysely/KyselyPlaygroundDriver"
import type { SqlDialect } from "src/lib/sql/types/SqlDialect"
import { KyselyConstants } from "src/lib/kysely/KyselyConstants"
import { TypescriptUtils } from "src/lib/typescript/TypescriptUtils"
import { ModuleUtils } from "src/lib/module/ModuleUtils"
import { ModuleFunction } from "src/lib/module/types/ModuleFunction"

export class KyselyUtils {
  private static createDialect(module: any, sqlDialect: SqlDialect, driver: Driver) {
    return KyselyUtils.createDialectFromTypes(
      module[KyselyConstants.DIALECT_ADAPTER_MAPPING[sqlDialect]],
      module[KyselyConstants.DIALECT_INTROSPECTOR_MAPPING[sqlDialect]],
      module[KyselyConstants.DIALECT_QUERY_COMPILER_MAPPING[sqlDialect]],
      driver
    )
  }

  private static createDialectFromTypes(
    adapterType: Type<DialectAdapter>,
    introspectorType: Type<DatabaseIntrospector>,
    queryCompilerType: Type<QueryCompiler>,
    driver: Driver
  ): Dialect {
    return {
      createAdapter() {
        return new adapterType()
      },
      createDriver() {
        return driver
      },
      createIntrospector(db: Kysely<any>) {
        return new introspectorType(db)
      },
      createQueryCompiler() {
        return new queryCompilerType()
      },
    }
  }

  public static async compile(
    version: string,
    sqlDialect: SqlDialect,
    ts: string,
    cb: (cq: CompiledQuery) => void,
    result: QueryResult<any>
  ) {
    const driver = new KyselyPlaygroundDriver(cb, result)
    const moduleFunction = await ModuleUtils.makeModuleFunction(version)
    const kyselyModule = moduleFunction("kysely")
    const dialect = KyselyUtils.createDialect(kyselyModule, sqlDialect, driver)
    const Kysely = kyselyModule["Kysely"]
    const kysely = new Kysely({ dialect })
    const evalResult = await doEval({ ts, instance: kysely, moduleFunction })
  }
}

interface Type<T = any> extends Function {
  new (...args: any[]): T
}

async function doEval(__longNamedArgumentForPreventConflicts__: {
  ts: string
  instance: Kysely<any>
  moduleFunction: ModuleFunction
}) {
  const kysely = __longNamedArgumentForPreventConflicts__.instance
  const db = kysely

  let __TOP_LEVEL_FUNCTION__ = null as any
  eval(await TypescriptUtils.toJs(__longNamedArgumentForPreventConflicts__.ts))
  await __TOP_LEVEL_FUNCTION__(__longNamedArgumentForPreventConflicts__.moduleFunction)

  // to prevent minification
  return { kysely, db }
}
