let adminBase = []
let adminDetail = {
    mail: 'dumbmail',
    pass: 'dumbpass'
}
adminBase.push(adminDetail)

const logInAdmin = () => {
    const adminEmail = document.getElementById("admin-email").value
    const adminPass = document.getElementById("admin-pass").value
    const inputContainers = document.querySelectorAll(".input-container")
    const icons = document.querySelectorAll(".form-icon")
    const error = document.getElementById("display-error")

    if (adminEmail.trim() === "" || adminPass.trim() === "") {
        inputContainers.forEach(input => {
            input.style.borderColor = "red"
        });
        icons.forEach(icon => {
            icon.style.color = "red"
        })
        error.style.display = "flex"
        error.innerHTML = `<i class="bi bi-exclamation-triangle-fill"></i>
        All fields are required!`

        setTimeout(() => {
            inputContainers.forEach(input => {
                input.style.borderColor = "black"
            });
            icons.forEach(icon => {
                icon.style.color = "black"
            })
            error.style.display = "none"
        }, 2500)
    } else {
        let checkMail = adminBase.find(existingAdmin => existingAdmin.mail === adminEmail)
        let checkPass = adminBase.find(existingAdmin => existingAdmin.pass === adminPass)

        if (checkMail && checkPass) {
            setTimeout(() => {
                window.location.href = "/admin/admin-dashboard/dashboard.html";
            }, 1000);
        } else {
            inputContainers.forEach(input => {
                input.style.borderColor = "red"
            });
            icons.forEach(icon => {
                icon.style.color = "red"
            })
            error.style.display = "flex"
            error.innerHTML = `<i class="bi bi-exclamation-triangle-fill"></i>
            Invalid email or password!`

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
    }
}

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