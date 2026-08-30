const allProducts = JSON.parse(localStorage.getItem("productStorage")) || []
const optionAll = document.getElementById("all-list")
const optionEveryday = document.getElementById("everyday-list")
const optionTraining = document.getElementById("training-list")
const optionCorporate = document.getElementById("corporate-list")

// ALL PRODUCTS SECTION
optionAll.innerHTML = ""
for (let index = 0; index < allProducts.length; index++) {
    const product = allProducts[index]

    if (product.isActive !== false) {
        optionAll.innerHTML += `
            <div class="product">
                        <div class="like">
                            <div title="Like" class="heart-container">
                                <input id="Give-It-An-Id" class="checkbox" type="checkbox">
                                <div class="svg-container">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="svg-outline" viewBox="0 0 24 24">
                                        <path
                                            d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z">
                                        </path>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="svg-filled" viewBox="0 0 24 24">
                                        <path
                                            d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z">
                                        </path>
                                    </svg>
                                </div>
                            </div>
                        </div>
    
                        <div class="img-container">
                            <img class="product-image" src="${product.productImage}" alt="">
                        </div>
    
                        <div class="bottom-detail">
                            <span class="detail-container">
                                <p class="product-name">${product.productName}</p>
                                <small id="price"> $${product.price}</small>
                                <small id="size">Size - ${product.productSize}</small>
                            </span>
    
                            <i class="bi bi-handbag-fill add-to-cart-icon"></i>
                        </div>
                    </div>
    `
    }
}

// EVERYDAY SECTION
optionEveryday.innerHTML = ""
for (let index = 0; index < allProducts.length; index++) {
    const product = allProducts[index]

    if (product.category == "everyday") {
        optionEveryday.innerHTML += `
            <div class="product">
                        <div class="like">
                            <div title="Like" class="heart-container">
                                <input id="Give-It-An-Id" class="checkbox" type="checkbox">
                                <div class="svg-container">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="svg-outline" viewBox="0 0 24 24">
                                        <path
                                            d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z">
                                        </path>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="svg-filled" viewBox="0 0 24 24">
                                        <path
                                            d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z">
                                        </path>
                                    </svg>
                                </div>
                            </div>
                        </div>
    
                        <div class="img-container">
                            <img class="product-image" src="${product.productImage}" alt="">
                        </div>
    
                        <div class="bottom-detail">
                            <span class="detail-container">
                                <p class="product-name">${product.productName}</p>
                                <small id="price"> $${product.price}</small>
                                <small id="size">Size - ${product.productSize}</small>
                            </span>
    
                            <i class="bi bi-handbag-fill add-to-cart-icon"></i>
                        </div>
                    </div>
    `
    }
}


// TRAINING SECTION
optionTraining.innerHTML = ""
for (let index = 0; index < allProducts.length; index++) {
    const product = allProducts[index]

    if (product.category == "training") {
        optionTraining.innerHTML += `
            <div class="product">
                        <div class="like">
                            <div title="Like" class="heart-container">
                                <input id="Give-It-An-Id" class="checkbox" type="checkbox">
                                <div class="svg-container">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="svg-outline" viewBox="0 0 24 24">
                                        <path
                                            d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z">
                                        </path>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="svg-filled" viewBox="0 0 24 24">
                                        <path
                                            d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z">
                                        </path>
                                    </svg>
                                </div>
                            </div>
                        </div>
    
                        <div class="img-container">
                            <img class="product-image" src="${product.productImage}" alt="">
                        </div>
    
                        <div class="bottom-detail">
                            <span class="detail-container">
                                <p class="product-name">${product.productName}</p>
                                <small id="price"> $${product.price}</small>
                                <small id="size">Size - ${product.productSize}</small>
                            </span>
    
                            <i class="bi bi-handbag-fill add-to-cart-icon"></i>
                        </div>
                    </div>
    `
    }
}


// CORPORATE SECTION
optionCorporate.innerHTML = ""
for (let index = 0; index < allProducts.length; index++) {
    const product = allProducts[index]

    if (product.category == "corporate") {
        optionCorporate.innerHTML += `
            <div class="product">
                        <div class="like">
                            <div title="Like" class="heart-container">
                                <input id="Give-It-An-Id" class="checkbox" type="checkbox">
                                <div class="svg-container">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="svg-outline" viewBox="0 0 24 24">
                                        <path
                                            d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z">
                                        </path>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="svg-filled" viewBox="0 0 24 24">
                                        <path
                                            d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z">
                                        </path>
                                    </svg>
                                </div>
                            </div>
                        </div>
    
                        <div class="img-container">
                            <img class="product-image" src="${product.productImage}" alt="">
                        </div>
    
                        <div class="bottom-detail">
                            <span class="detail-container">
                                <p class="product-name">${product.productName}</p>
                                <small id="price"> $${product.price}</small>
                                <small id="size">Size - ${product.productSize}</small>
                            </span>
    
                            <i class="bi bi-handbag-fill add-to-cart-icon"></i>
                        </div>
                    </div>
    `
    }
}
