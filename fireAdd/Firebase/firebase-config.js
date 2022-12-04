import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSxx4FFQiCBsdNsFdSJcs13MA33ygaNmY",
  authDomain: "qrcodescanner-87758.firebaseapp.com",
  projectId: "qrcodescanner-87758",
  storageBucket: "qrcodescanner-87758.appspot.com",
  messagingSenderId: "741932192012",
  appId: "1:741932192012:web:ed50e14d0b4b4fc5263929"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}
export {firebase}; 