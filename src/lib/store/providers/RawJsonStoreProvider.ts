import { StoreProvider } from "src/lib/store/types/StoreProvider"
import { StoreProviderId } from "src/lib/store/types/StoreProviderId"
import { StoreItem } from "src/lib/store/types/StoreItem"

export class RawJsonStoreProvider implements StoreProvider {
  public readonly id = StoreProviderId.RawJSON

  public load(value: string): Promise<StoreItem> {
    return JSON.parse(value)
  }
}
