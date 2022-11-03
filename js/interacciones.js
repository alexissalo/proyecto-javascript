// variables de apertura y cerrar carrito

const abrirCarrito = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#close-cart");

// abrir carrito

abrirCarrito.onclick = () => {
  cart.classList.add("active");
};

// cerrar carrito

closeCart.onclick = () => {
  cart.classList.remove("active");
};

//variables de abrir y cerrar los filtros

const openFilter = document.querySelector(".open-filter");
const categories = document.querySelector(".filter-menu");

// abrir y cerrar el filtro

openFilter.addEventListener("click", function () {
  this.classList.toggle("active");
  categories.classList.toggle("active");
});
