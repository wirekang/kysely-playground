import type { StoreProvider } from "src/lib/store/types/StoreProvider"
import type { StoreItem } from "../types/StoreItem"
import { FirestoreWrapper } from "src/lib/firebase/FirestoreWrapper"
import { decode, encode } from "@msgpack/msgpack"
import { StoreProviderId } from "src/lib/store/types/StoreProviderId"

export class MsgPackFirestoreStoreProvider implements StoreProvider {
  public readonly id = StoreProviderId.MsgPackFirestore

  private readonly firestoreWrapper = new FirestoreWrapper()

  public async load(value: string): Promise<StoreItem> {
    return decode(await this.firestoreWrapper.getState(value)) as any
  }

  public async save(state: StoreItem): Promise<string> {
    return this.firestoreWrapper.addState(encode(state))
  }
}
