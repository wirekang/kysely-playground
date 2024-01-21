export class TypescriptUtils {
  static async format(input: string, options: FormatOptions) {
    const { default: estree } = await import("prettier/plugins/estree");
    const { default: ts } = await import("prettier/plugins/typescript");
    const { format } = await import("prettier/standalone");

    return format(input, {
      printWidth: options.printWidth,
      semi: options.semi,
      singleQuote: options.singleQuotes,
      parser: "typescript",
      plugins: [estree, ts],
    });
  }

  static async transpile(input: string): Promise<string> {
    const ts = await import("typescript");
    return ts.transpile(input, {
      strict: false,
      skipLibCheck: true,
      noImplicitAny: false,
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.ES2020,
    });
  }
}

export type FormatOptions = {
  printWidth?: number;
  semi?: boolean;
  singleQuotes?: boolean;
};
