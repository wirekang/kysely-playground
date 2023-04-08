import type { StoreProvider } from "src/lib/store/types/StoreProvider"
import type { SharedState } from "src/lib/state/types/SharedState"
import { StoreProviderId } from "src/lib/store/types/StoreProviderId"

export class Base64StoreProvider implements StoreProvider {
  public readonly id = StoreProviderId.Base64

  public async load(value: string): Promise<Partial<SharedState>> {
    return JSON.parse(atob(value))
  }
}
