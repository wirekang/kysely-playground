import { beforeAll, expect, test } from "vitest";
import { TypescriptManager } from "./typescript-manager";

let manager: TypescriptManager;

beforeAll(async () => {
  manager = await TypescriptManager.init();
});

test("modules", () => {
  const modules = manager.modules;
  console.log(modules);
  expect(modules.length).gt(10);
  modules.forEach((it) => {
    expect(typeof it).toBe("object");
  });
});
