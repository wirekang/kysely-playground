import * as monaco from "monaco-editor";
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
    });
    return new EditorController(editor);
  }

  private constructor(private readonly editor: monaco.editor.IStandaloneCodeEditor) {
    CssUtils.colorSchemaEffect((light) => {
      monaco.editor.setTheme(light ? "vs" : "vs-dark");
    });
  }

  setReadonly(readOnly: boolean) {
    this.editor.updateOptions({ readOnly });
  }
}
