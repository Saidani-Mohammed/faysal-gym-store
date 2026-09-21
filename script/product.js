// =========================
// Get Product ID
// =========================

const params = new URLSearchParams(window.location.search);

const productId = Number(params.get("id"));

// =========================
// Get HTML Elements
// =========================

const productImg = document.getElementById("product-img");
const productName = document.getElementById("product-name");
const productPrice = document.getElementById("product-price");
const productDescription = document.getElementById("product-description");
const productCategory = document.getElementById("product-category");

const minusBtn = document.getElementById("minus");
const plusBtn = document.getElementById("plus");

const quantityElement = document.getElementById("quantity");

const addCartBtn = document.getElementById("add-cart");

// =========================
// Find Product
// =========================

const product = products.find((product) => product.id === productId);

// Stop if product doesn't exist

if (!product) {
    document.querySelector("main").innerHTML = `
        <h2 style="color:white; text-align:center;">
            Product not found
        </h2>
    `;

    throw new Error("Product not found");
}

// =========================
// Render Product
// =========================

productImg.src = product.image;

productImg.alt = product.name;

productName.textContent = product.name;

productPrice.textContent = `${product.price} DA`;

productDescription.textContent = product.description;

// =========================
// Quantity
// =========================

let quantity = 1;

quantityElement.textContent = quantity;

// Increase

plusBtn.addEventListener("click", () => {
    quantity++;

    quantityElement.textContent = quantity;
});

// Decrease

minusBtn.addEventListener("click", () => {
    if (quantity > 1) {
        quantity--;

        quantityElement.textContent = quantity;
    }
});

// =========================
// Add To Cart
// =========================

addCartBtn.addEventListener("click", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            quantity: quantity,
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product added to cart!");
});
