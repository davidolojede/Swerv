const userBase = JSON.parse(localStorage.getItem("userStorage")) || []
const loginBtn = document.getElementById("nav-login-btn")
const signupBtn = document.getElementById("nav-signup-btn")
const signupForm = document.getElementById("signup-container")
const loginForm = document.getElementById("login-container")
const loginText = document.getElementById("login-text")
const signupText = document.getElementById("signup-text")

const getLoginForm = () => {
    loginForm.style.display = "grid"
    signupForm.style.display = "none"
    loginText.style.display = "none"
    signupText.style.display = "inline"
    document.getElementById("email-log").focus()
}

const getSignupForm = () => {
    loginForm.style.display = "none"
    signupForm.style.display = "grid"
    signupText.style.display = "none"
    loginText.style.display = "inline"
    document.getElementById("name-input").focus()
}

const inputContainers = document.querySelectorAll(".input-container")
const formIcons = document.querySelectorAll(".form-icon")

let errorText = ""
const displayError = () => {
    const errorBox = document.getElementById("error-box")
    errorBox.innerHTML = `<i class="bi bi-exclamation-triangle-fill"></i>${errorText}`
    errorBox.style.display = "flex"

    setTimeout(() => {
        errorBox.style.display = "none"
    }, 2500)

    inputContainers.forEach(input => {
        input.style.borderColor = "red"

        setTimeout(() => {
            input.style.borderColor = "#cac7b6"
        }, 2500)
    })
    formIcons.forEach(icon => {
        icon.style.color = "red"

        setTimeout(() => {
            icon.style.color = "black"
        }, 2500)
    })
}
