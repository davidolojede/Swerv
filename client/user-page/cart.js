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
    const cartList = document.querySelector(".cart-items-list")
    cartList.innerHTML = ""

    if (!snapshot.exists()) return

    const allProducts = Object.entries(snapshot.val())
    const cart = JSON.parse(localStorage.getItem("cart")) || []


    let total = 0

    cart.forEach(cartItem => {
        const match = allProducts.find(([key, product]) => key === cartItem.key)

        if (!match) return   // product was deleted from Firebase since being added to cart

        const [key, product] = match
        const lineTotal = product.price * cartItem.quantity
        total += lineTotal

        cartList.innerHTML += `
            <div class="cart-item">
                <img src="${product.productImage}" alt="">
                <p>${product.productName}</p>
                <p>Qty: ${cartItem.quantity}</p>
                <p>₦${lineTotal}</p>
                <button onclick="removeFromCart('${key}')">Remove</button>
            </div>
        `
    })

    document.getElementById("cart-total").innerHTML = total
})
window.onValue = onValue