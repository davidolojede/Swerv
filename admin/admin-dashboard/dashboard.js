import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDC0NNzKpS2Otu-iWK-RvQqe0PgMPxzgD0",
    databaseURL: "https://swerv-auth-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "swerv-auth",
    appId: "1:715376679496:web:22768a169f4eea4346567d"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const referenceInDB = ref(database, "products")


const allProducts = JSON.parse(localStorage.getItem("productStorage")) || []

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

    localStorage.setItem("currentView", "dashboard")
}

const goToProduct = () => {
    productSection.classList.add("flex-display")
    productSection.classList.remove("no-display")

    dashboardSection.classList.add("no-display")
    dashboardSection.classList.remove("grid-display")

    localStorage.setItem("currentView", "product")
}

const view = localStorage.getItem("currentView")
if (view === "dashboard") {
    goToDashboard()
} else {
    goToProduct()
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
const addProduct = document.getElementById("add-input")
const modal = document.getElementById("modal-section")
const allModalInputs = document.querySelectorAll(".modal-input")

popupModal.addEventListener("click", () => {
    modal.classList.remove("no-display")
    modal.classList.add("grid-display")
})

const cancelModal = () => {
    modal.classList.add("no-display")

    allModalInputs.forEach((modalInput) => {
        modalInput.value = ""
    })
}

//PRODUCT STAT ELEMENTS
const totalProductNumber = document.getElementById("total-product-num")
const totalActiveNumber = document.getElementById("total-active-num")
const totalInactiveNumber = document.getElementById("total-inactive-num")
const outOfStockNumber = document.getElementById("out-of-stock-num")

const activeCount = allProducts.filter(product => product.isActive === true)
const inactiveCount = allProducts.filter(product => product.isActive === false)

totalProductNumber.innerHTML = allProducts.length
totalActiveNumber.innerHTML = activeCount.length
totalInactiveNumber.innerHTML = inactiveCount.length

const addProductKey = () => {
    const productName = document.getElementById("name-input").value
    const productID = Number(document.getElementById("id-input").value)
    const category = document.getElementById("category-input").value
    const productSize = Number(document.getElementById("size-input").value)
    const price = Number(document.getElementById("price-input").value)
    const quantity = Number(document.getElementById("quantity-input").value)
    const productImage = document.getElementById("image-input").files[0]

    // Validation
    const idExists = allProducts.some(product => product.productID === productID)
    if (idExists) {
        addProduct.style.backgroundColor = "orange"
        alert("Product ID already exists!")
        setTimeout(() => {
            addProduct.style.backgroundColor = "#34452D"
        }, 1000)
        return
    }

    // OTHER PROPERTIES
    let isActive = true

    if (productName.trim() === "" || !productID || productID <= 100 || category.trim() === "" || !productSize || productSize < 1 || !price || price < 1 || !quantity || quantity < 1 || !productImage) {
        addProduct.style.backgroundColor = "red"
        setTimeout(() => {
            addProduct.style.backgroundColor = "#34452D"
        }, 1000)
    } else {
        let reader = new FileReader()
        reader.onload = () => {
            const productDetails = { productName, productID, category, productSize, price, quantity, productImage: reader.result, isActive }
            push(referenceInDB, productDetails)

            allModalInputs.forEach(modalInput => {
                modalInput.value = ""
            })
            cancelModal()
            displayProducts(productDetails, allProducts.length - 1)
            totalProductNumber.innerHTML = allProducts.length
            const activeCount = allProducts.filter(product => product.isActive === true)
            const inactiveCount = allProducts.filter(product => product.isActive === false)
            totalActiveNumber.innerHTML = activeCount.length
            totalInactiveNumber.innerHTML = inactiveCount.length
            console.log(allProducts)
        }
        reader.readAsDataURL(productImage)
    }
}
window.addProductKey = addProductKey;
onValue(referenceInDB, (snapshot) => {
    console.log(snapshot.val());
})
window.onValue = onValue

window.addEventListener("keydown", (event) => {
    if (event.code === "Enter" && modal.classList.contains("grid-display")) {
        addProductKey()
    }
})

window.addEventListener("keydown", (event) => {
    if (event.code === "Escape" && modal.classList.contains("grid-display")) {
        cancelModal()
    }
})

const displayProducts = (productDetails, index) => {
    const productList = document.querySelector(".product-list")
    const productItem = document.createElement("li")

    let eyeIcon
    let eyeColor
    if (productDetails.isActive === true) {
        eyeIcon = "bi-eye"
        eyeColor = "green"
    } else {
        eyeIcon = "bi-eye-slash"
        eyeColor = "red"
    }

    productItem.classList.add("product-item")
    productItem.innerHTML = `
    <div class ="product-details">
        <img class="product-image" src="${productDetails.productImage}" alt="">

                        <div class="product-info">
                            <p class="product-name">${productDetails.productName}</p>
                            <p class="product-size">Size: ${productDetails.productSize}</p>
                        </div>
                        </div>
                        <span class="product-id">SKU-${productDetails.productID}</span>
                        <span class="product-category">${productDetails.category}</span>
                        <span class="product-price">₦${productDetails.price}</span>
                        <span class="stock">${productDetails.quantity}</span>
                        <span class="actions">
                            <i onclick="toggleActive(${index})" class="bi ${eyeIcon} hide-btn" style="color:${eyeColor};"></i>
                            <i onclick="deleteProduct(${index})" class="bi bi-trash delete-btn"></i>
                        </span>
    `
    productList.appendChild(productItem)
}


for (let index = 0; index < allProducts.length; index++) {
    displayProducts(allProducts[index], index)
}

const deleteProduct = (index) => {
    allProducts.splice(index, 1)
    localStorage.setItem("productStorage", JSON.stringify(allProducts))
    const productList = document.querySelector(".product-list")
    productList.innerHTML = ""
    totalProductNumber.innerHTML = allProducts.length
    const activeCount = allProducts.filter(product => product.isActive === true)
    const inactiveCount = allProducts.filter(product => product.isActive === false)
    totalActiveNumber.innerHTML = activeCount.length
    totalInactiveNumber.innerHTML = inactiveCount.length

    for (let n = 0; n < allProducts.length; n++) {
        displayProducts(allProducts[n], n)
    }
    console.log(allProducts);
}

const toggleActive = (index) => {
    allProducts[index].isActive = !allProducts[index].isActive
    localStorage.setItem("productStorage", JSON.stringify(allProducts))
    const productList = document.querySelector(".product-list")
    productList.innerHTML = ""
    for (let n = 0; n < allProducts.length; n++) {
        displayProducts(allProducts[n], n)
    }
    const activeCount = allProducts.filter(product => product.isActive === true)
    const inactiveCount = allProducts.filter(product => product.isActive === false)
    totalActiveNumber.innerHTML = activeCount.length
    totalInactiveNumber.innerHTML = inactiveCount.length
    console.log(allProducts)
}