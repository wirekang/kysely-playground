import { dynamicImport } from "../dynamic-import";
import { JsDelivrUtils } from "../jsdelivr/jsdelivr-utils";

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

  async transpile(input: string) {
    const module = await this.loadModule();
    return module.transpile(input, {});
  }
}
