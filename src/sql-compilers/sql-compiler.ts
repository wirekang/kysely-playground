import type { Compilable, CompiledQuery, Sql } from "kysely_for_type";
import { Kysely } from "kysely_for_type";
import { transpile } from "typescript";
import { WrongResultException } from "../exceptions/wrong-result-exception";
import { IMPORT_MAP } from "../gen/kysely-modules";

export abstract class SqlCompiler {
  public kyselyModule!: string;
  readonly #dialectConstructorName: string;

  protected constructor(dc: string) {
    this.#dialectConstructorName = dc;
  }

  async compile(ts: string): Promise<CompiledQuery<any>> {
    const importF = IMPORT_MAP[this.kyselyModule as keyof typeof IMPORT_MAP];
    if (!importF) {
      throw new Error(`Wrong ${this.kyselyModule}`);
    }
    const m = await importF();
    const sql = m["sql"] as any;
    const dialectConstructor = m[this.#dialectConstructorName as "MysqlDialect"] as any;
    const kyselyConstructor = m["Kysely"] as any;
    const instance = new kyselyConstructor({ dialect: new dialectConstructor({}) });
    const { result } = doEval({ ts, instance, sql });
    if (!result || typeof result?.compile !== "function") {
      throw new WrongResultException();
    }
    return result.compile();
  }
}

function doEval(longArgumentNameToPreventConflicts: {
  ts: string;
  sql: Sql;
  instance: Kysely<any>;
}) {
  const sql = longArgumentNameToPreventConflicts.sql;
  const kysely = longArgumentNameToPreventConflicts.instance;
  const db = kysely;
  let result: Compilable<any> | null = null as any;
  const exports = {};
  eval(transpile(longArgumentNameToPreventConflicts.ts));
  // prevent minification
  return { kysely, db, result, sql, exports };
}
