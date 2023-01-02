import type { StoreItem, StoreProvider } from "../typings/store";

export class B64Store implements StoreProvider {
  async load(id: string): Promise<StoreItem> {
    const d = JSON.parse(atob(id));
    if (
      typeof d.ts !== "string" ||
      typeof d.dialect !== "string" ||
      typeof d.kyselyVersion !== "string"
    ) {
      console.error(d);
      throw new Error("No ts | dialect | kyselyVersion");
    }
    return {
      dialect: d.dialect,
      ts: d.ts,
      kyselyVersion: d.kyselyVersion,
    };
  }

  async save(v: StoreItem): Promise<string> {
    return encodeURIComponent(btoa(JSON.stringify(v)));
  }
}
