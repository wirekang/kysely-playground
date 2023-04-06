import type { StoreItem, StoreProvider } from "../typings/store";
import { FIREBASE_URL } from "./store-provider-string";

export class FirebaseStore implements StoreProvider {
  async load(id: string): Promise<StoreItem> {
    const r = await fetch(`${FIREBASE_URL}/state/${id}.json`);
    const res = await r.json();
    if (res === null) {
      throw new Error("wrong id");
    }
    if (!res.dialect || typeof res.ts !== "string") {
      console.error(res);
      throw new Error("wrong result");
    }
    return {
      dialect: res.dialect,
      ts: res.ts,
      kyselyVersion: res.kysely_version,
    };
  }

  async save(v: StoreItem): Promise<string> {
    const r = await fetch(`${FIREBASE_URL}/state.json`, {
      method: "POST",
      body: JSON.stringify({
        ts: v.ts,
        dialect: v.dialect,
        kysely_version: v.kyselyVersion,
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
