import { TypescriptFormatOptions } from "src/lib/typescript/types/TypescriptFormatOptions"

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
}
