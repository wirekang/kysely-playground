import { languages } from "monaco-editor"
import ScriptTarget = languages.typescript.ScriptTarget

export class TypescriptUtils {
  public static readonly TOP_LEVEL_FUNCTION_NAME = "__TOP_LEVEL_FUNCTION__"
  public static async toJs(ts: string): Promise<string> {
    const { ModuleKind, transpile } = await import("typescript")
    const wrappedTs = `${this.TOP_LEVEL_FUNCTION_NAME} = async function(){\n\n${ts}\n\n}`
    const js = transpile(wrappedTs, { module: ModuleKind.ES2020, target: ScriptTarget.ES2020 })
    const withoutImportJs = js.replace(/^\s*export {};?$/gm, "").replace(/^\s*import .+ from .+$/gm, "")
    return withoutImportJs
  }
}
