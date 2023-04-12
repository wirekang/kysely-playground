import { TypescriptFormatOptions } from "src/lib/typescript/types/TypescriptFormatOptions"
import { ModuleKind, transpile } from "typescript"

export class TypescriptUtils {
  public static async format(ts: string, option: TypescriptFormatOptions): Promise<string> {
    const { format } = await import("prettier")
    const typescriptParser = await import("prettier/parser-typescript")
    return format(ts, {
      parser: "typescript",
      plugins: [typescriptParser],
      semi: option.semi,
      trailingComma: "all",
      printWidth: option.printWidth,
      singleQuote: option.singleQuote,
    })
  }

  public static toJs(ts: string): string {
    return transpile(ts, { module: ModuleKind.ES2020 })
      .replace(/^\s*export {};?$/m, "")
      .replace(/^\s*import .+ from .+$/m, "")
      .replace(/\s+await\s+/, " ")
  }
}
