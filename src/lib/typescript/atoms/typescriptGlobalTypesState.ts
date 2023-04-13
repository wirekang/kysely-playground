import { atom } from "recoil"
import { EditorConstants } from "src/lib/editor/EditorConstants"
import { TypescriptConstants } from "src/lib/typescript/TypescriptConstants"

export const typescriptGlobalTypesState = atom<Record<string, string>>({
  key: "typescriptGlobalTypes",
  default: {
    [EditorConstants.PLAYGROUND_GLOBAL_TYPE_PATH]: TypescriptConstants.PLAYGROUND_GLOBAL_TYPE_CONTENT,
  },
})
