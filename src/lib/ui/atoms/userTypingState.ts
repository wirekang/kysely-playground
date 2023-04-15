import { atom } from "recoil"

export const userTypingState = atom({
  key: "userTyping",
  default: false,
})
