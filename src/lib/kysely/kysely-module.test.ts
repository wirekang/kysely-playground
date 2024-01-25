import { beforeAll, expect, test } from "vitest";
import { KyselyModule } from "./kysely-module";
import { KyselyManager } from "./kysely-manager";

let module: KyselyModule;

beforeAll(async () => {
  module = (await KyselyManager.init()).getLatestTagModule();
});

test("todo", () => {
  expect(1).toBe(1);
});
