
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

