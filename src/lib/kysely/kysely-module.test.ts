import { beforeAll, expect, test } from "vitest";
import { KyselyModule } from "./kysely-module";
import { KyselyManager } from "./kysely-manager";

let modules: ReadonlyArray<KyselyModule>;

beforeAll(async () => {
  modules = (await KyselyManager.init()).modules;
});

test("loadFiles", async () => {
  await Promise.all(
    modules.map(async (module) => {
      const files = await module.loadFiles();
      files.forEach((file) => {
        expect(file.path.length).gte(1);
        expect(file.data.byteLength).gte(1);
      });
    }),
  );
});
