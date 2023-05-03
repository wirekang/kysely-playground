import type {
  CompiledQuery,
  DatabaseIntrospector,
  Dialect,
  DialectAdapter,
  Driver,
  Kysely,
  QueryCompiler,
  QueryResult,
  Sql,
} from "kysely_for_type"
import { KyselyPlaygroundDriver } from "src/lib/kysely/KyselyPlaygroundDriver"
import type { SqlDialect } from "src/lib/sql/types/SqlDialect"
import { IMPORT_MAP } from "src/generated/kysely-modules"
import { KyselyConstants } from "src/lib/kysely/KyselyConstants"
import { TypescriptUtils } from "src/lib/typescript/TypescriptUtils"

export class KyselyUtils {
  public static async loadType(version: string): Promise<string> {
    const module = await import(`../../generated/types/kysely_${version.replaceAll(".", "_")}.d.ts?raw`)
    return module.default
  }

  public static importModule(version: string) {
    const importFunction = IMPORT_MAP[KyselyUtils.versionToAlias(version) as keyof typeof IMPORT_MAP]
    if (!importFunction) {
      throw new Error(`No kysely module for version ${version}`)
    }
    return importFunction()
  }

  private static versionToAlias(v: string) {
    return `kysely_${v.replaceAll(".", "_")}`
  }

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
    kyselyModule: any,
    sqlDialect: SqlDialect,
    ts: string,
    cb: (cq: CompiledQuery) => void,
    result: QueryResult<any>
  ) {
    const driver = new KyselyPlaygroundDriver(cb, result)
    const dialect = KyselyUtils.createDialect(kyselyModule, sqlDialect, driver)
    const Kysely = kyselyModule["Kysely"]
    const kysely = new Kysely({ dialect })
    const sql = kyselyModule["sql"]
    const evalResult = await doEval({ ts, instance: kysely, sql })
  }
}

interface Type<T = any> extends Function {
  new (...args: any[]): T
}

async function doEval(longArgumentNameToPreventConflicts: { ts: string; sql: Sql; instance: Kysely<any> }) {
  const sql = longArgumentNameToPreventConflicts.sql
  const kysely = longArgumentNameToPreventConflicts.instance
  const db = kysely
  let __TOP_LEVEL_FUNCTION__ = null as any
  eval(await TypescriptUtils.toJs(longArgumentNameToPreventConflicts.ts))
  await __TOP_LEVEL_FUNCTION__()
  // to prevent minification
  return { sql, kysely, db }
}
