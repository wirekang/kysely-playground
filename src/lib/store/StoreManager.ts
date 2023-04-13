import { StoreUtils } from "src/lib/store/StoreUtils"
import { StoreProviderId } from "src/lib/store/types/StoreProviderId"
import type { StoreProvider } from "src/lib/store/types/StoreProvider"
import { StoreItem } from "src/lib/store/types/StoreItem"

export class StoreManager {
  private readonly providers = StoreUtils.associateProviders()

  public save(providerId: StoreProviderId, item: StoreItem): Promise<string> {
    const provider = this.getProvider(providerId)
    if (provider.save === undefined) {
      throw Error(`${(StoreProviderId as any)[providerId]} is read-only provider.`)
    }

    return provider.save(item)
  }

  public async load(providerId: StoreProviderId, value: string): Promise<StoreItem> {
    const provider = this.getProvider(providerId)
    return provider.load(value)
  }

  private getProvider(providerId: StoreProviderId): StoreProvider {
    const provider = this.providers[providerId]
    if (!provider) {
      throw Error(`no StoreProvider for ${providerId}`)
    }
    return provider
  }
}
