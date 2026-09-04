import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDC0NNzKpS2Otu-iWK-RvQqe0PgMPxzgD0",
    databaseURL: "https://swerv-auth-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "swerv-auth",
    appId: "1:715376679496:web:22768a169f4eea4346567d"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const referenceInDB = ref(database, "products")

onValue(referenceInDB, (snapshot) => {
    const optionAll = document.getElementById("all-list")
    const optionEveryday = document.getElementById("everyday-list")
    const optionTraining = document.getElementById("training-list")
    const optionCorporate = document.getElementById("corporate-list")

    if (snapshot.exists()) {
        const allProducts = Object.entries(snapshot.val())
        optionAll.innerHTML = ""
        optionEveryday.innerHTML = ""
        optionTraining.innerHTML = ""
        optionCorporate.innerHTML = ""

        allProducts.forEach(([key, product]) => {


            // ALL PRODUCTS SECTION
            if (product.isActive !== false) {
                optionAll.innerHTML += `
                    <div class="product">
                       <div class="img-container">
                            <img class="product-image" src="${product.productImage}" alt="">
                        </div>
    
                        <div class="bottom-detail">
                            <span class="detail-container">
                                <p class="product-name">${product.productName}</p>
                                <small id="price"> $${product.price}</small>
                                <small id="size">Size - ${product.productSize}</small>
                            </span>
    
                            <i onclick="addToCart('${key}')" class="bi bi-handbag-fill add-to-cart-icon"></i>
                        </div>
                     </div>`
            }


            // EVERYDAY SECTION
            if (product.category == "everyday" && product.isActive !== false) {
                optionEveryday.innerHTML += `
                <div class="product"> 
                        <div class="img-container">
                            <img class="product-image" src="${product.productImage}" alt="">
                        </div>
    
                        <div class="bottom-detail">
                            <span class="detail-container">
                                <p class="product-name">${product.productName}</p>
                                <small id="price"> $${product.price}</small>
                                <small id="size">Size - ${product.productSize}</small>
                            </span>
    
                            <i onclick="addToCart('${key}')" class="bi bi-handbag-fill add-to-cart-icon"></i>
                        </div>
                    </div>`
            }


            // TRAINING SECTION
            if (product.category == "training" && product.isActive !== false) {
                optionTraining.innerHTML += `
                <div class="product">
                       <div class="img-container">
                            <img class="product-image" src="${product.productImage}" alt="">
                        </div>
    
                        <div class="bottom-detail">
                            <span class="detail-container">
                                <p class="product-name">${product.productName}</p>
                                <small id="price"> $${product.price}</small>
                                <small id="size">Size - ${product.productSize}</small>
                            </span>
    
                            <i onclick="addToCart('${key}')" class="bi bi-handbag-fill add-to-cart-icon"></i>
                        </div>
                    </div>`
            }



            // CORPORATE SECTION
            if (product.category == "corporate" && product.isActive !== false) {
                optionCorporate.innerHTML += `
                <div class="product">
                        <div class="img-container">
                            <img class="product-image" src="${product.productImage}" alt="">
                        </div>
    
                        <div class="bottom-detail">
                            <span class="detail-container">
                                <p class="product-name">${product.productName}</p>
                                <small id="price"> $${product.price}</small>
                                <small id="size">Size - ${product.productSize}</small>
                            </span>
    
                            <i onclick="addToCart('${key}')" class="bi bi-handbag-fill add-to-cart-icon"></i>
                        </div>
                    </div>`
            }
        })
    }
})
window.onValue = onValue

const getCart = () => {
    try {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

        if (Array.isArray(storedCart)) return storedCart;
        if (storedCart.key && storedCart.quantity) return [storedCart];
    } catch (error) {
        console.warn("Unable to read cart data:", error);
    }

    localStorage.setItem("cart", JSON.stringify([]));
    return [];
};

// ADD TO CART
const addToCart = (key) => {
    let cart = getCart()
    const existingItem = cart.find(item => item.key === key)

    if (existingItem) {
        existingItem.quantity += 1
    } else {
        cart.push({ key, quantity: 1 })
    }

    localStorage.setItem("cart", JSON.stringify(cart))
    updateCartCount()
}
window.addToCart = addToCart


// UPDATE CART COUNT
const updateCartCount = () => {
    const cart = getCart()

    let totalItems = 0
    cart.forEach(item => {
        totalItems += item.quantity
    })

    const cartCountBadge = document.getElementById("cart-count")
    cartCountBadge.innerHTML = totalItems
}
window.updateCartCount = updateCartCount

updateCartCount()