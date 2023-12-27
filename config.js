import firebase from 'firebase/compat/app';
import 'firebase/compat/storage'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDXPtyYlNJqO9G3oJ9dut-va9TfnEet6Us",
    authDomain: "hastane-459b9.firebaseapp.com",
    databaseURL: "https://hastane-459b9-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "hastane-459b9",
    storageBucket: "hastane-459b9.appspot.com",
    messagingSenderId: "598163733452",
    appId: "1:598163733452:web:dea36040f59d7f0b0dbb69",
    measurementId: "G-BE3TGWH0LW"
}

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export{firebase};