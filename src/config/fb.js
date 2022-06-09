
import { initializeApp } from "firebase/app";
import  Constants  from "expo-constants";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

export const firebaseConfig = {
    apiKey: Constants.manifest.extra.apiKey,
    authDomain: Constants.manifest.extra.AuthDomain,
    projectId: Constants.manifest.extra.projectId,
    storageBucket: Constants.manifest.extra.storageBucket,
    messagingSenderId: Constants.manifest.extra.messagingSenderId,
    appId: Constants.manifest.extra.appId
};

initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export const database = getFirestore(app);

