  // Your web app's Firebase configuration
import firebase from 'firebase'
import firestore from 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyDpXWDZoL2nIDxfZivxoQfkFSvzQ4ue9tE",
  authDomain: "instaclone2-1304e.firebaseapp.com",
  projectId: "instaclone2-1304e",
  storageBucket: "instaclone2-1304e.appspot.com",
  messagingSenderId: "206975860898",
  databaseURL: "https://instaclone2-1304e.firebaseio.com",
  appId: "1:206975860898:web:8bd1b34730433a9d4817fb"
};
// Initialize Firebase
const x  = firebase.initializeApp(firebaseConfig);
x.firestore().settings({timestampsInSnapshots:true})
export default x.firestore()