import { format } from "prettier";
import typescriptParser from "prettier/parser-typescript";
import { TypescriptFormatOptions } from "./typings/formatter";

export class TypescriptFormatter {
  public async format(v: string, options: TypescriptFormatOptions) {
    return format(v, {
      parser: "typescript",
      plugins: [typescriptParser],
      semi: options.semi,
      trailingComma: "all",
      printWidth: options.printWidth,
      singleQuote: options.singleQuote,
    });
  }
}
