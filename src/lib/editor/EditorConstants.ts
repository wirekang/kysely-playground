import { editor, Uri } from "monaco-editor"

export class EditorConstants {
  public static readonly TYPESCRIPT_EDITOR_OPTIONS: editor.IStandaloneEditorConstructionOptions = {
    language: "typescript",
    minimap: { enabled: false },
    model: editor.createModel("", "typescript", Uri.parse("file:///playground.ts")),
    theme: "vs-dark",
    quickSuggestions: {
      strings: false,
      comments: false,
      other: true,
    },
    quickSuggestionsDelay: 10,
    lineNumbers: "off",
    folding: false,
    automaticLayout: true,
  }

  public static readonly SQL_EDITOR_OPTIONS: editor.IStandaloneEditorConstructionOptions = {
    language: "sql",
    minimap: { enabled: false },
    model: editor.createModel("", "typescript", Uri.parse("file:///out.sql")),
    theme: "vs-dark",
    lineNumbers: "off",
    folding: false,
    automaticLayout: true,
    readOnly: true,
    value: 'SELECT "id" FROM "table" where "id" = \'asdf\'',
  }
}
