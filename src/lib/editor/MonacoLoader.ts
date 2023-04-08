import { loader } from "@monaco-editor/react"
import * as monaco from "monaco-editor"
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker"
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker"

export class MonacoLoader {
  public static async load(): Promise<typeof monaco> {
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
}
