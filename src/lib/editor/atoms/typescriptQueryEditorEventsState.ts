import { atom } from "recoil"
import { MonacoEditorEvents } from "src/lib/editor/types/MonacoEditorEvents"

export const typescriptQueryEditorEventsState = atom<MonacoEditorEvents | null>({
  key: "typescriptQueryEditorEvents",
  default: null,
})
