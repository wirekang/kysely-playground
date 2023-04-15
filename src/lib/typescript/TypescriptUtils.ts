export class TypescriptUtils {
  public static async toJs(ts: string): Promise<string> {
    const { ModuleKind, transpile } = await import("typescript")
    return transpile(ts, { module: ModuleKind.ES2020 })
      .replace(/^\s*export {};?$/gm, "")
      .replace(/^\s*import .+ from .+$/gm, "")
      .replace(/\s+await\s+/g, " ")
  }
}
