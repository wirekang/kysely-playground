import monaco from "monaco-editor";
import { CssUtils } from "../lib/utility/css-utils";
import { logger } from "../lib/utility/logger";
import { StringUtils } from "../lib/utility/string-utils";
import { DEBUG } from "../lib/constants";
import { AsyncUtils } from "../lib/utility/async-utils.js";

export class EditorController {
  static async init(
    element: HTMLElement,
    options: {
      filePath: string;
      language: string;
    },
  ) {
    const monaco = await import("monaco-editor");
    const model = monaco.editor.createModel("", "typescript", monaco.Uri.file(options.filePath));
    element.innerHTML = "";
    const editor = monaco.editor.create(element, {
      model,
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
      padding: { top: 2 },
      contextmenu: false,
      scrollbar: {
        verticalScrollbarSize: 4,
        verticalSliderSize: 4,
        useShadows: false,
      },
      tabSize: 2,
    });

    // disable F1/F2
    editor.addCommand(monaco.KeyCode.F1, () => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "F1" }));
    });
    editor.addCommand(monaco.KeyCode.F2, () => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "F2" }));
    });

    // hacky vs-code like behavior
    model.onDidChangeContent((e) => {
      const change = e.changes[0]?.text;
      if (!change) {
        return;
      }
      if (["'", '"'].findIndex((it) => change.startsWith(it)) !== -1) {
        setTimeout(() => {
          editor.trigger(null, "editor.action.triggerSuggest", null);
        }, 200);
      }
    });

    return new EditorController(editor);
  }

  private readonly onChangeListeners: Array<(v: string) => unknown> = [];
  private hiddenHeader?: string;

  private constructor(private readonly editor: monaco.editor.IStandaloneCodeEditor) {
    import("monaco-editor").then((monaco) => {
      CssUtils.colorSchemaEffect(async (light) => {
        monaco.editor.setTheme(light ? "vs" : "vs-dark");
      });
      const model = this.editor.getModel()!;
      model.setEOL(monaco.editor.EndOfLineSequence.LF);
      const debounce = AsyncUtils.makeDebounceTimeout(() => {
        return this.invokeOnChange();
      });
      model.onDidChangeContent((e) => {
        debounce();
      });
    });
  }

  setReadonly(readOnly: boolean) {
    this.editor.updateOptions({
      readOnly,
      domReadOnly: readOnly,
    });
  }

  setIndentGuide(v: boolean) {
    this.editor.updateOptions({ guides: { indentation: v } });
  }

  setValue(v: string) {
    if (!this.hiddenHeader) {
      this.editor.setValue(v);
      return;
    }
    this.editor.executeEdits(null, [{ range: this.getWholeSelection(), text: v }]);
  }

  getValue() {
    if (!this.hiddenHeader) {
      return this.editor.getValue();
    }
    return StringUtils.trimPrefix(this.editor.getValue(), this.hiddenHeader);
  }

  focus() {
    this.editor.focus();
  }

  onChange(l: (v: string) => unknown) {
    this.onChangeListeners.push(l);
  }

  invokeOnChange() {
    const v = this.editor.getValue();
    this.onChangeListeners.forEach((l) => {
      l(v);
    });
  }

  setHiddenHeader(hiddenHeader: string) {
    this.hiddenHeader = hiddenHeader;
    const end = this.getHiddenHeaderLineLength();

    if (!DEBUG) {
      // use internal api
      // @ts-ignore
      this.editor.setHiddenAreas([{ startLineNumber: 1, startColumn: 0, endLineNumber: end, endColumn: 0 }]);
    }

    // for auto-import action
    this.editor.getModel()!.onDidChangeContent((e) => {
      if (e.isUndoing || e.isRedoing || e.isEolChange) {
        return;
      }
      const changes = e.changes.filter((it) => {
        return it.range.startLineNumber <= end;
      });
      if (changes.length === 0) {
        return;
      }
      logger.warn("header line changes", changes);
      this.editor.trigger(null, "undo", null);
      changes
        .filter((it) => {
          return it.range.startLineNumber === it.range.endLineNumber;
        })
        .forEach((it) => {
          this.editor.executeEdits(null, [
            {
              range: { startColumn: 1, endColumn: 1, endLineNumber: end + 1, startLineNumber: end + 1 },
              text: it.text.trimStart(),
            },
          ]);
        });
    });

    this.editor.onKeyDown((e) => {
      // prevent backspace
      if (e.keyCode === 1) {
        const selection = this.editor.getSelection();
        if (!selection) {
          return;
        }
        if (
          selection.startLineNumber === selection.endLineNumber &&
          selection.startColumn === selection.endColumn &&
          selection.startLineNumber === end + 1 &&
          selection.startColumn === 1
        ) {
          logger.debug("prevent backspace");
          e.preventDefault();
          e.stopPropagation();
        }
      }
      // custom ctrl + a
      if (e.keyCode === 31 && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        e.stopPropagation();
        this.editor.setSelection(this.getWholeSelection());
      }
    });
  }

  touch() {
    this.setValue(this.getValue());
  }

  private getHiddenHeaderLineLength() {
    if (!this.hiddenHeader) {
      return 0;
    }
    return this.hiddenHeader.split("\n").length - 1;
  }

  private getWholeSelection() {
    return {
      startLineNumber: this.getHiddenHeaderLineLength() + 1,
      endLineNumber: 9999,
      startColumn: 1,
      endColumn: 9999,
    };
  }
}
