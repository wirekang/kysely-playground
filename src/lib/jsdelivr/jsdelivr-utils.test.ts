import { expect, test } from "vitest";
import { JsDelivrUtils } from "./jsdelivr-utils";
import { HttpUtils } from "../utility/http-utils";

test("listNpmVersions", async () => {
  const versions = await JsDelivrUtils.listNpmVersions("is-number");
  expect(versions.length).gt(0);
  versions.forEach((it) => {
    expect(typeof it).toBe("string");
  });
});

test("npm", async () => {
  const url = JsDelivrUtils.npm("is-number", "7.0.0", "index.js");
  await HttpUtils.getText(url);
});

test("esm", async () => {
  const url = JsDelivrUtils.esm("is-number", "7.0.0", "index.js");
  await HttpUtils.getText(url);
});