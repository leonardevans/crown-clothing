import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app';
import {getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD40xvmijWCSO_UoCVLa9o4FZaqR3Tsnic",
    authDomain: "crwn-clothing-db-f1214.firebaseapp.com",
    projectId: "crwn-clothing-db-f1214",
    storageBucket: "crwn-clothing-db-f1214.appspot.com",
    messagingSenderId: "703893144675",
    appId: "1:703893144675:web:fcb0d087d8334c43336456"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const  signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    
    if (!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch (error) {
            console.log('Error creating user', error.message);
        }
    }
}