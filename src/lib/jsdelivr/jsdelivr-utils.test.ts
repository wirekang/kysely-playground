import { expect, test } from "vitest";
import { JsDelivrUtils } from "./jsdelivr-utils";
import { HttpUtils } from "../utility/http-utils";

test("listNpmVersions", async () => {
  const versions = await JsDelivrUtils.listNpmVersions("jquery");
  expect(versions.length).gt(10);
  versions.forEach((it) => {
    expect(typeof it).toBe("string");
  });
  console.log(versions);
});
test("npm", async () => {
  const url = JsDelivrUtils.npm("jquery", "3.7.1", "dist/jquery.min.js");
  await HttpUtils.request("GET", url, {}, [200], "buffer");
});
