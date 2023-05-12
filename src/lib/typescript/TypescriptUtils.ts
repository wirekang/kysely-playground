import { LogUtils } from "src/lib/log/LogUtils"

export class TypescriptUtils {
  public static readonly TOP_LEVEL_FUNCTION_NAME = "__TOP_LEVEL_FUNCTION__"
  private static readonly MODULE_ARGUMENT_NAME = "__MODULE__"

  public static async toJs(ts: string): Promise<string> {
    const { ModuleKind, transpile, ScriptTarget } = await import("typescript")
    let js = transpile(ts, { module: ModuleKind.ES2020, target: ScriptTarget.ES2020 })
    LogUtils.info("=== Start transpile ===")
    LogUtils.info(js)
    js = this.removeExports(js)
    LogUtils.info(js)
    js = this.importToConst(js)
    LogUtils.info(js)
    js = this.wrap(js)
    LogUtils.info(js)
    return js
  }

  private static wrap(js: string): string {
    return `${this.TOP_LEVEL_FUNCTION_NAME} = async function(${this.MODULE_ARGUMENT_NAME}){\n${js}\n}`
  }

  private static removeExports(js: string): string {
    return js.replace(/^\s*export {};?$/gm, "")
  }

  private static importToConst(js: string): string {
    return js.replace(/^\s*import (.+) from ([^;]+)/m, `const $1 = ${this.MODULE_ARGUMENT_NAME}[$2]`)
  }
}
