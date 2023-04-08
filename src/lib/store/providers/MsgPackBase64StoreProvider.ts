import type { StoreProvider } from "src/lib/store/types/StoreProvider"
import type { SharedState } from "src/lib/state/types/SharedState"
import type { StoreItem } from "src/lib/store/types/StoreItem"
import { decode, encode } from "@msgpack/msgpack"
import { EncodeUtils } from "src/lib/encode/EncodeUtils"
import { StoreProviderId } from "src/lib/store/types/StoreProviderId"

export class MsgPackBase64StoreProvider implements StoreProvider {
  public readonly id = StoreProviderId.MsgPackBase64

  public async load(value: string): Promise<StoreItem> {
    return decode(await EncodeUtils.base64ToBytes(value)) as any
  }

  public async save(state: SharedState): Promise<string> {
    const encoded = encode(state, { ignoreUndefined: true })
    return EncodeUtils.bytesToBase64(encoded)
  }
}
