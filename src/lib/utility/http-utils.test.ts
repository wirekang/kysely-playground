import { expect, test } from "vitest";
import { HttpUtils } from "./http-utils";

const URL = "https://example.com";
test("getBytes", async () => {
  const data = await HttpUtils.getBytes(URL);
  expect(data.byteLength).gt(0);
});
