import { JsDelivrUtils } from "../jsdelivr/jsdelivr-utils";
import { TypescriptModule } from "./typescript-module";

export class TypescriptManager {
  static async init(): Promise<TypescriptManager> {
    let versions = await JsDelivrUtils.listNpmVersions("typescript");
    versions = versions
      .filter(
        (it: string, i: number) =>
          !it.includes("-dev") && !it.includes("-insiders") && !it.includes("-beta") && !it.includes("-rc"),
      )
      .filter((it: string) => !isOldVersion(it));
    const modules = versions.map((version) => new TypescriptModule(version));
    return new TypescriptManager(modules);
  }

  private constructor(readonly modules: Array<TypescriptModule>) {}
}

function isOldVersion(v: string): boolean {
  try {
    return parseInt(v.split(".")[0]) < 4;
  } catch {
    return false;
  }
}
