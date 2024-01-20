import { Database, Reference } from "firebase-firestore-lite";
import { FIRESTORE_COLLECTION_FRAGMENTS, FIRESTORE_PROJECT_ID } from "./constants";

export class FragmentRepository {
  private readonly fragments: Reference;
  constructor() {
    const db = new Database({ projectId: FIRESTORE_PROJECT_ID });
    this.fragments = db.ref(FIRESTORE_COLLECTION_FRAGMENTS);
  }

  async add(data: string): Promise<string> {
    const res = await this.fragments.add({ data }, { exists: false });
    if (!res) {
      throw new FirestoreError("failed to add document");
    }
    return res.id;
  }

  async get(id: string): Promise<string> {
    const document = await this.fragments.child(id).get();
    const data = document.data as string;
    if (!data) {
      throw new FirestoreError(`document has no data. id=${id}`);
    }
    return data;
  }
}

class FirestoreError extends Error {}
