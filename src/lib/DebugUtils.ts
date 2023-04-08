export class DebugUtils {
  public static async sleep(ms: number) {
    return new Promise((r) => {
      setTimeout(r, ms)
    })
  }
}
