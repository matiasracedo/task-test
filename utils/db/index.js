import * as firebaseAdmin from 'firebase-admin';


const project_id = process.env.PROJECT_ID;
const client_email = process.env.CLIENT_EMAIL
const privateKey = process.env.PRIVATE_KEY.replace(/\\n/g, '\n')


if (!firebaseAdmin.apps.length) {
  try {
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert({
        projectId: `${project_id}`,
        clientEmail: `${client_email}`,
        privateKey: `${privateKey}`
      }),
      databaseURL: `https://${project_id}.firebaseio.com`
    });
  } catch (error) {
    console.log('Firebase admin initialization error', error.stack);
  }
}
export default firebaseAdmin.firestore();
