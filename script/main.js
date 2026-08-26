// menu bar function 
let menuBtn = document.querySelector(".fa-bars")
let menu = document.querySelector(".menu")

menuBtn.addEventListener("click", () => {
    menu.classList.toggle("active")
})

// slider function
let slides = document.querySelectorAll(".slide")
let dots = document.querySelectorAll(".dot")
let slider = document.querySelector(".slider")
let currentSlide = 0

function showSlide (index) {
    slides.forEach((e) => {
        e.classList.remove("active")
    })
    dots.forEach((e) => {
        e.classList.remove("active")
    })
    slides[index].classList.add("active");
    dots[index].classList.add("active");
    currentSlide = index;
}

setInterval(() => {
    showSlide(currentSlide);
    currentSlide++
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }
}, 5000);

let startX = 0;
slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

slider.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const difference = startX - endX;
    if (difference > 50) {
        currentSlide--
        if (currentSlide < 0){
            currentSlide = slides.length - 1
        }
        showSlide(currentSlide)
    }
    if (difference < -50) {
        currentSlide++
        if (currentSlide >= slides.length){
            currentSlide = 0
        }
        showSlide(currentSlide)
    }
});

// start featured product page

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

let featuredP = products.filter( (e) => {
    return e.featured === true
})
let container = document.querySelector(".fea-p")

featuredP.forEach( (e) => {
    container.innerHTML += `
    <div class="product" data-id="${e.id}">
    <img src="${e.image}" alt="">
    <h4>${e.name}</h4>
    <p>${e.price}</p>
    <button class="add-to-cart">Add to Cart</button>
    </div>
    `
})

// start product event click 

container.addEventListener("click", (e) => {
    let addBtn = e.target.closest(".add-to-cart")
    if (addBtn){
        let pCard = addBtn.closest(".product")
        let pId = Number(pCard.dataset.id)
        addToCart(id)                            // add to cart function
        return
    }
    let pCard = e.target.closest(".product")
    if (!pCard) return
    let pId = pCard.dataset.id
    window.location.href = `product.html?id=${pId}`
})