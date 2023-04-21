import { atom } from "recoil"
import { type Header2Modal } from "src/lib/ui/types/Header2Modal"

export const header2ModalState = atom<Header2Modal>({
  key: "header2Modal",
  default: null,
})
