import { atom } from "recoil"

export const showHeaderBodyState = atom<boolean>({
  key: "header",
  default: false,
})
