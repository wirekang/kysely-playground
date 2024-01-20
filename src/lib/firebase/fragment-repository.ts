import { CollectionReference, addDoc, collection, doc, getDocFromServer } from "firebase/firestore";
import { FIRESTORE_COLLECTION_FRAGMENTS } from "../constants";
import { firestore } from "./firebase";

export class FragmentRepository {
  private readonly fragments: CollectionReference;
  constructor() {
    this.fragments = collection(firestore, FIRESTORE_COLLECTION_FRAGMENTS);
  }

  async add(data: string): Promise<string> {
    const res = await addDoc(this.fragments, { data });
    return res.id;
  }

  async get(id: string): Promise<string> {
    const document = await getDocFromServer(doc(firestore, FIRESTORE_COLLECTION_FRAGMENTS, id));
    const body = document.data();
    if (!body) {
      throw new FirestoreError(`document not found. id=${id}`);
    }
    const data = body.data as string;
    if (!data) {
      throw new FirestoreError(`document has no data. id=${id}`);
    }
    return data;
  }
}

class FirestoreError extends Error {}
