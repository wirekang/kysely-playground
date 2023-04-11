import { atom } from "recoil"
import { StateConstants } from "src/lib/state/StateConstants"
import { ShareableState } from "src/lib/state/types/ShareableState"

export const shareableStateState = atom<ShareableState>({
  key: "shareableState",
  default: { ...StateConstants.DEFAULT_SHAREABLE_STATE },
})
