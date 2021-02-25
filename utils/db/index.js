import * as firebaseAdmin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json';

if (!firebaseAdmin.apps.length) {
  try {
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(serviceAccount),
      databaseURL: "task-manager-next.firebaseio.com"
    });
  } catch (error) {
    console.log('Firebase admin initialization error', error.stack);
  }
}
export default firebaseAdmin.firestore();