import { ShareItem } from "src/lib/share/types/ShareItem"
import { StoreProviderId } from "src/lib/store/types/StoreProviderId"
import { EnumUtils } from "src/lib/EnumUtils"
import { StoreManager } from "src/lib/store/StoreManager"
import { ShareConstants } from "src/lib/share/ShareConstants"
import { ShareKind } from "src/lib/share/types/ShareKind"
import { SqlDialect } from "src/lib/sql/types/SqlDialect"

export class ShareUtils {
  public static parseUrl(): ShareItem | null {
    if (window.location.hash.length > 3) {
      // TODO
      // implement legacy
      return null
    }

    if (window.location.search.length < 2) {
      return null
    }

    const params = new URLSearchParams(window.location.search)

    const value = params.get("i")
    if (value === null) {
      throw new Error("No i in params")
    }

    const rawProviderId = params.get("p")
    if (rawProviderId === null) {
      throw new Error("No p in params")
    }

    const storeProviderId = rawProviderId as StoreProviderId
    if (!EnumUtils.validate(StoreProviderId, storeProviderId)) {
      throw new Error(`Invalid StoreProviderId: ${storeProviderId}`)
    }

    return {
      storeProviderId,
      value,
    }
  }

  public static async generateShareItem(
    storeManager: StoreManager,
    storeProviderId: StoreProviderId,
    state: {
      sqlDialect: SqlDialect
      kyselyVersion: string
      typescriptSchema: string
      typescriptQuery: string
      showTypescriptSchema: boolean
    }
  ): Promise<ShareItem> {
    const value = await storeManager.save(storeProviderId, {
      d: state.sqlDialect,
      v: state.kyselyVersion,
      s: state.typescriptSchema,
      q: state.typescriptQuery,
      c: state.showTypescriptSchema,
    })
    return { value, storeProviderId }
  }

  public static generateFormattedUrl(kind: ShareKind, i: ShareItem): string {
    const url = this.makeUrl(i)
    switch (kind) {
      case ShareKind.Markdown:
        return `[Playground Link](${url})`
      default:
        return url
    }
  }

  public static makeUrl(i: ShareItem): string {
    return `${this.makeFullUrl()}${this.makeSearch(i)}`
  }

  public static makeSearch(i: ShareItem): string {
    return `?p=${i.storeProviderId}&i=${i.value}`
  }

  private static makeFullUrl() {
    return `${window.location.protocol}//${window.location.host}${window.location.pathname}`
  }
}
