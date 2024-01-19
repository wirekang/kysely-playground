import { expect, test } from "vitest";
import { MinifiedKyselyUtils } from "./minified-kysely-utils";

test("getFileUrl", () => {
  expect(typeof MinifiedKyselyUtils.getFileUrl("AAA", "BB/CC")).toBe("string");
});
