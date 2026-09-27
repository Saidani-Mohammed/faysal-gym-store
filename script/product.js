// get product id 
const params = new URLSearchParams(window.location.search)
const productId = Number(params.get("id"));

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

// add to cart function
let cart = JSON.parse(localStorage.getItem("cart")) || []
function addToCart(id) {
    const existingProduct = cart.find( (e) => e.id === id);
    if (existingProduct) {
        existingProduct.quantity++
    } else {
        cart.push({
            id : id,
            quantity : 1
        })
    }
    localStorage.setItem("cart", JSON.stringify(cart));
}

// quantity button 
const decreaseBtn = document.getElementById("decrease");
const increaseBtn = document.getElementById("increase");
const quantityEl = document.getElementById("quantity");
let quantity = 1;
increaseBtn.addEventListener("click", () => {
    quantity++;
    quantityEl.textContent = quantity;
});
decreaseBtn.addEventListener("click", () => {
    if (quantity > 1) {
        quantity--;
        quantityEl.textContent = quantity;
    }
});

// products list 
let products = [
    {
        id: 1,
        name: "Whey Protein",
        price: 8500,
        image: "imgs/whey.jpg",
        category: "whey",
        featured: true,
        active : true,
        description : "description here"
    },
    {
        id: 2,
        name: "Creatine",
        price: 7500,
        image: "imgs/creatine.jpg",
        category: "creatine",
        featured: true,
        active : true,
        description : `Creatine Monohydrate

الكرياتين مونوهيدرات من أشهر المكملات الرياضية، ويساعد على دعم الأداء والقوة أثناء التمارين عالية الشدة. مناسب للرياضيين ولاعبي كمال الأجسام والكاليستينيكس الراغبين في تحسين الأداء ودعم بناء الكتلة العضلية مع التدريب المنتظم.

المميزات:

يدعم القوة والأداء أثناء التمرين.
يساعد على تحسين القدرة على أداء الجولات عالية الشدة.
يساهم في دعم نمو الكتلة العضلية مع التدريب والتغذية المناسبة.
سهل الاستخدام ويمكن تناوله يوميً`
    },
    {
        id: 3,
        name: "BCAA",
        price: 4000,
        image: "imgs/bcaa.jpg",
        category: "vitamins",
        featured: true,
        active : true,
        description : "description here"
    },
    {
        id: 4,
        name: "T-shirt",
        price: 2700,
        image: "imgs/shirt.jpg",
        category: "accessories",
        featured: false,
        active : true,
        description : "description here"
    }
]

// Find Product
const productImg = document.getElementById("product-img");
const productName = document.getElementById("product-name");
const productPrice = document.getElementById("product-price");
const productDescription = document.getElementById("product-description");
// const productCategory = document.getElementById("product-category");
const product = products.find((product) => product.id === productId);
if (!product) {
    document.querySelector("main").innerHTML = `
        <h2 style="color:white; text-align:center;">
            Product not found
        </h2>
    `;

    throw new Error("Product not found");
}
productImg.src = product.image;
productImg.alt = product.name;
productName.textContent = product.name;
productPrice.textContent = `${product.price} DA`;
productDescription.textContent = product.description;

let addBtn = document.querySelector(".add-to-cart")
addBtn.addEventListener("click", () => {
    addToCart(productId)
})