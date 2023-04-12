import { ShareItem } from "src/lib/share/types/ShareItem"
import { StoreProviderId } from "src/lib/store/types/StoreProviderId"
import { EnumUtils } from "src/lib/EnumUtils"

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

  public static generateUrl(i: ShareItem): string {
    return `${this.makeFullUrl()}?p=${i.storeProviderId}&i=${i.value}`
  }

  private static makeFullUrl() {
    return `${window.location.protocol}//${window.location.host}${window.location.pathname}`
  }
}
