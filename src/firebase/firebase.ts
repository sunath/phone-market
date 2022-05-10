import { initializeApp } from "firebase/app";

import {firebaseConfig} from "./firebase-config"

import {getAuth} from "firebase/auth"
import {getDatabase} from "firebase/database";

const firebaseApp = initializeApp(firebaseConfig);


export const auth  = getAuth(firebaseApp);
export const database = getDatabase()


