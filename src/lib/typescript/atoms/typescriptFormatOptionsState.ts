import { atom } from "recoil"
import { TypescriptFormatOptions } from "src/lib/typescript/types/TypescriptFormatOptions"

export const typescriptFormatOptionsState = atom<TypescriptFormatOptions>({
  key: "typescriptFormatOptions",
  default: {
    semi: false,
    printWidth: 100,
    singleQuote: false,
  },
})
