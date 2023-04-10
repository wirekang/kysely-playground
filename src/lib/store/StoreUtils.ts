import { StoreItem } from "src/lib/store/types/StoreItem"
import { ShareableState } from "src/lib/state/types/ShareableState"
import { StateConstants } from "src/lib/state/StateConstants"
import { LogUtils } from "src/lib/log/LogUtils"
import { StoreProviderId } from "src/lib/store/types/StoreProviderId"
import { StoreProvider } from "src/lib/store/types/StoreProvider"
import { StoreConstants } from "src/lib/store/StoreConstants"
import { SqlDialect } from "src/lib/sql/types/SqlDialect"
import { EnumUtils } from "../EnumUtils"

export class StoreUtils {
  public static makeShareableState(storeItem: StoreItem): ShareableState {
    const state = { ...StateConstants.DEFAULT_SHAREABLE_STATE }
    const sqlDialects = EnumUtils.values(SqlDialect)
    Object.keys(storeItem).forEach((key) => {
      if ((state as any)[key] === undefined) {
        LogUtils.warn("unexpected key:", key)
        return
      }

      // @ts-ignore
      state[key] = storeItem[key]
    })
    if (!sqlDialects.includes(state.dialect)) {
      LogUtils.warn("unexpected dialect:", state.dialect)
      state.dialect = StateConstants.DEFAULT_SHAREABLE_STATE.dialect
    }
    return state
  }

  public static associateProviders(): Record<StoreProviderId, StoreProvider> {
    const rst: Record<StoreProviderId, StoreProvider> = {} as any
    StoreConstants.PROVIDERS.forEach((type) => {
      const instance = new type()
      const id = instance.id
      if (rst[id] !== undefined) {
        throw Error(`provider id ${id} has multiple provider`)
      }
      rst[id] = instance
    })
    return rst
  }
}
