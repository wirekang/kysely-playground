export class MonacoUtils {
  static async init() {
    window.MonacoEnvironment = {
      async getWorker() {
        return new (await import("monaco-editor/esm/vs/language/typescript/ts.worker?worker")).default();
      },
    };
    const monaco = await import("monaco-editor");
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.ESNext,
      target: monaco.languages.typescript.ScriptTarget.ESNext,
      strict: true,
      noImplicitAny: true,
    });
  }

  static async addLib(filePath: string, value: string) {
    const monaco = await import("monaco-editor");
    monaco.languages.typescript.typescriptDefaults.addExtraLib(value, filePath);
  }
}
