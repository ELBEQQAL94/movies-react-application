import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBCbqBuewARTa5Eh1AijkmvuYaG8O0t2no",
    authDomain: "movies-react-app-5e765.firebaseapp.com",
    databaseURL: "https://movies-react-app-5e765.firebaseio.com",
    projectId: "movies-react-app-5e765",
    storageBucket: "movies-react-app-5e765.appspot.com",
    messagingSenderId: "159798697070",
    appId: "1:159798697070:web:91d72e6b7ba8d47fd19a7f"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// firebase databse 
const db = firebaseApp.firestore();

// firebase storage
const storage = firebaseApp.storage();
const fetchNewElements = (type) => db.collection("elements").where("type", "==", type).get();

export {
  db,
  storage,
  fetchNewElements,
};
