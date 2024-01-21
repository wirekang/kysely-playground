import { expect, test } from "vitest";
import { TypescriptUtils } from "./typescript-utils";

test("format", async () => {
  const res = await TypescriptUtils.format("const a='3'", { semi: true, singleQuotes: false });
  expect(res).toBe('const a = "3";\n');
});

test("transpile", async () => {
  const res = await TypescriptUtils.transpile("const a:number = 3 as any");
  expect(res).toBe("const a = 3;\n");
});
