import { Loading } from "src/lib/loading/types/Loading"

export class LoadingUtils {
  public static getErrors(loading: Loading): { name: string; error: string }[] {
    return Object.entries(loading)
      .filter(([, v]) => typeof v === "string")
      .map(([name, v]) => ({ name, error: v as string }))
  }
}
