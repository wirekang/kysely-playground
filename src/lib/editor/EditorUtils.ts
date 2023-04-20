import { loader } from "@monaco-editor/react"
import type { editor } from "monaco-editor"
import * as monaco from "monaco-editor"
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker"
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker"
import { EditorConstants } from "src/lib/editor/EditorConstants"

export class EditorUtils {
  public static async loadMonaco(): Promise<typeof monaco> {
    self.MonacoEnvironment = {
      getWorker(_, label) {
        if (label === "typescript" || label === "javascript") {
          return new tsWorker()
        }
        return new editorWorker()
      },
    }
    loader.config({ monaco })
    return loader.init()
  }

  public static shouldTriggerSuggest(changes: editor.IModelContentChange[]): boolean {
    const change = changes[0]?.text
    if (!change) {
      return false
    }

    return EditorConstants.TRIGGER_SUGGEST_CHARACTERS.findIndex((v) => change.startsWith(v)) !== -1
  }
}
