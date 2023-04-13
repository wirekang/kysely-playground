import { StoreProviderId } from "src/lib/store/types/StoreProviderId"
import { StoreProvider } from "src/lib/store/types/StoreProvider"
import { StoreConstants } from "src/lib/store/StoreConstants"
import { StoreItem } from "src/lib/store/types/StoreItem"
import { SqlDialect } from "src/lib/sql/types/SqlDialect"
import { KyselyConstants } from "src/lib/kysely/KyselyConstants"
import { EnumUtils } from "src/lib/EnumUtils"
import { PlaygroundError } from "src/lib/error/PlaygroundError"
import { LogUtils } from "src/lib/log/LogUtils"

export class StoreUtils {
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

  public static getValidatedStoreItem(storeItem: StoreItem) {
    const r = {
      typescriptSchema: storeItem.s ?? "",
      typescriptQuery: storeItem.q ?? "",
      sqlDialect: (storeItem.d ?? SqlDialect.Postgres) as SqlDialect,
      kyselyVersion: storeItem.v ?? KyselyConstants.LATEST_VERSION,
      showTypescriptSchema: !!storeItem.c,
    }
    if (!EnumUtils.validate(SqlDialect, r.sqlDialect)) {
      throw new PlaygroundError(`Invalid SqlDialect: ${r.sqlDialect}`)
    }

    if (!KyselyConstants.VERSIONS.includes(r.kyselyVersion)) {
      LogUtils.warn("Invalid kyselyVersion:", r.kyselyVersion)
      r.kyselyVersion = KyselyConstants.LATEST_VERSION
    }
    return r
  }
}
