import { atom } from "recoil"
import { Loading } from "src/lib/loading/types/Loading"

export const loadingState = atom<Loading>({
  key: "loading",
  default: {
    monaco: true,
    kysely: true,
    compile: true,
    prettier: true,
    share: true,
  },
})
