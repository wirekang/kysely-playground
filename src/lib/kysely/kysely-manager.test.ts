import { beforeAll, expect, test } from "vitest";
import { KyselyManager } from "./kysely-manager";
import { KyselyModule } from "./KyselyModule";

let kyselyManager: KyselyManager;

beforeAll(async () => {
  kyselyManager = await KyselyManager.init();
});

test("lastCommitId", () => {
  expect(kyselyManager.lastCommitId.length).gte(20);
});

test("getLatestTagModule", () => {
  expect(kyselyManager.getLatestTagModule()).instanceOf(KyselyModule);
});
