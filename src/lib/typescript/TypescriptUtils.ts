import { format } from "prettier"
import typescriptParser from "prettier/parser-typescript"
import { TypescriptFormatOption } from "src/lib/typescript/types/TypescriptFormatOption"

export class TypescriptUtils {
  public static async format(ts: string, option: TypescriptFormatOption): Promise<string> {
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
