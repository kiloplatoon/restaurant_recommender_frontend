import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAkwSLIjyZx24OwjT-3rORG5ry4LcCmt-U",
  authDomain: "user-likes-f5f5a.firebaseapp.com",
  databaseURL: "https://user-likes-f5f5a.firebaseio.com",
  projectId: "user-likes-f5f5a",
  storageBucket: "user-likes-f5f5a.appspot.com",
  messagingSenderId: "767934657738",
  appId: "1:767934657738:web:ffba19e11c9495a9acf033",
  measurementId: "G-GNVHB276QT"
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// const base = Rebase.createClass(app.database())

export default app