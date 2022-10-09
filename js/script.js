//variables

const productos = [
  {
    nombre: "pizza muzzarella",
    precio: 700,
    categoria: "pizzas",
  },
  {
    nombre: "pizza napolitana",
    precio: 750,
    categoria: "pizzas",
  },
  {
    nombre: "pizza fugazzeta",
    precio: 780,
    categoria: "pizzas",
  },
  {
    nombre: "pizza jamon",
    precio: 780,
    categoria: "pizzas",
  },
  {
    nombre: "hamburguesa clasica",
    precio: 800,
    categoria: "hamburguesas",
  },
  {
    nombre: "hamburguesa doble",
    precio: 850,
    categoria: "hamburguesas",
  },
  {
    nombre: "hamburguesa triple",
    precio: 880,
    categoria: "hamburguesas",
  },
  {
    nombre: "hamburguesa americana",
    precio: 820,
    categoria: "hamburguesas",
  },
  {
    nombre: "empanada de carne",
    precio: 650,
    categoria: "empanadas",
  },
  {
    nombre: "empanada de jamon y queso",
    precio: 650,
    categoria: "empanadas",
  },
  {
    nombre: "empanada de pollo",
    precio: 650,
    categoria: "empanadas",
  },
];

let carrito = [];

// inicio sesion

let usuario = prompt("Ingresa un nombre de usuario");
let contraseña = prompt("Ingresa una contraseña");

function login() {
  if ((usuario && contraseña == "") || (usuario && contraseña == undefined)) {
    alert("Debes introducir al menos un caracter");
  }
  alert("Reingresa tu contraseña para iniciar sesion");
  for (let i = 0; i < 3; i++) {
    let recontraseña = prompt("Reingresa tu contraseña");
    if (recontraseña == contraseña) {
      alert("Bienvenido/a " + usuario + " a MANJARES\n\nAca encontraras las mejores comidas como pizzas,hamburguesas,empanadas!!!");
      break;
    } else {
      alert("Fallaste tienes 3 intentos");
    }
  }
}

login();

//buscador de productos y añadir producto

function buscarAñadirProducto(productos) {
  let filtro = prompt("Ingresa el producto que buscas").toLowerCase();
  const encontrado = productos.find((el) => {
    return el.nombre.includes(filtro);
  });
  console.log(encontrado);
  let agregar = prompt("Agregar el producto al carrito?-si o no").toLowerCase();
  if (agregar == "si") {
    carrito.push(encontrado);
    let sumarProducto = prompt(
      "Queres seguir agregando productos?-si o no"
    ).toLowerCase();
    if (sumarProducto == "si") {
      buscarAñadirProducto(productos);
    }
  } else if (agregar == "no") {
    buscarAñadirProducto(productos);
  } else {
    console.log("Respuesta incorrecta");
  }
}

buscarAñadirProducto(productos);

//funcion para obtener datos personales

const persona = () => {
  const datosPersonal = new datosPersonales(
    prompt("Ingresa tu Nombre"),
    prompt("Ingresa tu correo"),
    prompt("Ingresa tu telefono")
  );
  function datosPersonales(nombre, correo, telefono) {
    this.nombre = nombre;
    this.correo = correo;
    this.telefono = telefono;
  }
  return datosPersonal;
};

//funcion para obtener datos de compra

const compra = () => {
  const datosCompra = new datosDeCompra(
    prompt("Ingresa el nombre de titular"),
    prompt("Ingresa el numero de tarjeta"),
    prompt("Ingresa el codigo de verificacion")
  );
  function datosDeCompra(titular, tarjeta, CVV) {
    this.titular = titular;
    this.tarjeta = tarjeta;
    this.CVV = CVV;
  }

  return datosCompra;
};

//calcular total compra

const totalCompra = carrito.reduce((acc, el) => {
  return acc + el.precio;
}, 0);

function terminarCompra() {
  console.log("El carrito esta constituido por estos productos:", carrito);
  console.log("El total de compra es de:$", totalCompra);
  alert("Completa estos ultimos pasos para finalizar tu compra!!");
  alert("Introduce tus datos personales");
  console.log("Tus datos personales son:", persona());
  alert("Introduce tus datos de compra");
  console.log("Tus datos de compra son:", compra());
  alert("Felicidades " + usuario + " por tu compra!!");
}

terminarCompra();
