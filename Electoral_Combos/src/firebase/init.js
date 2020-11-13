import firebase from 'firebase'
import firestore from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA1isqTkGQ8qkRh0u0Nqx9-LO8JDnYx8mI",
    authDomain: "electoral-combos.firebaseapp.com",
    databaseURL: "https://electoral-combos.firebaseio.com",
    projectId: "electoral-combos",
    storageBucket: "electoral-combos.appspot.com",
    messagingSenderId: "406929772875",
    appId: "1:406929772875:web:7bf64b50ff9646e04b98ce"
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
firebaseApp.firestore().settings({ timestampsInSnapshots: true })

export default firebaseApp.firestore()