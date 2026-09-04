import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
import { getDatabase, ref, get, onValue } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDC0NNzKpS2Otu-iWK-RvQqe0PgMPxzgD0",
    authDomain: "swerv-auth.firebaseapp.com",
    databaseURL: "https://swerv-auth-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "swerv-auth",
    storageBucket: "swerv-auth.firebasestorage.app",
    appId: "1:715376679496:web:22768a169f4eea4346567d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

const logInAdmin = async () => {
    const email = document.getElementById("admin-email").value
    const password = document.getElementById("admin-pass").value

    if (email.trim() === "" || password.trim() === "") {
        displayError("All fields are required!")
        return;
    }

    const spinner = document.querySelector(".loader")
    const btnText = document.querySelector(".btn-text")
    spinner.removeAttribute("hidden")
    btnText.style.display = "none"

    let errorMessage
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const adminRef = ref(database, "admin/" + user.uid);
        const snapshot = await get(adminRef);
        if (snapshot.exists()) {
            window.location.href = "/admin/admin-dashboard/dashboard.html";
        } else {
            await signOut(auth);
            displayError("Access denied!")
        }
    } catch (error) {
        if (error.code === "auth/invalid-credential") {
            errorMessage = "Invalid email or password!"
            displayError(errorMessage)
        } else {
            errorMessage = "Something went wrong, try again!"
            displayError(errorMessage)
        }
    } finally {
        document.getElementById("admin-email").value = ""
        document.getElementById("admin-pass").value = ""
        spinner.setAttribute("hidden", "")
        btnText.style.display = "block"
    }
}
window.logInAdmin = logInAdmin

const displayError = (errorMessage) => {
    const inputContainers = document.querySelectorAll(".input-container")
    const icons = document.querySelectorAll(".form-icon")
    const error = document.getElementById("display-error")

    inputContainers.forEach(input => {
        input.style.borderColor = "red"
    });
    icons.forEach(icon => {
        icon.style.color = "red"
    })
    error.style.display = "flex"
    error.innerHTML = `<i class="bi bi-exclamation-triangle-fill"></i>
                ${errorMessage}`

    setTimeout(() => {
        inputContainers.forEach(input => {
            input.style.borderColor = "black"
        });
        icons.forEach(icon => {
            icon.style.color = "black"
        })
        error.style.display = "none"
    }, 2500)
}
window.displayError = displayError


// BECOME ADMIN
let joinAdmin = document.getElementById("join-admin")
joinAdmin.addEventListener("click", () => {
    window.location.href = ""
})

window.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        logInAdmin()
    }
})