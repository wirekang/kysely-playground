import type { StoreItem, StoreProvider } from "../typings/store";

export class B64Store implements StoreProvider {
  async load(id: string): Promise<StoreItem> {
    const d = JSON.parse(atob(id));
    if (typeof d !== "object") {
      throw Error("json is not object");
    }
    return d;
  }

  async save(v: StoreItem): Promise<string> {
    return encodeURIComponent(btoa(JSON.stringify(v)));
  }
}
