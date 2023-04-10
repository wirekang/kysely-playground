import type { ShareableState } from "src/lib/state/types/ShareableState"
import type { StoreItem } from "src/lib/store/types/StoreItem"
import { StoreProviderId } from "src/lib/store/types/StoreProviderId"

export type StoreProvider = {
  readonly id: StoreProviderId
  readonly load: (value: string) => Promise<StoreItem>
  readonly save?: (state: ShareableState) => Promise<string>
}
