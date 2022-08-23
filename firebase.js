import * as firebase from 'firebase';
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    // apiKey: "AIzaSyB0r5Ajw1_0MR3jLAToPq3ecGHtinrq0E0",
    // authDomain: "cognicheck.firebaseapp.com",
    // projectId: "cognicheck",
    // storageBucket: "gs://cognicheck.appspot.com",
    // messagingSenderId: "137980277536",
    // appId: "1:137980277536:web:48d1fa51494deb85e7dd45",
    // measurementId: "G-ZHTMWYGYFR"

    apiKey: "AIzaSyD_5s1PLxaDspZIBom_E9epv5qYOtmathY",
    authDomain: "cognicheck-5a3b6.firebaseapp.com",
    projectId: "cognicheck-5a3b6",
    storageBucket: "cognicheck-5a3b6.appspot.com",
    messagingSenderId: "258114195210",
    appId: "1:258114195210:web:0fe855c6cd927d334674f3",
    measurementId: "G-7KDSWKJRXR"


};

let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
}
else {
    app = firebase.app()
}

const db = app.firestore();
const auth = firebase.auth();
var storage = app.storage();
var storageRef = storage.ref();
export { db, auth, storageRef };