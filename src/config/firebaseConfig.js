import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
//import {...} from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...}  from "firebase/storage";
import {ENV_APIKEY,ENV_AUTHDOMAIN,ENV_PROJECTID,ENV_STORAGEBUCKET,ENV_MESSAGINGSENDERID,ENV_APPIID} from '@env';

// Your web app's Firebase configuration
const firebaseConfig = {

    apiKey: ENV_APIKEY,
    authDomain: ENV_AUTHDOMAIN,
    projectId: ENV_PROJECTID,
    storageBucket: ENV_STORAGEBUCKET,
    messagingSenderId: ENV_MESSAGINGSENDERID,
    appId: ENV_APPIID 

};

// Initialize Firebase
initializeApp(firebaseConfig);
export const auth = getAuth();