import { atom } from "recoil"
import { EditorLayoutOptions } from "src/lib/editor/types/EditorLayoutOptions"

export const editorLayoutOptionsState = atom<EditorLayoutOptions>({
  key: "editorLayoutOptions",
  default: {
    schema: false,
    lineNumber: false,
  },
})
