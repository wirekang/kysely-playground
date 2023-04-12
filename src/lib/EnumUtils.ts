export class EnumUtils {
  public static values<T extends Record<string, string>>(e: T): T[keyof T][] {
    // @ts-ignore
    return Object.keys(e).map((key) => e[key])
  }

  public static validate<T extends Record<string, string>>(e: T, v: any): boolean {
    const values = EnumUtils.values(e)
    return values.includes(v)
  }
}
