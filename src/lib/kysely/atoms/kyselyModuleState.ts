import { atom } from "recoil"
import type * as kysely from "kysely_for_type"

export const kyselyModuleState = atom<typeof kysely | null>({
  key: "kyselyModule",
  default: null,
})
