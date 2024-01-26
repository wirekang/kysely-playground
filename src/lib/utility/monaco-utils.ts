export class MonacoUtils {
  static async init() {
    window.MonacoEnvironment = {
      async getWorker() {
        return new (await import("monaco-editor/esm/vs/language/typescript/ts.worker?worker")).default();
      },
    };
    const monaco = await import("monaco-editor");
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      module: monaco.languages.typescript.ModuleKind.ESNext,
    });
  }
}
