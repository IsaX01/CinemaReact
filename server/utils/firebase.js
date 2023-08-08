import * as admin from 'firebase-admin';
import serviceAccount, { DATABASE_URL } from '../config/firebase';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: DATABASE_URL,
});

const db = admin.database();
const ref = db.ref();

export const firebaseDb = ref;
