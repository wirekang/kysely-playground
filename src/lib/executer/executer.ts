import { CompiledQuery } from "kysely-0.27.2";
import { dynamicImport } from "../utility/dynamic-import";
import { logger } from "../utility/logger";

export class Executer {
  constructor(private readonly importMapping: Record<string, string>) {}

  /**
   *
   * @param js formatted javascript code with infinity-printWidth and semicolons.
   */
  async execute(js: string) {
    const module = this.makeModule(js);
    const outputs: Array<ExecuteOutput> = [];
    const cb = ({ detail }: any) => {
      const method = detail.method as string;
      logger.debug("playground: ", detail);
      switch (method) {
        case "executeQuery":
        case "streamQuery":
          const cc = detail.compiledQuery as CompiledQuery;
          outputs.push({ type: "query", sql: cc.sql, parameters: [...cc.parameters] });
          break;
        case "beginTransaction":
          const settings = detail.settings;
          outputs.push({ type: "transaction", type2: "begin", isolationLevel: settings.isolationLevel });
          break;
        case "commitTransaction":
          outputs.push({ type: "transaction", type2: "commit" });
          break;
        case "rollbackTransaction":
          outputs.push({ type: "transaction", type2: "rollback" });
          break;
      }
    };
    window.addEventListener("playground", cb);
    try {
      await dynamicImport(module);
    } catch (e: any) {
      const message = e.message ?? `${e}`;
      outputs.push({ type: "error", message });
    } finally {
      window.removeEventListener("playground", cb);
    }
    return outputs;
  }

  private makeModule(js: string) {
    logger.debug("Execute:\n", js);
    js = this.replaceImports(js);
    logger.debug("Import replaced:\n", js);
    js = encodeURIComponent(js);
    return `data:text/javascript;charset=utf-8,${js}`;
  }

  private replaceImports(js: string): string {
    return js.replace(/^(\s*import .+ from) (.+);/gm, (match: string, p1: string, p2: string) => {
      p2 = p2.trim();
      const quote = p2[0];
      if (quote !== p2[p2.length - 1]) {
        throw new ExecuterError(`quote mismatch: ${quote} !== ${p2[p2.length - 1]}`);
      }
      p2 = p2.substring(1, p2.length - 1);
      if (this.importMapping[p2]) {
        return `${p1} ${quote}${this.importMapping[p2]}${quote};`;
      }
      return match;
    });
  }
}

class ExecuterError extends Error {}

export type ExecuteOutput = ExecuteOutputQuery | ExecuteOutputError | ExecuteOutputTransaction;

type ExecuteOutputQuery = {
  type: "query";
  sql: string;
  parameters: Array<unknown>;
};

type ExecuteOutputError = {
  type: "error";
  message: string;
};

type ExecuteOutputTransaction = ExecuteOutputTransactionBegin | ExecuteOutputTransactionOther;

type ExecuteOutputTransactionBegin = {
  type: "transaction";
  type2: "begin";
  isolationLevel?: string;
};

type ExecuteOutputTransactionOther = {
  type: "transaction";
  type2: "rollback" | "commit";
};
