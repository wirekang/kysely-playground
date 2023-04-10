import { StoreUtils } from "src/lib/store/StoreUtils"
import { StoreProviderId } from "src/lib/store/types/StoreProviderId"
import type { ShareableState } from "src/lib/state/types/ShareableState"
import type { StoreProvider } from "src/lib/store/types/StoreProvider"

export class StoreManager {
  private readonly providers = StoreUtils.associateProviders()

  public save(providerId: StoreProviderId, state: ShareableState): Promise<string> {
    const provider = this.getProvider(providerId)
    if (provider.save === undefined) {
      throw Error(`${(StoreProviderId as any)[providerId]} is read-only provider.`)
    }

    return provider.save(state)
  }

  public async load(providerId: StoreProviderId, value: string): Promise<ShareableState> {
    const provider = this.getProvider(providerId)
    const storeItem = await provider.load(value)
    return StoreUtils.makeShareableState(storeItem)
  }

  private getProvider(providerId: StoreProviderId): StoreProvider {
    const provider = this.providers[providerId]
    if (!provider) {
      throw Error(`no StoreProvider for ${providerId}`)
    }
    return provider
  }
}
