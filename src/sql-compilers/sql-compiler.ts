import type { Compilable, CompiledQuery, Sql } from "kysely_for_type";
import { Kysely } from "kysely_for_type";
import { transpile } from "typescript";
import { WrongResultException } from "../exceptions/wrong-result-exception";
import { MODULE_MAP } from "../gen/kysely-modules";

export abstract class SqlCompiler {
  public kyselyModule!: string;
  readonly #dialectConstructorName: string;

  protected constructor(dc: string) {
    this.#dialectConstructorName = dc;
  }

  async compile(ts: string): Promise<CompiledQuery<any>> {
    const m = (MODULE_MAP as any)[this.kyselyModule];
    if (!m) {
      throw new Error(`Wrong ${this.kyselyModule}`);
    }
    const sql = m["sql"];
    const dialectConstructor = m[this.#dialectConstructorName];
    const kyselyConstructor = m["Kysely"];
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
