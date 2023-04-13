import type { StoreProvider } from "src/lib/store/types/StoreProvider"
import { StoreProviderId } from "src/lib/store/types/StoreProviderId"
import { StoreItem } from "src/lib/store/types/StoreItem"

export class LegacyFirebaseStoreProvider implements StoreProvider {
  private static readonly RTDB_STATE_URL = "https://kysely-playground-default-rtdb.firebaseio.com/state"

  public readonly id = StoreProviderId.LegacyFirebase

  public async load(value: string): Promise<StoreItem> {
    const response = await fetch(`${LegacyFirebaseStoreProvider.RTDB_STATE_URL}/${value}.json`)
    const obj = await response.json()

    return {
      q: obj.ts,
      d: obj.dialect,
      v: obj.kysely_version,
    }
  }
}
