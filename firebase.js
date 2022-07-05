import { initializeApp, getApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyARuFFB5XWSHr_jSTkiKVr7BfaKbM-nRB0",
    authDomain: "chatapp-b7c17.firebaseapp.com",
    databaseURL: "https://chatapp-b7c17-default-rtdb.firebaseio.com",
    projectId: "chatapp-b7c17",
    storageBucket: "chatapp-b7c17.appspot.com",
    messagingSenderId: "908560676324",
    appId: "1:908560676324:web:b4957eedd91c418e0343f1",
    measurementId: "G-M4YZWT16T1"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = initializeFirestore(app, {experimentalForceLongPolling: true});

export { db, auth };