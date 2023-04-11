export class EnumUtils {
  public static values<T extends Record<string, string>>(e: T): T[keyof T][] {
    // @ts-ignore
    return Object.keys(e).map((key) => e[key])
  }
}
