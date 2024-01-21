import { JsDelivrUtils } from "../jsdelivr/jsdelivr-utils";
import { TypescriptModule } from "./typescript-module";

export class TypescriptManager {
  static async init(): Promise<TypescriptManager> {
    const versions = await JsDelivrUtils.listNpmVersions("typescript");
    const modules = versions.map((version) => new TypescriptModule(version));
    return new TypescriptManager(modules);
  }

  private constructor(readonly modules: Array<TypescriptModule>) {}
}
