import { ShareKind } from "src/lib/share/types/ShareKind"
import { StoreProviderId } from "src/lib/store/types/StoreProviderId"

export class ShareConstants {
  public static readonly SHARE_KIND_TEXT: Record<ShareKind, string> = {
    [ShareKind.Markdown]: "Markdown",
    [ShareKind.Short]: "Short(for discord)",
    [ShareKind.Raw]: "Raw",
  }

  public static readonly SHARE_KIND_PROVIDER_ID: Record<ShareKind, StoreProviderId> = {
    [ShareKind.Markdown]: StoreProviderId.MsgPackBase64,
    [ShareKind.Short]: StoreProviderId.MsgPackFirestore,
    [ShareKind.Raw]: StoreProviderId.MsgPackBase64,
  }
}
