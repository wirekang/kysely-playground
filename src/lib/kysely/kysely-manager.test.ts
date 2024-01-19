import { beforeAll, expect, test } from "vitest";
import { KyselyManager } from "./kysely-manager";

let kyselyManager: KyselyManager;

beforeAll(async () => {
  kyselyManager = await KyselyManager.init();
});

test("lastCommitId", () => {
  expect(kyselyManager.lastCommitId.length).gte(20);
});

test("modules", () => {
  expect(kyselyManager.modules.length).gte(10);
});
