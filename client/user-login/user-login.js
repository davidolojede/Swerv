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
}

const getSignupForm = () => {
    loginForm.style.display = "none"
    signupForm.style.display = "grid"
    signupText.style.display = "none"
    loginText.style.display = "inline"
}

const inputContainers = document.querySelectorAll(".input-container")
const formIcons = document.querySelectorAll(".form-icon")

const displayError = () => {
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

const signUp = () => {
    const userName = document.getElementById("name-input").value
    const userEmail = document.getElementById("email-input").value
    const userPass = document.getElementById("pass-input").value
    const userPassConfirm = document.getElementById("confirm-pass").value

    if (userName.trim() === "" || userEmail.trim() === "" || userPass.trim() === "" || userPassConfirm.trim() === "") {
        displayError()
    } else {
        const checkEmail = userBase.find(newUser => newUser.userEmail === userEmail)
        if (checkEmail) {
            displayError()
            console.log("User found");
        } else {
            const passContainer = document.getElementById("pass-check")
            const confirmPassContainer = document.getElementById("pass-confirm")
            const passIcons = document.querySelectorAll("bi-lock")

            if (userPassConfirm !== userPass) {
                passContainer.style.borderColor = "red"
                confirmPassContainer.style.borderColor = "red"

                passIcons.forEach(icon => {
                    icon.style.color = "red"
                })
                setTimeout(() => {
                    passContainer.style.borderColor = "#cac7b6"
                    confirmPassContainer.style.borderColor = "#cac7b6"

                    passIcons.forEach(icon => {
                        icon.style.color = "black"
                    })
                }, 2500)
            } else {
                const userDetails = { userName, userEmail, userPass, userPassConfirm }
                userBase.push(userDetails)
                localStorage.setItem("userStorage", JSON.stringify(userBase))

                setTimeout(() => {
                    getLoginForm()
                }, 2000)
            }
        }
    }
}

// LOGIN FUNCTION
const login = () => {
    const userEmail = document.getElementById("email-log").value
    const userPass = document.getElementById("pass-log").value

    if (userEmail.trim() === "" || userPass.trim() === "") {
        displayError()
    } else {
        const checkEmail = userBase.find(existingUser => existingUser.userEmail === userEmail)
        const checkPass = userBase.find(existingUser => existingUser.userPas === userPass)

        if (checkEmail && checkPass) {
            console.log("Proceeding")
        } else {
            displayError()

            document.getElementById("email-log").value = ""
            document.getElementById("pass-log").value = ""
        }
    }
}