//Variables globales
const layoutCompra = document.querySelector(".layout-compra");
const DOMcarrito = document.querySelector(".cart-content");
const totalPrice = document.querySelector(".total-price");
let divisa = "$";
let carrito = JSON.parse(localStorage.getItem("carrito"));
const nombre = document.querySelector("#input-nombre"),
  correo = document.querySelector("#input-correo"),
  telefono = document.querySelector("#input-telefono"),
  direccion = document.querySelector("#input-direccion"),
  tarjeta = document.querySelector("#input-tarjeta"),
  titular = document.querySelector("#input-titular"),
  caducidad = document.querySelector("#input-caducidad"),
  CVC = document.querySelector("#input-cvc"),
  submit = document.querySelector("#input-submit");
const layoutFactura = document.querySelector(".layout-factura");

//Constructor de productos de la compra

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
    // Inserto componentes en el DOM
    DOMcarrito.appendChild(boxItemCart);
    boxItemCart.appendChild(imgCart);
    boxItemCart.appendChild(detailBoxCart);
    detailBoxCart.appendChild(nombreItemCart);
    detailBoxCart.appendChild(precioItemCart);
  });
  // Renderizo el precio total en el HTML
  totalPrice.textContent = JSON.parse(localStorage.getItem("total"));
}

//Funcion para recoleccion y construccion de los datos de compra

function guardarDatos() {
  let datosPersonales = {
    nombre: nombre.value,
    correo: correo.value,
    telefono: telefono.value,
    direccion: direccion.value,
  };

  //Guardo los datos en localstorage
  

  localStorage.setItem("personal", JSON.stringify(datosPersonales));

  let datosDeTarjeta = {
    tarjeta: tarjeta.value,
    titular: titular.value,
    caducidad: caducidad.value,
    CVC: CVC.value,
  };

  //Guardo los datos en localstorage

  localStorage.setItem("tarjeta", JSON.stringify(datosDeTarjeta));

  return datosPersonales, datosDeTarjeta;
}

//Funcion para recuperar los datos del localstorage

function recuperarDatos(datosPersonales, datosDeTarjeta) {
  if (datosPersonales && datosDeTarjeta) {
    nombre.value = datosPersonales.nombre;
    correo.value = datosPersonales.correo;
    telefono.value = datosPersonales.telefono;
    direccion.value = datosPersonales.direccion;
    tarjeta.value = datosDeTarjeta.tarjeta;
    titular.value = datosDeTarjeta.titular;
    caducidad.value = datosDeTarjeta.caducidad;
    CVC.value = datosDeTarjeta.CVC;
  }
}

recuperarDatos(
  JSON.parse(localStorage.getItem("personal")),
  JSON.parse(localStorage.getItem("tarjeta"))
);

//Evento para imprimir la factura

submit.addEventListener("click", (e) => {
  e.preventDefault();
  guardarDatos();
  localStorage.removeItem("carrito");
  layoutCompra.classList.add("none");
  layoutFactura.classList.add("active")
  constructorFactura();
});

//Funcion para construir la factura

function constructorFactura() {
  const datos = JSON.parse(localStorage.getItem("personal"));
  const datosTarjeta = JSON.parse(localStorage.getItem("tarjeta"));
  const total=JSON.parse(localStorage.getItem("total"))
  //Construccion de la factura
  //factura
  const factura=document.createElement("div")
  factura.classList.add("factura")
  //Titulo de la factura
  const facturaTitulo = document.createElement("h2");
  facturaTitulo.textContent =
    "Gracias " + `${datos.nombre}` + " por elegirnos!!";
  //mensaje
  const mensaje = document.createElement("p");
  mensaje.textContent = "El pago fue realizado con exito!!";
  //mensaje al correo
  const revisaCorreo = document.createElement("p");
  revisaCorreo.textContent =
    "La orden de pedido y la factura ha sido envida a " + `${datos.correo}`;
  //total de pago
  const totalPago = document.createElement("p");
  totalPago.textContent="El total de la compra es de: "+`${total}`
  //tarjeta
  const tarjeta = document.createElement("p");
  tarjeta.textContent =
    "El pago ha sido realizado con esta tarjeta: Titular: " +
    `${datosTarjeta.titular}` +
    " NRO de tarjeta: " + `${datosTarjeta.tarjeta}`;
  //Link para regresar al principio
  const regresarAlMenu=document.createElement("a")
  regresarAlMenu.textContent="Regresar al Principio"
  regresarAlMenu.setAttribute("href","../index.html")

  //Inserto todo en el Html
  layoutFactura.appendChild(factura)
  factura.appendChild(facturaTitulo);
  factura.appendChild(mensaje);
  factura.appendChild(revisaCorreo);
  factura.appendChild(totalPago)
  factura.appendChild(tarjeta);
  factura.appendChild(regresarAlMenu)
}


//inicializar la construccion del carrito
constructorCarrito();
