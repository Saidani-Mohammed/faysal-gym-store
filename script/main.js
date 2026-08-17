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