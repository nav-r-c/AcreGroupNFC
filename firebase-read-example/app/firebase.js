// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCQLoUB2AjtHPNn-PBgIus8LUD3RGYd7mg",
//   authDomain: "testdb-7af30.firebaseapp.com",
//   projectId: "testdb-7af30",
//   storageBucket: "testdb-7af30.appspot.com",
//   messagingSenderId: "495337393787",
//   appId: "1:495337393787:web:c1077676f2c4b45b975cde",
//   measurementId: "G-LYWVZCFBJP"
// };
const firebaseConfig = {
  apiKey: "AIzaSyBDAemmFF-fv3ZwS_PuhRBXfuQBDyNr2jI",
  authDomain: "acregroupsdb.firebaseapp.com",
  databaseURL: "https://acregroupsdb-default-rtdb.firebaseio.com",
  projectId: "acregroupsdb",
  storageBucket: "acregroupsdb.appspot.com",
  messagingSenderId: "779808800292",
  appId: "1:779808800292:web:f67a438199036d5c7aa2b1",
  measurementId: "G-Z7VYSECBDR"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

export default firebase;
// const analytics = getAnalytics(app);