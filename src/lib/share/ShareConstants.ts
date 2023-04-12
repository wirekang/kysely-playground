import { ShareKind } from "src/lib/share/types/ShareKind"

export class ShareConstants {
  public static readonly SHARE_KIND_TEXT: Record<ShareKind, string> = {
    [ShareKind.Markdown]: "Markdown",
    [ShareKind.Short]: "Short(for discord)",
    [ShareKind.Raw]: "Raw",
  }
}
