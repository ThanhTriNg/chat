import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';
const firebaseConfig = {
    apiKey: 'AIzaSyD1O29jWGDaYC0bVB7TlqvKiVod-0LnnGk',
    authDomain: 'chat-realtime-d5758.firebaseapp.com',
    projectId: 'chat-realtime-d5758',
    storageBucket: 'chat-realtime-d5758.appspot.com',
    messagingSenderId: '914820390916',
    appId: '1:914820390916:web:fc24bcaff51fde59e91551',
    measurementId: 'G-T1FELW4VW4',
};

// Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);
// const analytics = firebase.analytics(app);
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();
// use firebase emulators
console.log(window.location.hostname);
if (window.location.hostname === 'localhost') {
    auth.useEmulator('http://localhost:9099/');
    db.useEmulator('localhost', '8081');
}

export { db, auth };
export default firebase;
