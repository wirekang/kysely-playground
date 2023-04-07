import type { StoreItem, StoreProvider } from "../typings/store";

export class B64Store implements StoreProvider {
  async load(id: string): Promise<StoreItem> {
    return JSON.parse(atob(id));
  }

  async save(v: StoreItem): Promise<string> {
    return encodeURIComponent(btoa(JSON.stringify(v)));
  }
}
