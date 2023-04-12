import { loader } from "@monaco-editor/react"
import * as monaco from "monaco-editor"
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker"
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker"
import { EditorConstants } from "src/lib/editor/EditorConstants"
import { LogUtils } from "src/lib/log/LogUtils"

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

  public static dispatchSetTs(ts: string) {
    setTimeout(() => {
      LogUtils.info("Dispatch ts", ts)
      window.dispatchEvent(new CustomEvent(EditorConstants.EVENT_SET_TS, { detail: ts }))
    })
  }
}
