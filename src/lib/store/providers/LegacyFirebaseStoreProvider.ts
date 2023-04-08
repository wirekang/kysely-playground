import type { State } from "src/lib/state/types/State"
import type { StoreProvider } from "src/lib/store/types/StoreProvider"
import { StoreProviderId } from "src/lib/store/types/StoreProviderId"

export class LegacyFirebaseStoreProvider implements StoreProvider {
  private static readonly RTDB_STATE_URL = "https://kysely-playground-default-rtdb.firebaseio.com/state"

  public readonly id = StoreProviderId.LegacyFirebase

  public async load(value: string): Promise<Partial<State>> {
    const response = await fetch(`${LegacyFirebaseStoreProvider.RTDB_STATE_URL}/${value}.json`)
    const obj = await response.json()

    return {
      ts: obj.ts,
      dialect: obj.dialect,
      kyselyVersion: obj.kysely_version,
    }
  }
}
