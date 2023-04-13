import { atom } from "recoil"
import { MonacoEditorEvents } from "src/lib/editor/types/MonacoEditorEvents"

export const typescriptSchemaEditorEventsState = atom<MonacoEditorEvents | null>({
  key: "typescriptSchemaEditorEvents",
  default: null,
})
