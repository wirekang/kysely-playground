import { atom } from "recoil"

export const sqlState = atom<string>({
  key: "sql",
  default: "",
})
