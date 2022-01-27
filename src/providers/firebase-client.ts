import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = require("./firebase-config.json")
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

