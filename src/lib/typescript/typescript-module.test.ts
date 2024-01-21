import { beforeAll, test } from "vitest";
import { TypescriptModule } from "./typescript-module";
import { TypescriptManager } from "./typescript-manager";

let modules: Array<TypescriptModule>;

beforeAll(async () => {
  modules = (await TypescriptManager.init()).modules;
});

test("transpile", async () => {
  // no way to test dynamic import in node
  //   await modules[0].transpile("const a= 3");
});
