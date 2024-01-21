import { TRANSPILE_TOP_LEVEL_FUNCTION } from "../constants";
import { TRANSPILE_IMPORT_FUNCTION } from "../constants";
import { dynamicImport } from "../dynamic-import";
import { JsDelivrUtils } from "../jsdelivr/jsdelivr-utils";
import { logger } from "../log/logger";

/** typeof namespace ts */
declare type Typescript = typeof import("typescript");

export class TypescriptModule {
  private cachedModule: Typescript | null = null;
  constructor(readonly version: string) {}

  private async loadModule(): Promise<Typescript> {
    if (this.cachedModule != null) {
      return this.cachedModule;
    }
    this.cachedModule = (
      await dynamicImport(JsDelivrUtils.esm("typescript", this.version, "lib/typescript.js"))
    ).default;
    return this.cachedModule as any;
  }

  async transpile(ts: string) {
    const module = await this.loadModule();
    logger.debug("Start transpile", this.version);
    logger.debug("1. ts:\n", ts);
    let js = module.transpile(ts, {
      module: module.ModuleKind.ES2020,
      target: module.ScriptTarget.ES2020,
      strict: false,
      noImplicitAny: false,
      strictNullChecks: false,
      skipLibCheck: true,
    });
    logger.debug("2. js:\n", js);
    return js;
  }
}
