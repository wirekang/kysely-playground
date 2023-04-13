import { atom } from "recoil"
import { MonacoEditorEvents } from "src/lib/editor/types/MonacoEditorEvents"

export const sqlEditorEventsState = atom<MonacoEditorEvents | null>({
  key: "sqlEditorEvents",
  default: null,
})
