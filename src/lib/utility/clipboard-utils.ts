export class ClipboardUtils {
  static writeText(v: string) {
    return navigator.clipboard.writeText(v);
  }
}
