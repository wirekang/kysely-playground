import type { StoreProvider } from "src/lib/store/types/StoreProvider"
import { StoreProviderId } from "src/lib/store/types/StoreProviderId"
import { StoreItem } from "src/lib/store/types/StoreItem"
import { LogUtils } from "src/lib/log/LogUtils"

export class LegacyBase64StoreProvider implements StoreProvider {
  public readonly id = StoreProviderId.LegacyBase64

  public async load(value: string): Promise<StoreItem> {
    const data = JSON.parse(atob(value))
    return {
      q: data.ts,
      d: data.dialect,
      v: data.kyselyVersion,
    }
  }
}
