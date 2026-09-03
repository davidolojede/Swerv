// @ts-nocheck
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDC0NNzKpS2Otu-iWK-RvQqe0PgMPxzgD0",
    databaseURL: "https://swerv-auth-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "swerv-auth",
    appId: "1:715376679496:web:22768a169f4eea4346567d"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const referenceInDB = ref(database, "products");

let allProductsCache = {};

// RENDER CART
const renderCart = () => {
    const cartList = document.getElementById("cart-items-list");
    const emptyState = document.getElementById("cart-empty-state");
    const cartCountBadge = document.getElementById("cart-count");
    const cartItemSummary = document.getElementById("cart-item-summary");
    const cartSubtotal = document.getElementById("cart-subtotal");
    const cartTotal = document.getElementById("cart-total");
    const checkoutBtn = document.getElementById("checkout-btn");

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    let totalItems = 0;
    let totalPrice = 0;
    let validItemsHTML = "";

    cart.forEach(cartItem => {
        const product = allProductsCache[cartItem.key];
        if (!product) return; 

        const quantity = cartItem.quantity;
        const lineTotal = product.price * quantity;

        totalItems += quantity;
        totalPrice += lineTotal;

        validItemsHTML += `
            <div class="cart-item" data-key="${cartItem.key}">
                <img class="cart-item-image" src="${product.productImage}" alt="${product.productName}">
                <div class="cart-item-info">
                    <p class="cart-item-name">${product.productName}</p>
                    <p class="cart-item-size">Size: ${product.productSize}</p>
                    <span class="cart-item-price">₦${Number(product.price).toLocaleString()}</span>
                </div>
                <div class="qty-stepper">
                    <button class="qty-btn qty-decrease" onclick="updateQuantity('${cartItem.key}', -1)">-</button>
                    <span class="qty-value">${quantity}</span>
                    <button class="qty-btn qty-increase" onclick="updateQuantity('${cartItem.key}', 1)">+</button>
                </div>
                <p class="cart-item-line-total">₦${lineTotal.toLocaleString()}</p>
                <button class="remove-btn" onclick="removeFromCart('${cartItem.key}')">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        `
    });

    if (totalItems === 0) {
        if (cartList) cartList.innerHTML = "";
        if (emptyState) emptyState.classList.add("show");
        if (checkoutBtn) checkoutBtn.disabled = true;
    } else {
        if (cartList) cartList.innerHTML = validItemsHTML;
        if (emptyState) emptyState.classList.remove("show");
        if (checkoutBtn) checkoutBtn.disabled = false;
    }

    // UPDATE UI COUNTS AND SUMMARIES
    if (cartCountBadge) cartCountBadge.textContent = totalItems;
    if (cartItemSummary) cartItemSummary.textContent = `${totalItems} ${totalItems === 1 ? "item" : "items"}`;
    if (cartSubtotal) cartSubtotal.textContent = `₦${totalPrice.toLocaleString()}`;
    if (cartTotal) cartTotal.textContent = `₦${totalPrice.toLocaleString()}`;
};

// REMOVE FROM CART
const removeFromCart = (key) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.key !== key);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
};
window.removeFromCart = removeFromCart;

// UPDATE QUANTITY
const updateQuantity = (key, num) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const item = cart.find(product => product.key === key);

    if (item) {
        item.quantity += num;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.key !== key);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }
};
window.updateQuantity = updateQuantity;

// REALTIME DATABASE LISTENER
onValue(referenceInDB, (snapshot) => {
    if (snapshot.exists()) {
        allProductsCache = snapshot.val();
    } else {
        allProductsCache = {};
    }
    renderCart();
    console.log(snapshot.val());
    
});
