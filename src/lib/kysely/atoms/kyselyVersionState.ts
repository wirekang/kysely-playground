import { atom } from "recoil"
import { KyselyConstants } from "src/lib/kysely/KyselyConstants"

export const kyselyVersionState = atom({
  key: "kyselyVersion",
  default: KyselyConstants.LATEST_VERSION,
})
