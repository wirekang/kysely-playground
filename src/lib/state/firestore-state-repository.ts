import { Database, Reference } from "firebase-firestore-lite";
import { FIRESTORE_COLLECTION_FRAGMENTS, FIRESTORE_PROJECT_ID } from "../constants";

export class FirestoreStateRepository {
  private readonly states: Reference;
  constructor() {
    const db = new Database({ projectId: FIRESTORE_PROJECT_ID });
    this.states = db.ref(FIRESTORE_COLLECTION_FRAGMENTS);
  }

  async add(data: string): Promise<string> {
    const res = await this.states.add({ fragment: data }, { exists: false });
    if (!res) {
      throw new FirestoreError("failed to add document");
    }
    return res.id;
  }

  async get(id: string): Promise<string> {
    const document = await this.states.child(id).get();
    const fragment = document.fragment as string;
    if (!fragment) {
      throw new FirestoreError(`document has no fragment. id=${id}`);
    }
    return fragment;
  }
}

class FirestoreError extends Error {}
