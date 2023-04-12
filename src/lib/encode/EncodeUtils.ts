export class EncodeUtils {
  public static async bytesToBase64(bytes: Uint8Array): Promise<string> {
    const output: string[] = []
    for (let i = 0, { length } = bytes; i < length; i++) output.push(String.fromCharCode(bytes[i]))
    return btoa(output.join("")).replaceAll("+", "-").replaceAll("/", "_")
  }

  public static async base64ToBytes(b64: string): Promise<Uint8Array> {
    const dataUrl = "data:application/octet-binary;base64," + b64.replaceAll("-", "+").replaceAll("_", "/")
    const response = await fetch(dataUrl)
    const arrayBuffer = await response.arrayBuffer()
    return new Uint8Array(arrayBuffer)
  }
}
