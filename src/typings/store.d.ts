import { SqlDialect } from "./state";

export type StoreItem = {
  dialect?: SqlDialect;
  ts?: string;
  kyselyVersion?: string;
};

export interface StoreProvider {
  load(id: string): Promise<StoreItem>;
  save(v: StoreItem): Promise<string>;
}
