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
import { SqlDialect } from "src/lib/sql/types/SqlDialect"
import { IMPORT_MAP } from "src/generated/kysely-modules"
import { KyselyConstants } from "src/lib/kysely/KyselyConstants"
import { TypescriptUtils } from "src/lib/typescript/TypescriptUtils"

export class KyselyUtils {
  public static async loadType(version: string): Promise<string> {
    const module = await import(`../../generated/types/kysely_${version.replaceAll(".", "_")}.d.ts?raw`)
    return module.default
  }

  public static async importModule(version: string) {
    const importFunction = IMPORT_MAP[this.versionToAlias(version) as keyof typeof IMPORT_MAP]
    if (!importFunction) {
      throw new Error(`No kysely module for version ${version}`)
    }
    return importFunction()
  }

  private static versionToAlias(v: string) {
    return `kysely_${v.replaceAll(".", "_")}`
  }

  public static createDialect(module: any, sqlDialect: SqlDialect, callback: (cq: CompiledQuery) => void) {
    return this.createDialectFromTypes(
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

  public static eval(longArgumentNameToPreventConflicts: { ts: string; sql: Sql; instance: Kysely<any> }) {
    const sql = longArgumentNameToPreventConflicts.sql
    const kysely = longArgumentNameToPreventConflicts.instance
    const db = kysely
    eval(TypescriptUtils.toJs(longArgumentNameToPreventConflicts.ts))

    // to prevent minification
    return { sql, kysely, db }
  }
}

export interface Type<T = any> extends Function {
  new (...args: any[]): T
}
