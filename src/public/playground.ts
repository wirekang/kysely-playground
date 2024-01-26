import type {
  Kysely,
  Driver,
  DatabaseConnection,
  TransactionSettings,
  CompiledQuery,
  QueryResult,
  Dialect,
  KyselyConfig,
  DatabaseIntrospector,
  DialectAdapter,
  QueryCompiler,
} from "kysely-0.27.2";

interface KyselyConstructor<T> extends Function {
  new (config: KyselyConfig): Kysely<T>;
}

export function init(
  kyselyConstructor: KyselyConstructor<any>,
  adapter: DialectAdapter,
  introspector: DatabaseIntrospector,
  queryCompiler: QueryCompiler,
) {
  const kysely = new kyselyConstructor({
    dialect: new PlaygroundDialect(queryCompiler, adapter, introspector),
  });

  return { kysely };
}

class PlaygroundDialect implements Dialect {
  constructor(
    private readonly queryCompiler: QueryCompiler,
    private readonly adapter: DialectAdapter,
    private readonly introspector: DatabaseIntrospector,
  ) {}
  createDriver(): Driver {
    return new PlaygroundDriver();
  }

  createQueryCompiler(): QueryCompiler {
    return this.queryCompiler;
  }

  createAdapter(): DialectAdapter {
    return this.adapter;
  }

  createIntrospector(db: Kysely<any>): DatabaseIntrospector {
    return this.introspector;
  }
}

const resolved = Promise.resolve();
function dispatch(method: string, detail: any = {}) {
  window.dispatchEvent(new CustomEvent("playground", { detail: { method, ...detail } }));
}

class PlaygroundDriver implements Driver {
  init(): Promise<void> {
    dispatch("init");
    return resolved;
  }

  acquireConnection(): Promise<DatabaseConnection> {
    dispatch("acquireConnection");
    return Promise.resolve(new PlaygroundConnection());
  }

  beginTransaction(connection: DatabaseConnection, settings: TransactionSettings): Promise<void> {
    dispatch("beginTransaction", { settings });
    return resolved;
  }

  commitTransaction(connection: DatabaseConnection): Promise<void> {
    dispatch("commitTransaction");
    return resolved;
  }

  rollbackTransaction(connection: DatabaseConnection): Promise<void> {
    dispatch("rollbackTransaction");
    return resolved;
  }

  releaseConnection(connection: DatabaseConnection): Promise<void> {
    dispatch("releaseConnection");
    return resolved;
  }

  destroy(): Promise<void> {
    dispatch("destroy");
    return resolved;
  }
}

const queryResult: QueryResult<any> = { rows: [] };

class PlaygroundConnection implements DatabaseConnection {
  executeQuery<R>(compiledQuery: CompiledQuery<unknown>): Promise<QueryResult<R>> {
    dispatch("executeQuery", { compiledQuery });
    return Promise.resolve(queryResult);
  }

  streamQuery<R>(
    compiledQuery: CompiledQuery<unknown>,
    chunkSize?: number | undefined,
  ): AsyncIterableIterator<QueryResult<R>> {
    dispatch("streamQuery", { compiledQuery, chunkSize });
    return (async function* g() {
      yield queryResult;
    })();
  }
}
