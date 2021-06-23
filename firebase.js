import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyD35Wd7PDRN8ckXKBbTgrFWHNG7-m1-qO4',
  authDomain: 'whatssap-next.firebaseapp.com',
  projectId: 'whatssap-next',
  storageBucket: 'whatssap-next.appspot.com',
  messagingSenderId: '597354196693',
  appId: '1:597354196693:web:b0e28ed2bbf3bbcb85bc5c',
};
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { db, auth, provider };
