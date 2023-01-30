
import { initializeApp } from 'firebase/app';

export default async function firebase(){
    //const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
    //const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

    //initializeApp();

    //const db = getFirestore();


    const firebaseConfig = {
        apiKey: "AIzaSyB8q1vEh1xbodBQlfB-8WFD2jp0VT0LIRU",
        authDomain: "grocery2-3d2f2.firebaseapp.com",
        projectId: "grocery2-3d2f2",
        storageBucket: "grocery2-3d2f2.appspot.com",
        messagingSenderId: "28146199334",
        appId: "1:28146199334:web:280144836aec84df95efe7"
      };
      
      // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore();

    const data = {
        query: 'bannana'
    };
    try
    {  await db.collection("queries").add(data); } catch(e) { console.log(e)
    }
    //const res =  db.collection('queries').add(data);

    //console.log('Added document with ID: ', res.id);
}

