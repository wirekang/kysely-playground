import { atom } from "recoil"

export const showSharePopupState = atom<boolean>({
  key: "sharePopup",
  default: false,
})
