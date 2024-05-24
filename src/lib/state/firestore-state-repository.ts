import { Database, Reference } from "firebase-firestore-lite";
import { FIRESTORE_COLLECTION_FRAGMENTS, FIRESTORE_PROJECT_ID } from "../constants";
import { logger } from "../utility/logger";
import Transform from "firebase-firestore-lite/dist/Transform";

export class FirestoreStateRepository {
  private readonly states: Reference;
  constructor() {
    const db = new Database({ projectId: FIRESTORE_PROJECT_ID });
    this.states = db.ref(FIRESTORE_COLLECTION_FRAGMENTS);
  }

  async add(data: string): Promise<string> {
    let tryCount = 0;
    while (tryCount < 16) {
      try {
        tryCount += 1;
        const document = this.states.child(randomId(4 + tryCount));
        await document.set({ data, createdAt: new Transform("serverTimestamp") }, { exists: false });
        return document.id;
      } catch (e: any) {
        if (e.status === "ALREADY_EXISTS") {
          logger.warn("firestore document confict", "try:", tryCount);
          continue;
        }
        throw e;
      }
    }
    throw new FirestoreError(`UNREACHABLE. ${tryCount}`);
  }

  async get(id: string): Promise<string> {
    const document = await this.states.child(id).get();
    const data = document.data as string;
    if (!data) {
      throw new FirestoreError(`document has no data. id=${id}`);
    }
    return data;
  }
}

class FirestoreError extends Error {}

// firestore document id

const validChars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" as const;

function randomId(size: number) {
  const b = crypto.getRandomValues(new Uint8Array(size));
  return Array.from(b)
    .map((b) => validChars[b % validChars.length])
    .join("");
}
