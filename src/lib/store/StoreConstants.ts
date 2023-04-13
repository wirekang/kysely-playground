import { LegacyBase64StoreProvider } from "src/lib/store/providers/LegacyBase64StoreProvider"
import { LegacyFirebaseStoreProvider } from "src/lib/store/providers/LegacyFirebaseStoreProvider"
import { MsgPackBase64StoreProvider } from "src/lib/store/providers/MsgPackBase64StoreProvider"
import { MsgPackFirestoreStoreProvider } from "src/lib/store/providers/MsgPackFirestoreStoreProvider"

export class StoreConstants {
  public static readonly PROVIDERS = [
    MsgPackBase64StoreProvider,
    MsgPackFirestoreStoreProvider,
    LegacyBase64StoreProvider,
    LegacyFirebaseStoreProvider,
  ] as const
}
