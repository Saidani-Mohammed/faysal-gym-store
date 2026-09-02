// menu bar function 
let menuBtn = document.querySelector(".fa-bars")
let menu = document.querySelector(".menu")

menuBtn.addEventListener("click", () => {
    menu.classList.toggle("active")
})

let cartBtn = document.querySelector("header .cart")
cartBtn.addEventListener("click", function () {
    window.location.href = `cart.html`
})

let products = [
    {
        id: 1,
        name: "Whey Protein",
        price: 8500,
        image: "imgs/whey.jpg",
        category: "whey",
        featured: true
    },
    {
        id: 2,
        name: "Creatine",
        price: 7500,
        image: "imgs/creatine.jpg",
        category: "creatine",
        featured: true
    },
    {
        id: 3,
        name: "BCAA",
        price: 4000,
        image: "imgs/bcaa.jpg",
        category: "vitamins",
        featured: true
    },
    {
        id: 4,
        name: "T-shirt",
        price: 2700,
        image: "imgs/shirt.jpg",
        category: "accessories",
        featured: false
    }
]

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cartItems");
const subtotalElement = document.getElementById("subtotal");
const deliveryElement = document.getElementById("delivery");
const totalElement = document.getElementById("total");

function saveCart() {
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
}

function displayCart() {
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;
        updateSummary();
        return;
    }

    cart.forEach(item => {
        const product = products.find(
            product => product.id === item.id
        );

        if (!product) return;

        cartItems.innerHTML += `
            <div class="cart-item" data-id="${product.id}">
                <div class="cart-image">
                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >
                </div>
                <div class="cart-info">
                    <h3>
                        ${product.name}
                    </h3>
                    <p class="cart-price">
                        ${product.price} DA
                    </p>
                    <div class="cart-actions">
                        <div class="quantity">
                            <button class="decrease">
                                −
                            </button>
                            <span>
                                ${item.quantity}
                            </span>
                            <button class="increase">
                                +
                            </button>
                        </div>
                        <button class="remove-btn">
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    updateSummary();
}

cartItems.addEventListener("click", (e) => {

    const cartItem = e.target.closest(".cart-item");
    if (!cartItem) return;

    const id = Number(cartItem.dataset.id);

    if (e.target.closest(".increase")) {
        increaseQuantity(id);
        return;
    }

    if (e.target.closest(".decrease")) {
        decreaseQuantity(id);
        return;
    }


    if (e.target.closest(".remove-btn")) {
        removeFromCart(id);
        return;
    }
});



function increaseQuantity(id) {

    const item = cart.find(
        item => item.id === id
    );

    if (!item) return;
    item.quantity++;
    saveCart();
    displayCart();
}

function decreaseQuantity(id) {
    const item = cart.find(
        item => item.id === id
    );
    if (!item) return;

    if (item.quantity > 1) {
        item.quantity--;
    }

    saveCart();
    displayCart();
}



function removeFromCart(id) {
    cart = cart.filter(
        item => item.id !== id
    );

    saveCart();
    displayCart();
}



function updateSummary() {
    let total = 0;
    cart.forEach(item => {
        const product = products.find(
            product => product.id === item.id
        );
        if (!product) return;
        total += product.price * item.quantity;
    });

    totalElement.textContent = `${total} DA`;
}

displayCart();

// checkout message btn 

let checkoutBtn = document.querySelector(".checkout-btn")

checkoutBtn.addEventListener("click", () => {
    const phone = "213778962950";
    let total = 0
    let message = `اريد رفع طلب جديد\n`;
    message += `منتجاتي :\n`;
    cart.forEach(item => {
        const product = products.find(
            product => product.id === item.id
        );
        if (!product) return;
        total += product.price * item.quantity
        message += `- ${product.name} x${item.quantity} - ${product.price * item.quantity} DA\n`;
    });
    console.log(total)

    message += `السعر بدون توصيل: ${total} DA\n`;
    message += `
    معلومات التوصيل : \n
    الاسم و اللقب : 
    رقم الهاتف :
    الولاية : 
    البلدية : 
    نوع التوصيل :
    `
    const url =
        "https://wa" + ".me/" +
        phone +
        "?text=" +
        encodeURIComponent(message);
    window.open(url, "_blank");
});