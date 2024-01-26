import { dynamicImport } from "../utility/dynamic-import";
import { logger } from "../utility/logger";

export class Executer {
  constructor(private readonly importMapping: Record<string, string>) {}

  /**
   *
   * @param js formatted javascript code with infinity-printWidth and semicolons.
   */
  async execute(js: string): Promise<any> {
    logger.debug("Execute:\n", js);
    js = this.replaceImports(js);
    logger.debug("Import replaced:\n", js);
    js = encodeURIComponent(js);
    await dynamicImport(`data:text/javascript;charset=utf-8,${js}`);
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

// TODO
