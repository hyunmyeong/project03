import { initializeApp } from 'firebase/app';
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";


// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyDtd5ANeEL4jwmgO2DHP5xkFA94L4QO358",
    authDomain: "authex-d9d10.firebaseapp.com",
    projectId: "authex-d9d10",
    storageBucket: "authex-d9d10.appspot.com",
    messagingSenderId: "1077569721256",
    appId: "1:1077569721256:web:1bf6c03c49a2c55d2b039d",
    measurementId: "G-2GHW42N6ST"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);


export default app;