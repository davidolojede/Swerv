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

const addProductKey = () => {
    let productName = document.getElementById("name-input").value
    let productID = Number(document.getElementById("id-input").value)
    let category = document.getElementById("category-input").value
    let productSize = Number(document.getElementById("size-input").value)
    let price = Number(document.getElementById("price-input").value)
    let quantity = Number(document.getElementById("quantity-input").value)
    let productImage = document.getElementById("image-input").files[0]

    if (productName.trim() === "" || !productID || productID <= 100 || category.trim() === "" || !productSize || productSize < 1 || !price || price < 1 || !quantity || quantity < 1 || !productImage) {
        addProduct.style.backgroundColor = "red"
        setTimeout(() => {
            addProduct.style.backgroundColor = "#34452D"
        }, 1000)
    } else {
        let reader = new FileReader()
        reader.onload = () => {
            const productDetails = { productName, productID, category, productSize, price, quantity, productImage: reader.result }
            allProducts.push(productDetails)
            localStorage.setItem("productStorage", JSON.stringify(allProducts))

            allModalInputs.forEach(modalInput => {
                modalInput.value = ""
            })
            cancelModal()
            displayProducts(productDetails)
            console.log(allProducts)
        }
        reader.readAsDataURL(productImage)
    }
}

window.addEventListener("keydown", (event) => {
    if (event.code === "Enter") {
        addProductKey()
    }
})

window.addEventListener("keydown", (event) => {
    if (event.code === "Escape") {
        cancelModal()
    }
})

const displayProducts = (productDetails, index) => {
    const productList = document.querySelector(".product-list")
    const productItem = document.createElement("li")
    productItem.classList.add("product-item")
    productItem.innerHTML = `
        <img class="product-image" src="${productDetails.productImage}" alt="">

                        <div class="product-info">
                            <p class="product-name">${productDetails.productName}</p>
                            <p class="product-size">Size: ${productDetails.productSize}</p>
                        </div>
                        <span class="product-id">SKU-${productDetails.productID}</span>
                        <span class="product-category">${productDetails.category}</span>
                        <span class="product-price">₦${productDetails.price}</span>
                        <span class="stock">${productDetails.quantity}</span>
                        <span class="actions">
                            <i id="hide-btn" class="bi bi-eye"></i>
                            <i id="delete-btn" onclick="deleteProduct(${index})" class="bi bi-trash"></i>
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
    console.log(allProducts);

    for (let n = 0; n < allProducts.length; n++) {
        displayProducts(allProducts[n])
    }
} 
