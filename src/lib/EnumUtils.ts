export class EnumUtils {
  public static values(e: any): string[] {
    return Object.keys(e).map((key) => e[key])
  }
}
