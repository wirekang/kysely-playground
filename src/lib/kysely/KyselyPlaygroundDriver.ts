import type { CompiledQuery, DatabaseConnection, Driver, QueryResult, TransactionSettings } from "kysely_for_type"

export class KyselyPlaygroundDriver implements Driver, DatabaseConnection {
  constructor(private callback: (cq: CompiledQuery) => void) {}

  async acquireConnection(): Promise<DatabaseConnection> {
    return this
  }

  beginTransaction(connection: DatabaseConnection, settings: TransactionSettings): Promise<void> {
    return Promise.resolve(undefined)
  }

  commitTransaction(connection: DatabaseConnection): Promise<void> {
    return Promise.resolve(undefined)
  }

  destroy(): Promise<void> {
    return Promise.resolve(undefined)
  }

  init(): Promise<void> {
    return Promise.resolve(undefined)
  }

  releaseConnection(connection: DatabaseConnection): Promise<void> {
    return Promise.resolve(undefined)
  }

  rollbackTransaction(connection: DatabaseConnection): Promise<void> {
    return Promise.resolve(undefined)
  }

  executeQuery<R>(compiledQuery: CompiledQuery): Promise<QueryResult<R>> {
    this.callback(compiledQuery)
    return Promise.resolve({ rows: [] })
  }

  streamQuery<R>(compiledQuery: CompiledQuery, chunkSize?: number): AsyncIterableIterator<QueryResult<R>> {
    this.callback(compiledQuery)
    return (async function* g() {
      yield { rows: [] }
    })()
  }
}
