import * as firebaseAdmin from 'firebase-admin';
import *  as serviceAccount from "./cargon-seletivo-firebase-adminsdk-40n5c-dbaa090899.json";

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount as firebaseAdmin.ServiceAccount)
  });
}

export default firebaseAdmin