// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut, updatePassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase, ref, set, get, child, update, push, runTransaction, remove, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDoIGXJQ2NEgeUXCDHLSFc7YDA6EtDYUSg",
    authDomain: "socios666-7056e.firebaseapp.com",
    projectId: "socios666-7056e",
    storageBucket: "socios666-7056e.firebasestorage.app",
    messagingSenderId: "328433251001",
    appId: "1:328433251001:web:141a5bf56127e323afe168",
    databaseURL: "https://socios666-7056e-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export {
    auth,
    db,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    updatePassword,
    ref,
    set,
    get,
    child,
    update,
    push,
    runTransaction,
    remove,
    onValue
};