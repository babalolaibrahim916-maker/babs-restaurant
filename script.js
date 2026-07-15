const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

sections.forEach((section) => {
    section.classList.add("hidden");
    observer.observe(section);
});

// Back to Top Button

const topBtn = document.getElementById("topBtn");

window.onscroll = function () {
    if (document.documentElement.scrollTop > 300) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
};

topBtn.onclick = function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});
const links = document.querySelectorAll(".nav-links a");

links.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});
const closeMenu = document.querySelector(".close-menu");

closeMenu.addEventListener("click", () => {
    navLinks.classList.remove("active");
});
// Lightbox

const galleryImages = document.querySelectorAll(".gallery-container img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeLightbox = document.querySelector(".close-lightbox");

galleryImages.forEach(img => {
    img.addEventListener("click", () => {
        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
    });
});

closeLightbox.addEventListener("click", () => {
    lightbox.style.display = "none";
});

lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = "none";
    }
});
// ======================
// SHOPPING CART
// ======================

const orderButtons = document.querySelectorAll(".order-btn");
const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");

let total = 0;
let cart = [];

orderButtons.forEach(button => {
    button.addEventListener("click", function(e){

        e.preventDefault();

        const name = this.dataset.name;
        const price = Number(this.dataset.price);

        const existingItem = cart.find(item => item.name === name);

if (existingItem) {
    existingItem.quantity++;
} else {
    cart.push({
        name,
        price,
        quantity: 1
    });
}

        total = cart.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
}, 0);

        updateCart();

    });
});

function updateCart(){

    cartItems.innerHTML = "";

    if(cart.length === 0){
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        totalPrice.textContent = "0";
        return;
    }

    cart.forEach(item =>{

        const div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
    <div>
        <strong>${item.name}</strong>

        <div class="quantity-controls">
            <button class="minus-btn">−</button>

            <span>${item.quantity}</span>

            <button class="plus-btn">+</button>
        </div>
    </div>

    <div>
        ₦${(item.price * item.quantity).toLocaleString()}
    </div>

    <button class="remove-btn">Remove</button>
`;
const plusBtn = div.querySelector(".plus-btn");
const minusBtn = div.querySelector(".minus-btn");

plusBtn.addEventListener("click", () => {

    item.quantity++;

    total = cart.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);

    updateCart();

});

minusBtn.addEventListener("click", () => {

    if(item.quantity > 1){

        item.quantity--;

    }else{

        const index = cart.indexOf(item);

        cart.splice(index,1);

    }

    total = cart.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);

    updateCart();

});
const removeBtn = div.querySelector(".remove-btn");

removeBtn.addEventListener("click", () => {

    total -= item.price;

    const index = cart.indexOf(item);

    cart.splice(index, 1);

    updateCart();

});

        cartItems.appendChild(div);

    });

    totalPrice.textContent = total.toLocaleString();
    localStorage.setItem("cart", JSON.stringify(cart));
}
const savedCart = JSON.parse(localStorage.getItem("cart"));

if(savedCart){

    cart = savedCart;

    total = 0;

    cart.forEach(item=>{
        total += item.price;
    });

    updateCart();

}
const clearCartBtn = document.getElementById("clear-cart-btn");

clearCartBtn.addEventListener("click", () => {

    cart = [];
    total = 0;

    updateCart();

});
const checkoutBtn = document.getElementById("checkout-btn");

checkoutBtn.addEventListener("click", () => {

    if(cart.length === 0){

        alert("Your cart is empty!");

        return;
    }

    alert("🎉 Thank you for your order!\n\nYour food is being prepared.");

    cart = [];
    total = 0;

    updateCart();

});