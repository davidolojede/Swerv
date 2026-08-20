const allProducts = []
const productDetail = {

}
const dashboardBtn = document.getElementById("goto-dashboard")
const productsBtn = document.getElementById("goto-products")
const ordersBtn = document.getElementById("goto-orders")
const customersBtn = document.getElementById("goto-customers")
const logoutBtn = document.getElementById("logout-btn")

const dashboardSection = document.getElementById("dashboard")
const productSection = document.getElementById("product-section")

const addCustomerBtn = document.getElementById("add-customer-btn")

const goToDashboard = () => {
    dashboardSection.classList.add("grid-display")
    dashboardSection.classList.remove("no-display")

    productSection.classList.add("no-display")
    productSection.classList.remove("flex-display")
}

const goToProduct = () => {
    productSection.classList.add("flex-display")
    productSection.classList.remove("no-display")

    dashboardSection.classList.add("no-display")
    dashboardSection.classList.remove("grid-display")
    console.log("Hey")
}

const logOut = () => {
    setTimeout(() => {
        window.location.href = "/admin/admin-login/index.html"
    }, 1000)
}

addCustomerBtn.addEventListener("click", () => {
    goToProduct()
})


// PRODUCT SECTION
const popupModal = document.getElementById("add-product-btn")
const cancelModal = document.getElementById("cancel-input")
const addProduct = document.getElementById("add-input")
const modal = document.getElementById("modal-section")
popupModal.addEventListener("click", () => {
    modal.classList.remove("no-display")
    // console.log("Hey");
})
