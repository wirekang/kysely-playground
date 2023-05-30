import { editor, Uri } from "monaco-editor"

export class EditorConstants {
  public static readonly TYPESCRIPT_SCHEMA_FILE_PATH = "file:///schema.d.ts"
  public static readonly TYPESCRIPT_QUERY_FILE_PATH = "file:///query.ts"
  public static readonly SQL_FILE_PATH = "file:///sql.sql"
  public static readonly PLAYGROUND_GLOBAL_TYPE_PATH = "file:///playground-global.d.ts"

  private static readonly COMMON_EDITOR_OPTIONS: editor.IStandaloneEditorConstructionOptions = {
    minimap: { enabled: false },
    theme: "vs-dark",
    quickSuggestions: {
      strings: false,
      comments: false,
      other: true,
    },
    quickSuggestionsDelay: 10,
    lineNumbers: "off",
    folding: false,
    fontFamily: "Jetbrains Mono",
    padding: { top: 2, bottom: 4 },
    automaticLayout: true,
    overviewRulerBorder: false,
    overviewRulerLanes: 0,
    scrollBeyondLastColumn: 0,
    tabSize: 2,
  }

  public static readonly TYPESCRIPT_SCHEMA_EDITOR_OPTIONS: editor.IStandaloneEditorConstructionOptions = {
    ...EditorConstants.COMMON_EDITOR_OPTIONS,
    language: "typescript",
    scrollBeyondLastLine: false,
    model: editor.createModel("", "typescript", Uri.parse(EditorConstants.TYPESCRIPT_SCHEMA_FILE_PATH)),
  }

  public static readonly TYPESCRIPT_QUERY_EDITOR_OPTIONS: editor.IStandaloneEditorConstructionOptions = {
    ...EditorConstants.COMMON_EDITOR_OPTIONS,
    language: "typescript",
    scrollBeyondLastLine: false,
    model: editor.createModel("", "typescript", Uri.parse(EditorConstants.TYPESCRIPT_QUERY_FILE_PATH)),
  }

  public static readonly SQL_EDITOR_OPTIONS: editor.IStandaloneEditorConstructionOptions = {
    ...EditorConstants.COMMON_EDITOR_OPTIONS,
    language: "sql",
    model: editor.createModel("", "sql", Uri.parse(EditorConstants.SQL_FILE_PATH)),
    guides: { indentation: false },
    scrollBeyondLastLine: false,
    readOnly: true,
  }

  public static readonly TRIGGER_SUGGEST_CHARACTERS = ["'", '"']
}
