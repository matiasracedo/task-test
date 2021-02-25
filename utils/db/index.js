import * as firebaseAdmin from 'firebase-admin';


const project_id = process.env["PROJECT_ID"];
const GOOGLE_APPLICATION_CREDENTIALS = process.env.GOOGLE_APPLICATION_CREDENTIALS


if (!firebaseAdmin.apps.length) {
  try {
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(GOOGLE_APPLICATION_CREDENTIALS),
      databaseURL: `https://${project_id}.firebaseio.com`
    });
  } catch (error) {
    console.log('Firebase admin initialization error', error.stack);
  }
}
export default firebaseAdmin.firestore();
