import { beforeAll, expect, test } from "vitest";
import { FirestoreStateRepository } from "./firestore-state-repository";

let repo: FirestoreStateRepository;
beforeAll(() => {
  repo = new FirestoreStateRepository();
});

test("add/get", async () => {
  const data = "test data";
  const id = await repo.add(data);
  const response = await repo.get(id);
  expect(response).toBe(data);
});
