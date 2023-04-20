import { atom } from "recoil"
import { Loading } from "src/lib/loading/types/Loading"

export const loadingState = atom<Loading>({
  key: "loading",
  default: {
    monaco: false,
    kyselyModule: false,
    kyselyType: false,
    prettier: false,
    compile: false,
    initShare: false,
    share: false,
    shareCopy: false,
  },
})
