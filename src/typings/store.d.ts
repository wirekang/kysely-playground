import { SqlDialect } from "./state";

export type StoreItem = {
  dialect?: SqlDialect;
  ts?: string;
  kyselyVersion?: string;
  enableSchema?: boolean;
};

export interface StoreProvider {
  load(id: string): Promise<StoreItem>;
  save(v: StoreItem): Promise<string>;
}
