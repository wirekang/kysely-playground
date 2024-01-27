import { logger } from "./logger";

export class TypescriptUtils {
  static async transpile(input: string): Promise<string> {
    logger.debug("transpile:\n", input);
    const ts = await import("typescript");
    return ts.transpile(input, {
      strict: false,
      skipLibCheck: true,
      noImplicitAny: false,
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.ES2020,
    });
  }

  static async getVersion(): Promise<string> {
    return (await import("typescript")).version;
  }
}
