let adminBase = []
let adminDetail = {
    mail: 'dumbmail',
    pass: 'dumbpass'
}
adminBase.push(adminDetail)

const logInAdmin = () => {
    const adminEmail = document.getElementById("admin-email").value
    const adminPass = document.getElementById("admin-pass").value

    if (adminEmail.trim() === "" || adminPass.trim() === "") {
        document.getElementById("admin-email").style.borderColor = "red"
        document.getElementById("admin-email").style.border = "2px solid red"
        document.getElementById("admin-pass").style.borderColor = "red"
        document.getElementById("admin-pass").style.border = "2px solid red"

        setTimeout(() => {
            document.getElementById("admin-email").style.borderColor = "black"
            document.getElementById("admin-email").style.border = "1px solid black"
            document.getElementById("admin-pass").style.borderColor = "black"
            document.getElementById("admin-pass").style.border = "1px solid black"
        }, 2500)
    } else {
        let checkMail = adminBase.find(existingAdmin => existingAdmin.mail === adminEmail)
        let checkPass = adminBase.find(existingAdmin => existingAdmin.pass === adminPass)

        if (checkMail && checkPass) {
            setTimeout(() => {
                window.location.href = "/dashboard.html"
            }, 1000);
        } else {
                document.getElementById("admin-email").style.borderColor = "red"
        document.getElementById("admin-email").style.border = "2px solid red"
        document.getElementById("admin-pass").style.borderColor = "red"
        document.getElementById("admin-pass").style.border = "2px solid red"

        setTimeout(() => {
            document.getElementById("admin-email").style.borderColor = "black"
            document.getElementById("admin-email").style.border = "1px solid black"
            document.getElementById("admin-pass").style.borderColor = "black"
            document.getElementById("admin-pass").style.border = "1px solid black"
        }, 2500)
        }
    }
}

// BECOME ADMIN
let joinAdmin = document.getElementById("join-admin")
joinAdmin.addEventListener("click", () => {
    windows.location.href = ""
})

window.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        logInAdmin()
    }
})