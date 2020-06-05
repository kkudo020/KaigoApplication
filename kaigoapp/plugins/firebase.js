import firebase from "firebase/app"
import "firebase/database";

if(!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyBVLv1_vsudGtyJWR8KzBgPiRJCYna23lk",
        authDomain: "kaigo-db-a268b.firebaseapp.com",
        databaseURL: "https://kaigo-db-a268b.firebaseio.com",
        projectId: "kaigo-db-a268b",
        storageBucket: "kaigo-db-a268b.appspot.com",
        messagingSenderId: "420968871986",
        appId: "1:420968871986:web:090b7fd753b33bd1aae42b"
    })
}

export default firebase