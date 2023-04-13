export class TypescriptUtils {
  public static async toJs(ts: string): Promise<string> {
    const { ModuleKind, transpile } = await import("typescript")
    return transpile(ts, { module: ModuleKind.ES2020 })
      .replace(/^\s*export {};?$/m, "")
      .replace(/^\s*import .+ from .+$/m, "")
      .replace(/\s+await\s+/, " ")
  }
}
