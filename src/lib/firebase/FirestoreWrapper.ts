import { FirebaseConstants } from "src/lib/firebase/FirebaseConstants"
import { initializeApp } from "firebase/app"
import {
  addDoc,
  Bytes,
  collection,
  CollectionReference,
  doc,
  Firestore,
  getDoc,
  getFirestore,
} from "firebase/firestore"
import { LogUtils } from "src/lib/log/LogUtils"

export class FirestoreWrapper {
  private readonly db: Firestore
  private readonly states: CollectionReference

  constructor() {
    const firebaseConfig = {
      apiKey: FirebaseConstants.API_KEY,
      authDomain: FirebaseConstants.PROJECT_ID + ".firebaseapp.com",
      databaseURL: "https://" + FirebaseConstants.DATABASE_NAME + ".firebaseio.com",
      projectId: FirebaseConstants.PROJECT_ID,
      storageBucket: FirebaseConstants.PROJECT_ID + "appspot.com",
      messagingSenderId: FirebaseConstants.SENDER_ID,
      appId: FirebaseConstants.APP_ID,
    }
    const app = initializeApp(firebaseConfig)
    this.db = getFirestore(app)
    this.states = collection(this.db, FirebaseConstants.COLLECTION_STATES)
  }

  async addState(data: Uint8Array): Promise<string> {
    const res = await addDoc(this.states, {
      data: Bytes.fromUint8Array(data),
    })
    return res.id
  }

  async getState(id: string): Promise<Uint8Array> {
    const res = await getDoc(doc(this.db, FirebaseConstants.COLLECTION_STATES, id))
    const document = res.data()
    if (!document) {
      throw Error(`no state for id ${id}`)
    }
    const bytes = document.data as Bytes
    if (!bytes) {
      LogUtils.error("firestore returns:", document)
      throw Error("no data in document.")
    }
    return bytes.toUint8Array()
  }
}
