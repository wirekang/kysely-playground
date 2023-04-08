import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import * as monaco from "monaco-editor";

export class TypescriptEditor {
  public onValueChange?: (ts: string) => void;
  #editor!: monaco.editor.IStandaloneCodeEditor;

  constructor(root: string) {
    this.#setupWorker();
    this.#setupTs();
    this.#create(root);
  }

  public get value(): string {
    return this.#editor.getValue();
  }

  public set value(v: string) {
    this.#editor.setValue(v);
  }

  public setExtraLibs(
    libs: {
      content: string;
      filePath: string;
    }[]
  ) {
    monaco.languages.typescript.typescriptDefaults.setExtraLibs(libs);
  }

  #setupTs() {
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      module: monaco.languages.typescript.ModuleKind.ESNext,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      target: monaco.languages.typescript.ScriptTarget.ESNext,
      strict: true,
      noImplicitAny: true,
      strictNullChecks: true,
    });
  }

  #create(root: string) {
    this.#editor = monaco.editor.create(document.getElementById(root)!, {
      language: "typescript",
      minimap: { enabled: false },
      model: monaco.editor.createModel("", "typescript", monaco.Uri.parse("file:///main.ts")),
      theme: "vs-dark",
      quickSuggestions: {
        strings: false,
        comments: false,
        other: true,
      },
      quickSuggestionsDelay: 1,
      lineNumbers: "off",
      folding: false,
      scrollBeyondLastLine: false,
      automaticLayout: true,
    });
    this.#editor.getModel()!.onDidChangeContent((e) => {
      this.onValueChange && this.onValueChange(this.value);
      const change = e.changes[0]?.text;
      if (!change) {
        return;
      }
      const shouldSuggest = change.startsWith("'") || change.startsWith('"');
      if (shouldSuggest) {
        setTimeout(() => {
          this.#editor.trigger(null, "editor.action.triggerSuggest", null);
        }, 100);
      }
    });
  }

  #setupWorker() {
    self.MonacoEnvironment = {
      getWorker() {
        return new tsWorker();
      },
    };
  }
}
