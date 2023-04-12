import { editor, Uri } from "monaco-editor"
import * as monaco from "monaco-editor"

export class EditorConstants {
  public static readonly TYPESCRIPT_FILE_PATH = "file:///typescript.ts"
  public static readonly SQL_FILE_PATH = "file:///sql.sql"
  public static readonly KYSELY_TYPE_PATH = "file:///node_modules/kysely/index.d.ts"
  public static readonly GLOBAL_TYPE_PATH = "file:///global.d.ts"

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
  }

  public static readonly TYPESCRIPT_EDITOR_OPTIONS: editor.IStandaloneEditorConstructionOptions = {
    ...EditorConstants.COMMON_EDITOR_OPTIONS,
    language: "typescript",
    scrollBeyondLastLine: false,
    model: editor.createModel("", "typescript", Uri.parse(EditorConstants.TYPESCRIPT_FILE_PATH)),
  }

  public static readonly SQL_EDITOR_OPTIONS: editor.IStandaloneEditorConstructionOptions = {
    ...EditorConstants.COMMON_EDITOR_OPTIONS,
    language: "sql",
    model: editor.createModel("", "sql", Uri.parse(EditorConstants.SQL_FILE_PATH)),
    guides: { indentation: false },
    scrollBeyondLastLine: false,
    readOnly: true,
  }

  public static readonly EVENT_SET_TS = "set-ts"
}
