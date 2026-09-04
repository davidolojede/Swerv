import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove, update } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-database.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDC0NNzKpS2Otu-iWK-RvQqe0PgMPxzgD0",
    databaseURL: "https://swerv-auth-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "swerv-auth",
    appId: "1:715376679496:web:22768a169f4eea4346567d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const referenceInDB = ref(database, "products")
let cachedProducts = []

const productList = document.querySelector(".product-list")
const stockFilter = document.getElementById("stock-filter")

const filterAndDisplay = (allProducts) => {
    productList.innerHTML = ""
    const filterStatus = stockFilter.value

    if (filterStatus === "All Status") {
        allProducts.forEach(([key, productDetails]) => {
            displayProducts(key, productDetails)
            console.log("All Status");

        })
    } else if (filterStatus === "High Stock") {
        allProducts.forEach(([key, productDetails]) => {
            if (productDetails.quantity > 200) {
                displayProducts(key, productDetails)
                console.log("High Stock");
            }
        })
    } else if (filterStatus === "Low Stock") {
        allProducts.forEach(([key, productDetails]) => {
            if (productDetails.quantity < 200) {
                displayProducts(key, productDetails)
                console.log("Low Stock");
            }
        })
    } else if (filterStatus === "Out of Stock") {
        allProducts.forEach(([key, productDetails]) => {
            if (productDetails.quantity <= 0) {
                displayProducts(key, productDetails)
                console.log("Out of Stock");
            }
        })
    }
}
window.filterAndDisplay = filterAndDisplay

stockFilter.addEventListener("change", () => {
    filterAndDisplay(cachedProducts)
})

const loadProducts = () => {
    onValue(referenceInDB, (snapshot) => {
        const totalProductNumber = document.getElementById("total-product-num")
        const totalActiveNumber = document.getElementById("total-active-num")
        const totalInactiveNumber = document.getElementById("total-inactive-num")
        const outOfStockNumber = document.getElementById("out-of-stock-num")

        if (snapshot.exists()) {
            cachedProducts = Object.entries(snapshot.val())
            filterAndDisplay(cachedProducts)

            //PRODUCT STAT ELEMENTS
            const productCount = cachedProducts.length
            totalProductNumber.innerHTML = productCount
            const activeCount = cachedProducts.filter(([key, productDetails]) => productDetails.isActive === true)
            const inactiveCount = cachedProducts.filter(([key, productDetails]) => productDetails.isActive === false)

            totalActiveNumber.innerHTML = activeCount.length
            totalInactiveNumber.innerHTML = inactiveCount.length
        } else {
            totalProductNumber.innerHTML = 0
            totalActiveNumber.innerHTML = 0
            totalInactiveNumber.innerHTML = 0
        }
    })
    window.onValue = onValue
}
window.loadProducts = loadProducts
loadProducts()


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
window.goToDashboard = goToDashboard

const goToProduct = () => {
    productSection.classList.add("flex-display")
    productSection.classList.remove("no-display")

    dashboardSection.classList.add("no-display")
    dashboardSection.classList.remove("grid-display")

    localStorage.setItem("currentView", "product")
}
window.goToProduct = goToProduct

const view = localStorage.getItem("currentView")
if (view === "dashboard") {
    goToDashboard()
} else {
    goToProduct()
}

const logOut = () => {
    setTimeout(() => {
        signOut(auth);
        window.location.href = "/admin/admin-login/index.html"
    }, 1000)
}

addCustomerBtn.addEventListener("click", () => {
    goToProduct()
})
window.logOut = logOut


// PRODUCT SECTION
const popupModal = document.getElementById("add-product-btn")
const addProduct = document.getElementById("add-input")
const modal = document.getElementById("modal-section")
const allModalInputs = document.querySelectorAll(".modal-input")
const blank = document.querySelector(".blank-page")

popupModal.addEventListener("click", () => {
    modal.classList.remove("no-display")
    modal.classList.add("grid-display")
    blank.style.display = "block"
})

const cancelModal = () => {
    modal.classList.add("no-display")
    
    allModalInputs.forEach((modalInput) => {
        modalInput.value = ""
    })
    blank.style.display = "none"
}

const addProductKey = () => {
    const productName = document.getElementById("name-input").value
    const productID = Number(document.getElementById("id-input").value)
    const category = document.getElementById("category-input").value
    const productSize = Number(document.getElementById("size-input").value)
    const price = Number(document.getElementById("price-input").value)
    const quantity = Number(document.getElementById("quantity-input").value)
    const productImage = document.getElementById("image-input").files[0]
    let isActive = true

    // Validation
    onValue(referenceInDB, (snapshot) => {
        const allProducts = Object.entries(snapshot.val() || {});

        const idExists = allProducts.some(([key, productDetails]) => productDetails.productID === productID)
        console.log(idExists);

        console.log(allProducts);

        if (productName.trim() === "" || !productID || productID <= 100 || category.trim() === "" || !productSize || productSize < 1 || !price || price < 1 || !quantity || quantity < 1 || !productImage) {
            addProduct.style.backgroundColor = "red"
            setTimeout(() => {
                addProduct.style.backgroundColor = "#34452D"
            }, 1000)
        } else if (idExists) {
            addProduct.style.backgroundColor = "orange"
            alert("Product ID already exists!")
            setTimeout(() => {
                addProduct.style.backgroundColor = "#34452D"
            }, 1000)
            return
        } else {
            let reader = new FileReader()
            reader.onload = () => {
                const productDetails = { productName, productID, category, productSize, price, quantity, productImage: reader.result, isActive }
                push(referenceInDB, productDetails)

                allModalInputs.forEach(modalInput => {
                    modalInput.value = ""
                })
                cancelModal()
            }
            reader.readAsDataURL(productImage)
        }
    }, { onlyOnce: true })

}
window.addProductKey = addProductKey;

window.addEventListener("keydown", (event) => {
    if (event.code === "Enter" && modal.classList.contains("grid-display")) {
        event.preventDefault()
        addProductKey()
    }
})

window.addEventListener("keydown", (event) => {
    if (event.code === "Escape" && modal.classList.contains("grid-display")) {
        cancelModal()
    }
})

const displayProducts = (index, productDetails) => {
    const productList = document.querySelector(".product-list")
    const productItem = document.createElement("li")
    const productImageSrc = productDetails.productImage || "https://via.placeholder.com/150?text=No+Image"

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
        <img class="product-image" src="${productImageSrc}" alt="">

                        <div class="product-info">
                            <p class="product-name">${productDetails.productName}</p>
                            <p class="product-size">Size: ${productDetails.productSize}</p>
                        </div>
                        </div>
                        <span class="product-id">SKU-${productDetails.productID}</span>
                        <span class="product-category">${productDetails.category}</span>
                        <span class="product-price">₦${productDetails.price.toLocaleString()}</span>
                        <span class="stock">${productDetails.quantity}</span>
                        <span class="actions">
                            <i onclick="toggleActive('${index}')" class="bi ${eyeIcon} hide-btn" style="color:${eyeColor};"></i>
                            <i onclick="deleteProduct('${index}')" class="bi bi-trash delete-btn"></i>
                        </span>
    `
    productList.appendChild(productItem)
}
window.displayProducts = displayProducts


const deleteProduct = (key) => {
    remove(ref(database, `products/${key}`))
}
window.deleteProduct = deleteProduct

const toggleActive = (key) => {
    const productRef = ref(database, `products/${key}`)
    onValue(productRef, (snap) => {
        update(productRef, { isActive: !snap.val().isActive })
    }, { onlyOnce: true }
    )
}
window.toggleActive = toggleActive
