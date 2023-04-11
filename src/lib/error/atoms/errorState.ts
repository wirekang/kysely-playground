import { atom } from "recoil"
import { ErrorType } from "src/lib/error/types/ErrorType"

export const errorState = atom<ErrorType | null>({
  key: "error",
  default: null,
})
