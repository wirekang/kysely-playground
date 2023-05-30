import { SqlDialect } from "src/lib/sql/types/SqlDialect"
import { MODULES } from "src/generated/modules"

export class KyselyConstants {
  public static readonly VERSIONS = Object.keys(MODULES.kysely)
  public static readonly LATEST_VERSION = KyselyConstants.VERSIONS[0]

  public static readonly DIALECT_ADAPTER_MAPPING = {
    [SqlDialect.Postgres]: "PostgresAdapter",
    [SqlDialect.Mysql]: "MysqlAdapter",
    [SqlDialect.Sqlite]: "SqliteAdapter",
  }

  public static readonly DIALECT_INTROSPECTOR_MAPPING = {
    [SqlDialect.Postgres]: "PostgresIntrospector",
    [SqlDialect.Mysql]: "MysqlIntrospector",
    [SqlDialect.Sqlite]: "SqliteIntrospector",
  }

  public static readonly DIALECT_QUERY_COMPILER_MAPPING = {
    [SqlDialect.Postgres]: "PostgresQueryCompiler",
    [SqlDialect.Mysql]: "MysqlQueryCompiler",
    [SqlDialect.Sqlite]: "SqliteQueryCompiler",
  }
}
