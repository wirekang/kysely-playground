import KYSELY_VERSIONS from "src/generated/versions.json"
import { SqlDialect } from "src/lib/sql/types/SqlDialect"

export class KyselyConstants {
  public static readonly VERSIONS = KYSELY_VERSIONS
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
