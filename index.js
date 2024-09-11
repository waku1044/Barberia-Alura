import { popup } from "./popups.js";
const $nombre = document.querySelector("#nombre");
const $apellido = document.querySelector("#apellido");
const $email = document.querySelector("#email");
const $telefono = document.querySelector("#telefono");
const $servicio = document.querySelector("#servicio");
const $fecha = document.querySelector("#fecha");
const $horario = document.querySelector("#horario");
const $error_nombre = document.querySelector("[data-error-nombre]");
const $error_apellido = document.querySelector("[data-error-apellido]");
const $error_email = document.querySelector("[data-error-email]");
const $error_telefono = document.querySelector("[data-error-telefono]");
const $error_fecha = document.querySelector("[data-error-fecha]");
const $error_servicio = document.querySelector("[data-error-servicio]");
const $popup = document.querySelector("#popup");
const $botonReservar = document.querySelector("#botonReservar");


let numeroBarberia = prompt("Ingresa el número de la barbería al que le llegara la info del formulario: " + "" + "( codigo de area sin 0 ) + numero: ");

let errores = {};

// Para cerrar menu desplegable
document.addEventListener('DOMContentLoaded', function () {
  var navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  var navbarToggler = document.querySelector('.navbar-toggler');
  var navbarCollapse = document.getElementById('navbarNav');
  
  navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
          if (navbarCollapse.classList.contains('show')) {
              navbarToggler.click(); // Simula un clic en el botón para cerrar el menú
          }
      });
  });
});


$fecha.addEventListener("change", () => {
  ajustarFecha();
});

const datosCita = {
  nombre: "",
  email: "",
  telefono: "",
  servicio: "",
  fecha: "",
  horario: "",
};

let listaHorarios = [
  "8:00 - 8:30",
  "8:30 - 9:00",
  "9:00 - 9:30",
  "9:30 - 10:00",
  "10:00 - 10:30",
  "10:30 - 11:00",
  "11:00 - 11:30",
  "11:30 - 12:00",
  "12:00 - 12:30",
  "12:30 - 13:00",
  "13:00 - 13:30",
  "13:30 - 14:00",
  "14:00 - 14:30",
  "14:30 - 15:00",
  "15:00 - 15:30",
  "15:30 - 16:00",
  "16:30 - 17:00",
  "17:00 - 17:30",
  "17:30 - 18:00",
  "18:00 - 18:30",
  "18:30 - 19:00",
  "19:00 - 19:30",
  "19:30 - 20:00",
];
// Función para ajustar el valor máximo permitido
function ajustarFecha() {
  const valorSeleccionado = new Date(inputFecha.value);
  let diaSemana = valorSeleccionado.getDay();
  console.log(diaSemana);
  $horario.innerHTML = "";
  switch (diaSemana) {
    case 5:
      console.log("Es sabado");
      ListaHorarios(true);
      break;
    case 6:
      let option = document.createElement("option");
      option.innerText = "No puedes seleccionar este día.";
      $horario.appendChild(option);
      break;
    default:
      console.log("No es sabado ni domingo");
      ListaHorarios(false);
      break;
  }
};

function BorrarErrores(){
  $error_nombre.innerHTML = "";
  $error_apellido.innerHTML = "";
  $error_email.innerHTML = "";
  $error_telefono.innerHTML = "";
  $error_fecha.innerHTML = "";
  $error_servicio.innerHTML = "";
}

function ListaHorarios(sabado) {
  if (sabado) {
    for (let i = 0; i < 10; i++) {
      let option = document.createElement("option");
      option.setAttribute("value", listaHorarios[i]);
      option.innerHTML += listaHorarios[i] + " hs";
      $horario.appendChild(option);
    }
  } else {
    listaHorarios.forEach((hora) => {
      let option = document.createElement("option");
      option.setAttribute("value", hora);
      option.innerHTML += hora + " hs";
      $horario.appendChild(option);
    });
  }
}

function esTexto(text) {
  const regex = /^[A-Za-z]+$/;
  if (regex.test(text)) {
    return true;
  } else {
    return false;
  }
}

function esEmail(text) {
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (regex.test(text)) {
    return true;
  } else {
    return false;
  }
}

function esNumeroDeTelefono(number) {
  const regex = /^[0-9]+$/;
  if (regex.test(number)) {
    return true;
  } else {
    return false;
  }
}

function validarCampos() {
  if ($nombre.value === "") {
    errores.nombre = "El campo es obligatorio";
  } else if (!esTexto($nombre.value)) {
    errores.nombre = "El campo solo acepta letras";
  } else {
    datosCita.nombre = $nombre.value;
  }

  if ($apellido.value === "") {
    errores.apellido = "El campo es obligatorio";
  } else if (!esTexto($apellido.value)) {
    errores.apellido = "El campo solo acepta letras";
  } else {
    datosCita.apellido = $apellido.value;
  }

  if ($email.value === "") {
    errores.email = "El campo es obligatorio";
  } else if (!esEmail($email.value)) {
    errores.email = "El email no es valido";
  } else {
    datosCita.email = $email.value;
  }

  if ($telefono.value === "") {
    errores.telefono = "El campo es obligatorio";
  } else if (!esNumeroDeTelefono($telefono.value)) {
    errores.telefono = "El formato no es valido";
  } else {
    datosCita.telefono = $telefono.value;
  }
  return errores;
}

$nombre.addEventListener("change", () => {
  if ($nombre.value === "") {
    errores.nombre = "El campo es obligatorio";
  } else if (!esTexto($nombre.value)) {
    errores.nombre = "El campo solo acepta letras";
  } else {
    errores = {};
    datosCita.nombre = $nombre.value;
  }
});

$apellido.addEventListener("change", () => {
  if ($apellido.value == "") {
    errores.apellido = "El campo es obligatorio";
  } else if (!esTexto($apellido.value)) {
    errores.apellido = "El campo solo acepta letras";
  } else {
    errores = {};
    datosCita.apellido = $apellido.value;
  }
});

$telefono.addEventListener("change", () => {
  if ($telefono.value === "") {
    errores.telefono = "El campo es obligatorio";
  } else if (!esNumeroDeTelefono($telefono.value)) {
    errores.telefono = "El formato no es valido";
  } else {
    errores = {};
    datosCita.telefono = $telefono.value;
  }
});

$email.addEventListener("change", () => {
  if ($email.value === "") {
    errores.email = "El campo es obligatorio";
  } else if (!esEmail($email.value)) {
    errores.email = "El email no es valido";
  } else {
    errores = {};
    datosCita.email = $email.value;
  }
});


function horarioValidoSabado(horario) {
  let horaCierre = 13;
  let minutoCierre = 0;
  let cierreElegido = horario.slice(-5);

  let [hora, minutos] = cierreElegido.split(":");

  if (
    Number(hora.trim()) > horaCierre ||
    (Number(hora.trim()) == horaCierre && Number(minutos.trim()) > minutoCierre)
  ) {
    return false;
  } else {
    return true;
  }
}

$botonReservar.addEventListener("click", (event) => {
  event.preventDefault();
  let error = validarCampos();
  
  BorrarErrores();
  console.log();
  if (Object.keys(error).length > 0) {
    if($servicio.value == "") $error_servicio.innerHTML = "El campo es obligatorio";
    if($fecha.value == "") $error_fecha.innerHTML = "El campo es obligatorio";  
    if (error.nombre) $error_nombre.innerHTML = error.nombre;
    if (error.apellido) $error_apellido.innerHTML = error.apellido;
    if (error.email) $error_email.innerHTML = error.email;
    if (error.telefono) $error_telefono.innerHTML = error.telefono;
    if (error.fecha) $error_fecha.innerHTML = error.fecha;
    alert("Por favor, rellene todos los campos obligatorios");
  }else{
    // let numero = '5493489558201';
    let mensaje = `
    Hola , mi nombre es ${$nombre.value} ${$apellido.value} y mi correo es ${$email.value} .
    Quisiera reservar un turno para el dia ${$fecha.value} a las ${$horario.value}.
    Servicio: ${$servicio.value}.
    `;

    let datos = encodeURIComponent(mensaje);
    
    const enlaceWhatsApp = `https://wa.me/${numeroBarberia}?text=${datos}`;

    // Abrir el enlace en una nueva pestaña
    window.open(enlaceWhatsApp, '_blank');
    console.log('se envio correctamente')
  }
});
// Función para obtener la fecha en formato YYYY-MM-DD
function formatoFecha(fecha) {
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");
  return `${anio}-${mes}-${dia}`;
}

// Obtener la fecha actual
const hoy = new Date();
const hoyFormatted = formatoFecha(hoy);

// Establecer el atributo min del input de fecha
const inputFecha = document.getElementById("fecha");
inputFecha.setAttribute("min", hoyFormatted);

// Evento para verificar la selección
inputFecha.addEventListener("change", ajustarFecha);
