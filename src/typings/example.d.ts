import type { SqlDialect } from "./state";

export type ExampleItem = {
  name: string;
  ts: string;
  dialect?: SqlDialect;
  enableSchema?: boolean;
};
