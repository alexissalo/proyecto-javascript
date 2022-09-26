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
      alert("Bienvenido/a " + usuario);
      break;
    } else {
      alert("Fallaste tienes 3 intentos");
    }
  }
}

login();

let catalogo = prompt(
  "Este es el catalogo de juegos disponibles\n1-GTA\n2-Call of Duty\n3-Fifa\n4-God Of War\n5-PES\n6-Mortal Kombat\n\nIngresa un numero del 1 al 6 para elegir tu juego favorito!!"
);

function micatalogo() {
  let precio;
  let juego;
  switch (catalogo) {
    case "1":
      juego = "GTA";
      precio = "$10";
      break;
    case "2":
      juego = "Call of Duty";
      precio = "$7";
      break;
    case "3":
      juego = "Fifa";
      precio = "$12";
      break;
    case "4":
      juego = "God Of War";
      precio = "$15";
      break;
    case "5":
      juego = "PES";
      precio = "$5";
      break;
    case "6":
      juego = "Mortal Kombat";
      precio = "$11";
      break;
    default:
      alert("Opcion Incorrecta");
      break;
  }
  return juego + " " + precio;
}

function compra() {
  alert("Agregaste al carrito: "+micatalogo())
  alert("Ingresa los datos de compra")
  let titular = prompt("Ingresa nombre de titular");
  let telefono = prompt("Ingresa un numero de telefono");
  let tarjeta = prompt("Ingresa un numero de tarjeta");
  if ((titular && telefono && tarjeta == "") ||(titular && telefono && tarjeta == undefined)) {
    alert("Ingresa correctamente los datos!!");
  }
  let tusDatos = prompt("Tu compra es: " +micatalogo() +"\n\nVerifica tus datos de compra\nTitular:" +titular +"  " +"Telefono:" +telefono +"  " +"Tarjeta:" +tarjeta +"\n\nPara confirmar compra presiona [1] para cancelar presiona [0]");
  if (tusDatos == "1") {
    alert("Felicidades " + usuario + " por la compra realizada");
  } else if (tusDatos == "0") {
    alert("Cancelaste la Compra");
  } else {
    alert("Opcion incorrecta");
  }
}

compra();
