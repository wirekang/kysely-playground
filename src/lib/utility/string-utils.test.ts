import { expect, test } from "vitest";
import { StringUtils } from "./string-utils";

test("trimPrefix", () => {
  expect(StringUtils.trimPrefix("asdf", "b")).toBe("asdf");
  expect(StringUtils.trimPrefix("asdf", "a")).toBe("sdf");
});
