//Variables globales

let carrito = [];
let productosCargados = [];
const divisa = "$";
const DOMproductos = document.querySelector(".productos");
const DOMcarrito = document.querySelector(".cart-content");
const DOMTotalCarrito = document.querySelector(".total-price");
const DOMVaciarCarrito = document.querySelector(".vaciar-cart");
const finalizarCompra = document.querySelector(".btn-buy");
const inputBuscador = document.querySelector("#buscador");
const categorias = document.querySelector("#categorias");

// /**
//  * Recupera los productos desde la base de datos externa simulada
//  */

const url = "./data/productos.json";
const recuperarProductos = async (URL) => {
  const respuesta = await fetch(URL);
  const productos = await respuesta.json();
  cargarProductos(productos);
};

recuperarProductos(url);

// /**
//  * Carga los productos desde la base de datos externa simulada
//  */

function cargarProductos(productos) {
  productos.forEach((producto) => {
    let articulo = {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      categoria: producto.categoria,
    };
    productosCargados.push(articulo);
  });
  constructorProductos(productosCargados);
}

// /**
//  * Contruye todos los productos guardados en la base de datos
//  */

function constructorProductos(productos) {
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
      //agrega el producto clickeado al carrito
      carrito.push({
        id: info.id,
        imagen: info.imagen,
        nombre: info.nombre,
        precio: info.precio,
      });
      constructorCarrito();
      //notificacion de producto agregado
      toastr.success(
        `${info.nombre}<br>$${info.precio}`,
        `Producto agregado al carrito:<hr>`
      );
      toastr.options = {
        closeButton: true,
        debug: false,
        newestOnTop: false,
        progressBar: true,
        positionClass: "toast-bottom-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "300",
        hideDuration: "1000",
        timeOut: "5000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
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
//  * Buscador de productos
//  */

function buscarProducto(arr, filtro) {
  const filtrado = arr.filter((servicio) => {
    return servicio.nombre.includes(filtro);
  });
  DOMproductos.textContent = "";
  return constructorProductos(filtrado);
}

inputBuscador.addEventListener("keydown", () => {
  buscarProducto(productosCargados, inputBuscador.value.toLowerCase());
});

// /**
//  * Filtro por categoria
//  */

function filtrarProducto(arr, filtro) {
  const filtrado = arr.filter((servicio) => {
    return servicio.categoria.includes(filtro);
  });
  DOMproductos.textContent = "";
  return constructorProductos(filtrado);
}

categorias.addEventListener("change", () => {
  let opcion = categorias.options[categorias.selectedIndex].value;
  if (opcion == "todo") {
    DOMproductos.textContent = "";
    constructorProductos(productosCargados);
  } else {
    filtrarProducto(productosCargados, opcion);
  }
});

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
  // Borro los productos seleccionados
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
  if (carrito.length == 0) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Necesitas al menos agregar un producto al carrito para poder finalizar tu compra!!",
    });
  } else {
    location.href = "../pages/compra.html";
    //guarda los productos comprados en el localstorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
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
constructorCarrito();
