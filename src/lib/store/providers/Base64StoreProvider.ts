import type { StoreProvider } from "src/lib/store/types/StoreProvider"
import type { ShareableState } from "src/lib/state/types/ShareableState"
import { StoreProviderId } from "src/lib/store/types/StoreProviderId"

export class Base64StoreProvider implements StoreProvider {
  public readonly id = StoreProviderId.Base64

  public async load(value: string): Promise<Partial<ShareableState>> {
    return JSON.parse(atob(value))
  }
}
