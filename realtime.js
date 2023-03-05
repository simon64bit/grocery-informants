/*import { initializeApp } from "firebase/app";
//import { getDatabase, ref, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



export default async function firebase(){
    //const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
    //const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

    //initializeApp();

    //const db = getFirestore();


// Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyCWehrPbQD0NyUQmHy07ruyHKAmJ9pcbX4",
        authDomain: "grocery3-643b2.firebaseapp.com",
        databaseURL: "https://grocery3-643b2-default-rtdb.firebaseio.com",
        projectId: "grocery3-643b2",
        storageBucket: "grocery3-643b2.appspot.com",
        messagingSenderId: "68149433011",
        appId: "1:68149433011:web:7156365e85477b220756c6"
    };
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig)
    //const database = getDatabase(app);

    const data = 'bannana';
    
    console.log(set(ref(db, 'query/'), {data}));
    //const res =  db.collection('queries').add(data);

    //console.log('Added document with ID: ', res.id);
}

*/