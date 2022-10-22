//Base de datos  simulada

const productos = [
  {
    id: 1,
    nombre: "pizza muzzarella",
    precio: 700,
    imagen: "../img/pizza-muzarella.png",
    categoria: "pizzas",
  },
  {
    id: 2,
    nombre: "pizza napolitana",
    precio: 750,
    imagen: "../img/pizza-napo.png",
    categoria: "pizzas",
  },
  {
    id: 3,
    nombre: "pizza fugazzeta",
    precio: 780,
    imagen: "../img/pizza-Fugazzeta.png",
    categoria: "pizzas",
  },
  {
    id: 4,
    nombre: "pizza jamon",
    precio: 780,
    imagen: "../img/Pizza-Jamon.png",
    categoria: "pizzas",
  },
  {
    id: 5,
    nombre: "hamburguesa simple",
    precio: 800,
    imagen: "../img/hambur-simple.png",
    categoria: "hamburguesas",
  },
  {
    id: 6,
    nombre: "hamburguesa doble",
    precio: 850,
    imagen: "../img/hambur-doble.png",
    categoria: "hamburguesas",
  },
  {
    id: 7,
    nombre: "hamburguesa criolla",
    precio: 880,
    imagen: "../img/hambur-criolla.png",
    categoria: "hamburguesas",
  },
  {
    id: 8,
    nombre: "hamburguesa gran cheddar",
    precio: 820,
    imagen: "../img/hambur-gran-cheddar.png",
    categoria: "hamburguesas",
  },
  {
    id: 9,
    nombre: "empanada de carne",
    precio: 650,
    imagen: "../img/empanada-carne.png",
    categoria: "empanadas",
  },
  {
    id: 10,
    nombre: "empanada de jamon y queso",
    precio: 650,
    imagen: "../img/Empanada-Jamon-y-Queso.png",
    categoria: "empanadas",
  },
  {
    id: 11,
    nombre: "sanguche de lomo",
    precio: 550,
    imagen: "../img/sanguche-Lomo.png",
    categoria: "sanguches",
  },
  {
    id: 12,
    nombre: "sanguche de milanesa",
    precio: 550,
    imagen: "../img/sanguche-Mila.png",
    categoria: "sanguches",
  },
  {
    id: 13,
    nombre: "sanguche de pollo",
    precio: 550,
    imagen: "../img/sanguche-Pollo.png",
    categoria: "sanguches",
  },
  {
    id: 14,
    nombre: "sanguche vegetariano",
    precio: 500,
    imagen: "../img/sanguche-Vegetal.png",
    categoria: "sanguches",
  },
  {
    id: 15,
    nombre: "papas fritas",
    precio: 400,
    imagen: "../img/papas-fritas.png",
    categoria: "acompañantes",
  },
  {
    id: 16,
    nombre: "papas fritas con cheddad y panceta",
    precio: 450,
    imagen: "../img/papas-con-cheddar-y-bacon.png",
    categoria: "acompañantes",
  },
  {
    id: 17,
    nombre: "ensalada completa",
    precio: 400,
    imagen: "../img/ensalada-completa.png",
    categoria: "acompañantes",
  },
  {
    id: 18,
    nombre: "ensalada caesar",
    precio: 400,
    imagen: "../img/ensalada-caesar.png",
    categoria: "acompañantes",
  },
];

//Variables globales

let carrito = [];
const divisa = "$";
const DOMproductos = document.querySelector(".productos");
const DOMcarrito = document.querySelector(".cart-content");
const DOMTotalCarrito = document.querySelector(".total-price");
const DOMVaciarCarrito = document.querySelector(".vaciar-cart");
const finalizarCompra = document.querySelector(".btn-buy");

// /**
//  * Contruye todos los productos guardados en la base de datos
//  */

function constructorProductos() {
  productos.forEach((info) => {
    // Estructura
    const card = document.createElement("div");
    card.classList.add("card-productos", info.categoria);
    // img-container
    const cardImgContainer = document.createElement("div");
    cardImgContainer.classList.add("img-container");
    // img
    const cardImg = document.createElement("img");
    cardImg.setAttribute("src", info.imagen);
    // info-container
    const infoContainer = document.createElement("div");
    infoContainer.classList.add("info-container");
    // nombre
    const cardNombre = document.createElement("h3");
    cardNombre.textContent = info.nombre;
    cardNombre.classList.add("nombre-producto");
    // precio
    const cardPrecio = document.createElement("p");
    cardPrecio.textContent = `${divisa}${info.precio}`;
    //agregar al carrito
    const cardBoton = document.createElement("button");
    cardBoton.classList.add("add-cart");
    cardBoton.textContent = "Agregar al carrito";
    cardBoton.addEventListener("click", () => {
      carrito.push({
        id: info.id,
        imagen: info.imagen,
        nombre: info.nombre,
        precio: info.precio,
      });
      localStorage.setItem("carrito", JSON.stringify(carrito));
      constructorCarrito();
    });
    // Inserto los componentes
    DOMproductos.appendChild(card);
    card.appendChild(cardImgContainer);
    cardImgContainer.appendChild(cardImg);
    card.appendChild(infoContainer);
    infoContainer.appendChild(cardNombre);
    infoContainer.appendChild(cardPrecio);
    infoContainer.appendChild(cardBoton);
  });
}

// /**
//  * Construye todos los productos guardados en el carrito
//  */
function constructorCarrito() {
  // Vacio todo el html
  DOMcarrito.textContent = "";
  carrito.forEach((item) => {
    // Estructura de cada item del carrito
    //cuerpo
    const boxItemCart = document.createElement("div");
    boxItemCart.classList.add("cart-box");
    //imagen
    const imgCart = document.createElement("img");
    imgCart.classList.add("cart-img");
    imgCart.setAttribute("src", `${item.imagen}`);
    //caja de informacion
    const detailBoxCart = document.createElement("div");
    detailBoxCart.classList.add("detail-box");
    //nombre de producto
    const nombreItemCart = document.createElement("p");
    nombreItemCart.classList.add("cart-product-title");
    nombreItemCart.textContent = `${item.nombre}`;
    //precio de producto
    const precioItemCart = document.createElement("p");
    precioItemCart.classList.add("cart-price");
    precioItemCart.textContent = `${divisa}${item.precio}`;
    //cantidad de producto
    const cantidadItemCart = document.createElement("p");
    cantidadItemCart.classList.add("cart-cantidad");
    // Boton de borrar
    const miBoton = document.createElement("i");
    miBoton.classList.add("bi", "bi-trash", "cart-remove");
    miBoton.dataset.item = item;
    miBoton.addEventListener("click", borrarItemCarrito);
    // Inserto componentes en el DOM
    DOMcarrito.appendChild(boxItemCart);
    boxItemCart.appendChild(imgCart);
    boxItemCart.appendChild(detailBoxCart);
    detailBoxCart.appendChild(nombreItemCart);
    detailBoxCart.appendChild(precioItemCart);
    detailBoxCart.appendChild(cantidadItemCart);
    boxItemCart.appendChild(miBoton);
  });
  // Renderizo el precio total en el HTML
  DOMTotalCarrito.textContent = calcularTotal();
  //Guardo el total en el localstorage
  localStorage.setItem("total", JSON.stringify(calcularTotal()));
  //Actualizo el indicador de productos en el carrito
  const contador = document.querySelector(".contador");
  let contadorNumber = (contador.textContent = carrito.length);
  if (contadorNumber >= 1) {
    contador.classList.add("active");
  } else {
    contador.classList.remove("active");
  }
}

// /**
//  * Evento para borrar un elemento del carrito
//  */
function borrarItemCarrito(evento) {
  // Obtengo el producto ID que hay en el boton pulsado
  const id = evento.target.dataset.item;
  // Borro todos los productos
  const item = carrito.find((productos) => productos.id === id);
  const indice = carrito.indexOf(item);
  carrito.splice(indice, 1);
  // vuelve a construir el carrito
  constructorCarrito();
}

// /**
//  * Calcula el precio total de los productos en el carrito
//  */

function calcularTotal() {
  // Recorro el array del carrito
  return carrito
    .reduce((total, item) => {
      // Los sumo al total
      return total + item.precio;
    }, 0)
    .toFixed(2);
}

// /**
//  * Vacia todo el carrito y vuelve a construirlo
//  */
function vaciarCarrito() {
  // Limpio los productos guardados
  carrito = [];
  localStorage.removeItem("carrito");
  // Renderizo los cambios
  constructorCarrito();
}

///**
//* Termina compra y lo redirige a la seccion de compra
//*/

function terminarCompra() {
  //Verifica si el carrito esta vacio
  if (DOMcarrito.textContent == "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Necesitas al menos agregar un producto al carrito para poder finalizar tu compra!!",
    });
  } else {
    location.href = "../pages/compra.html";
  }
}

// // Eventos

//vacia el carrito
DOMVaciarCarrito.addEventListener("click", vaciarCarrito);
//termina la compra
finalizarCompra.addEventListener("click", terminarCompra);
//guarda los productos agregados al carrito
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    constructorCarrito;
  }
});

// Inicio
constructorProductos();
constructorCarrito();
