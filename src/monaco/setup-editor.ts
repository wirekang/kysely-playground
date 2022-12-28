import * as monaco from "monaco-editor";
import { editor } from "monaco-editor";
import { format } from "prettier";
import typescriptParser from "prettier/parser-typescript";

let codeEditor: editor.IStandaloneCodeEditor;

export async function setup(v: {
  extraTypes: { content: string; filePath: string }[];
  onChange: (v: string) => void;
}) {
  v.extraTypes.forEach((t) => {
    addExtraLib(t.content, t.filePath);
  });
  return createEditor("input-container", "", v.onChange);
}

function addExtraLib(content: string, path: string) {
  monaco.languages.typescript.typescriptDefaults.addExtraLib(content, path);
}

function createEditor(root: string, value: string, onChange: (v: string) => void) {
  codeEditor = monaco.editor.create(document.getElementById(root)!, {
    language: "typescript",
    minimap: { enabled: false },
    model: monaco.editor.createModel(value, "typescript", monaco.Uri.parse("file:///main.ts")),
    theme: "vs-dark",
  });
  codeEditor.getModel()?.onDidChangeContent(() => {
    const value = codeEditor.getModel()?.getValue();
    console.log("onDidChangeContent", value);
    if (!value) {
      return;
    }
    onChange(value);
  });
  codeEditor.onDidBlurEditorText(() => {
    prettify();
  });
  prettify();
}

export function prettify() {
  const value = codeEditor.getValue();
  console.log("prettify", value);
  setValue(
    format(value, {
      parser: "typescript",
      plugins: [typescriptParser],
      semi: false,
      trailingComma: "all",
      printWidth: 80,
    })
  );
}

export function setValue(v: string) {
  codeEditor!.setValue(v);
}

export function getValue() {
  return codeEditor!.getValue();
}
