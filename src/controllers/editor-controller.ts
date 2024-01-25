import type monaco from "monaco-editor";
import { logger } from "../lib/utility/logger";
import { CssUtils } from "../lib/utility/css-utils";

export class EditorController {
  static async init(
    element: HTMLElement,
    options: {
      language: string;
    },
  ) {
    const monaco = await import("monaco-editor");
    if (window.MonacoEnvironment === undefined) {
      logger.debug("setup monaco workers");
      const editorWorker = await import("monaco-editor/esm/vs/editor/editor.worker?worker");
      const tsWorker = await import("monaco-editor/esm/vs/language/typescript/ts.worker?worker");
      window.MonacoEnvironment = {
        getWorker(_, label) {
          if (label === "typescript") {
            return new tsWorker.default();
          }
          return new editorWorker.default();
        },
      };
    }

    element.innerHTML = "";
    const editor = monaco.editor.create(element, {
      language: options.language,
      value: "",
      fontFamily: '"Jetbrains Mono", Courier, Consolas, monospace',
      automaticLayout: true,
      lineNumbers: "off",
      minimap: { enabled: false },
      glyphMargin: false,
      folding: false,
      lineDecorationsWidth: 0,
      lineNumbersMinChars: 0,
      showFoldingControls: "never",
      overviewRulerLanes: 0,
      theme: CssUtils.getTheme() === "dark" ? "vs-dark" : "vs",
      scrollBeyondLastLine: false,
      padding: { top: 2 },
    });
    return new EditorController(editor);
  }

  private onChangeHandle?: any;
  private readonly onChangeListeners: Array<(v: string) => unknown> = [];

  private constructor(private readonly editor: monaco.editor.IStandaloneCodeEditor) {
    import("monaco-editor").then((monaco) => {
      CssUtils.colorSchemaEffect(async (light) => {
        monaco.editor.setTheme(light ? "vs" : "vs-dark");
      });
      const model = this.editor.getModel()!;
      model.setEOL(monaco.editor.EndOfLineSequence.LF);
      model.onDidChangeContent((e) => {
        clearTimeout(this.onChangeHandle);
        this.onChangeHandle = setTimeout(() => {
          this.handleOnChange();
        }, 500);
      });
    });
  }

  setReadonly(readOnly: boolean) {
    this.editor.updateOptions({
      readOnly,
      guides: {
        indentation: false,
      },
    });
  }

  // getContentHeight related bug
  // setWordWrap(wordWrap: boolean) {
  //   this.editor.updateOptions({ wordWrap: wordWrap ? "on" : "off" });
  // }

  setHeightByContent(padding = 16) {
    this.editor.updateOptions({
      scrollBeyondLastLine: false,
      selectionHighlight: false,
      renderLineHighlight: "none",
      contextmenu: false,
    });
    this.editor.getContainerDomNode().style.height = this.editor.getContentHeight() + padding + "px";
  }

  enableCleanBlur() {
    this.editor.onDidBlurEditorText(() => {
      this.editor.setSelection({ startLineNumber: 0, startColumn: 0, endLineNumber: 0, endColumn: 0 });
    });
  }

  setValue(v: string) {
    this.editor.setValue(v);
  }

  getValue() {
    return this.editor.getValue();
  }

  focus() {
    this.editor.focus();
  }

  onChange(l: (v: string) => unknown) {
    this.onChangeListeners.push(l);
  }

  private handleOnChange() {
    const v = this.getValue();
    this.onChangeListeners.forEach((l) => {
      l(v);
    });
  }
}
