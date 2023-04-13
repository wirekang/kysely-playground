import type {
  CompiledQuery,
  DatabaseIntrospector,
  Dialect,
  DialectAdapter,
  Kysely,
  QueryCompiler,
  Sql,
} from "kysely_for_type"
import { KyselyPlaygroundDriver } from "src/lib/kysely/KyselyPlaygroundDriver"
import type { SqlDialect } from "src/lib/sql/types/SqlDialect"
import { IMPORT_MAP } from "src/generated/kysely-modules"
import { KyselyConstants } from "src/lib/kysely/KyselyConstants"
import { TypescriptUtils } from "src/lib/typescript/TypescriptUtils"
import { LogUtils } from "src/lib/log/LogUtils"
import { PlaygroundError } from "src/lib/error/PlaygroundError"

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

  private static createDialect(module: any, sqlDialect: SqlDialect, callback: (cq: CompiledQuery) => void) {
    return KyselyUtils.createDialectFromTypes(
      module[KyselyConstants.DIALECT_ADAPTER_MAPPING[sqlDialect]],
      module[KyselyConstants.DIALECT_INTROSPECTOR_MAPPING[sqlDialect]],
      module[KyselyConstants.DIALECT_QUERY_COMPILER_MAPPING[sqlDialect]],
      callback
    )
  }

  private static createDialectFromTypes(
    adapterType: Type<DialectAdapter>,
    introspectorType: Type<DatabaseIntrospector>,
    queryCompilerType: Type<QueryCompiler>,
    callback: (cq: CompiledQuery) => void
  ): Dialect {
    return {
      createAdapter() {
        return new adapterType()
      },
      createDriver() {
        return new KyselyPlaygroundDriver(callback)
      },
      createIntrospector(db: Kysely<any>) {
        return new introspectorType(db)
      },
      createQueryCompiler() {
        return new queryCompilerType()
      },
    }
  }

  public static async compile(kyselyModule: any, sqlDialect: SqlDialect, ts: string, cb: (cq: CompiledQuery) => void) {
    const dialect = KyselyUtils.createDialect(kyselyModule, sqlDialect, cb)
    const Kysely = kyselyModule["Kysely"]
    const kysely = new Kysely({ dialect })
    const sql = kyselyModule["sql"]
    const evalResult = await doEval({ ts, instance: kysely, sql })
    if (evalResult.result !== null) {
      LogUtils.info("Detect legacy result")
      if (typeof evalResult.result.execute !== "function") {
        throw new PlaygroundError("`result` is not an QueryBuilder")
      }
      evalResult.result.execute()
    } else if (evalResult.expression && typeof evalResult.expression.execute === "function") {
      evalResult.expression.execute()
    }
  }
}

interface Type<T = any> extends Function {
  new (...args: any[]): T
}

async function doEval(longArgumentNameToPreventConflicts: { ts: string; sql: Sql; instance: Kysely<any> }) {
  const sql = longArgumentNameToPreventConflicts.sql
  const kysely = longArgumentNameToPreventConflicts.instance
  const db = kysely
  let result: any = null
  const expression = eval(await TypescriptUtils.toJs(longArgumentNameToPreventConflicts.ts))

  // to prevent minification
  return { sql, kysely, db, result, expression }
}
