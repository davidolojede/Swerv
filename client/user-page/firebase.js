import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyDC0NNzKpS2Otu-iWK-RvQqe0PgMPxzgD0",
    authDomain: "swerv-auth.firebaseapp.com",
    databaseURL: "https://swerv-auth-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "swerv-auth",
    storageBucket: "swerv-auth.firebasestorage.app",
    messagingSenderId: "715376679496",
    appId: "1:715376679496:web:22768a169f4eea4346567d"
};

export const app = initializeApp(firebaseConfig);
