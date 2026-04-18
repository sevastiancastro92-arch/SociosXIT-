// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut, updatePassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase, ref, set, get, child, update, push, runTransaction, remove } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDrNambFw1VNXSkTR1yGq6_B9jWWA1LsxM",
    authDomain: "clientesvip-be9bd.firebaseapp.com",
    projectId: "clientesvip-be9bd",
    storageBucket: "clientesvip-be9bd.firebasestorage.app",
    messagingSenderId: "131036295027",
    appId: "1:131036295027:web:3cc360dca16d4873f55f06",
    // 👇 ESTA LÍNEA ES VITAL PARA QUE CONECTE Y LEA LA REALTIME DATABASE
    databaseURL: "https://clientesvip-be9bd-default-rtdb.firebaseio.com" 
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut, updatePassword, ref, set, get, child, update, push, runTransaction, remove };
