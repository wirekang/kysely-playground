import { beforeAll, expect, test } from "vitest";
import { FragmentRepository } from "./fragment-repository";

let repo: FragmentRepository;
beforeAll(() => {
  repo = new FragmentRepository();
});

test("add/get", async () => {
  const data = "test data";
  const id = await repo.add(data);
  const response = await repo.get(id);
  expect(response).toBe(data);
});
