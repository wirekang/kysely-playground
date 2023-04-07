import type { StoreItem, StoreProvider } from "../typings/store";
import { FIREBASE_URL } from "./store-provider-string";
import { KyselyVersionManager } from "../kysely-version-manager";

export class FirebaseStore implements StoreProvider {
  async load(id: string): Promise<StoreItem> {
    const r = await fetch(`${FIREBASE_URL}/state/${id}.json`);
    const res = await r.json();
    if (res === null) {
      throw new Error("wrong id");
    }
    return {
      dialect: res.dialect ?? "postgres",
      ts: res.ts ?? "",
      kyselyVersion: res.kysely_version ?? KyselyVersionManager.LATEST,
      enableSchema: res.enable_schema ?? true,
    };
  }

  async save(v: StoreItem): Promise<string> {
    const r = await fetch(`${FIREBASE_URL}/state.json`, {
      method: "POST",
      body: JSON.stringify({
        ts: v.ts,
        dialect: v.dialect,
        kysely_version: v.kyselyVersion,
        enable_schema: v.enableSchema,
        created_at: {
          ".sv": "timestamp",
        },
      }),
    });
    const res = await r.json();
    if (r.status !== 200) {
      throw new Error(res.error || JSON.stringify(res, null, 2));
    }
    return res.name;
  }
}
