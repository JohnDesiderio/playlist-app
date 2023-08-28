//Get the imports
import { initializeApp } from 'firebase/app';
import { getFirestore, CollectionReference, collection, DocumentData } from 'firebase/firestore';
import { track } from './ITrack';

// Init the firebase app
export const firebaseApp = initializeApp({
    apiKey: "AIzaSyAD1SSq1oRRRYIdILYzsYlb_na7r7fuX2E",
    authDomain: "gross-incompetence.firebaseapp.com",
    projectId: "gross-incompetence",
    storageBucket: "gross-incompetence.appspot.com",
    messagingSenderId: "92066788728",
    appId: "1:92066788728:web:1fcdf6e66db1823e10c48d",
    measurementId: "G-FWPJVDGL85",  
});

export const firestore = getFirestore();

// This is just a helper fto add the type to the db repsonses
const createCollection = <T = DocumentData>(collectionName: string) => {
    return collection(firestore, collectionName) as CollectionReference<T>;
}

export const tracksCol = createCollection<track>('tracks');