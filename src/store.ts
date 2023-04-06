import type { StoreItem, StoreProvider } from "./typings/store";
import { WrongUrlException } from "./exceptions/wrong-url-exception";
import { StoreProviderString } from "./store-providers/store-provider-string";
import { FirebaseStore } from "./store-providers/firebase-store";
import { B64Store } from "./store-providers/b64-store";

export class Store {
  #providers: Record<string, StoreProvider> = {
    [StoreProviderString.Firebase]: new FirebaseStore(),
    [StoreProviderString.B64]: new B64Store(),
  };
  public async load(): Promise<StoreItem | undefined> {
    try {
      if (window.location.search.length > 1) {
        return await this.#load();
      }
      if (window.location.hash?.length > 1) {
        return this.#loadLegacy();
      }
    } catch (e) {
      console.error(e);
      throw new WrongUrlException(e);
    }
    return undefined;
  }

  async #load(): Promise<StoreItem> {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("i");
    const providerString = params.get("p") ?? StoreProviderString.Firebase;
    if (id === null) {
      throw new Error("no i");
    }
    const provider = this.#providers[providerString];
    if (!provider) {
      throw new Error(`Wrong provider ${providerString}`);
    }
    return provider.load(id);
  }

  #loadLegacy(): StoreItem {
    console.log("Load legacy hash");
    const d = JSON.parse(atob(window.location.hash.substring(1)));
    if (!d.dialect || !d.ts) {
      throw new Error("No dialect or ts");
    }
    return {
      dialect: d.dialect,
      ts: d.ts,
    };
  }

  public async save(v: StoreItem, providerString: StoreProviderString) {
    const provider = this.#providers[providerString];
    const id = await provider.save(v);
    return `${makeFullUrl()}?p=${providerString}&i=${id}`;
  }
}

function makeFullUrl() {
  return `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
}
