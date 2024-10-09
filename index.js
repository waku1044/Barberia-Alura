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
const $error_horario = document.querySelector("[data-error-horario]");
const $botonReservar = document.querySelector("#botonReservar");

// let numeroBarberia = prompt("Ingresa el número de la barbería al que le llegara la info del formulario: " + "" + "( codigo de area sin 0 ) + numero: ");

let errores = {};

// Para cerrar menu desplegable
document.addEventListener("DOMContentLoaded", function () {
  var navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  var navbarToggler = document.querySelector(".navbar-toggler");
  var navbarCollapse = document.getElementById("navbarNav");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (navbarCollapse.classList.contains("show")) {
        navbarToggler.click(); // Simula un clic en el botón para cerrar el menú
      }
    });
  });
});

$fecha.addEventListener("change", () => {
  const diaSeleccionado = new Date($fecha.value).getUTCDay(); // 0 = domingo, 6 = sábado
  $horario.innerHTML = "";
  switch (diaSeleccionado) {
    case 0:
      // $horario.innerHTML = listaHorarios.slice(0, 9).join(", ");
      let msj = document.createElement("option");
      msj.innerHTML = "Cerrado";
      $horario.appendChild(msj);
      console.log("Cerrado");
      break;
    case 6:
      for (let i = 0; i < 10; i++) {
        let option = document.createElement("option");
        option.setAttribute("value", listaHorarios[i]);
        option.innerHTML += listaHorarios[i] + " hs";
        $horario.appendChild(option);
      }
      break;
    default:
      listaHorarios.forEach((hora) => {
        let option = document.createElement("option");
        option.setAttribute("value", hora);
        option.innerHTML += hora + " hs";
        $horario.appendChild(option);
      });
  }
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

// Función para ajustar el valor máximo permitido// Función para ajustar la lista de horarios disponibles
// function ajustarFecha() {
//   const valorSeleccionado = new Date($fecha.value);
//   const hoy = new Date();
//   const horaActual = hoy.getHours();
//   const minutoActual = hoy.getMinutes();

//   // Convertir la fecha seleccionada a UTC
//   const fechaSeleccionadaUTC = new Date(Date.UTC(
//     valorSeleccionado.getUTCFullYear(),
//     valorSeleccionado.getUTCMonth(),
//     valorSeleccionado.getUTCDate()
//   ));

//   // Convertir la fecha actual a UTC
//   const hoyUTC = new Date(Date.UTC(
//     hoy.getUTCFullYear(),
//     hoy.getUTCMonth(),
//     hoy.getUTCDate()
//   ));

//   $horario.innerHTML = "";
//   // console.log(fechaSeleccionadaUTC.getTime() === hoyUTC.getTime());
//   // console.log(fechaSeleccionadaUTC.getTime() , hoyUTC.getTime());
//   if (fechaSeleccionadaUTC.getTime() === hoyUTC.getTime()) {
//     listaHorarios.forEach(hora => {
//       const [horaInicio, minutoInicio] = hora.split(" - ")[0].split(":").map(Number);
//       // console.log(horaInicio, minutoActual);
//       // console.log(horaActual, minutoActual);
//       if (horaInicio > horaActual || (horaInicio === horaActual && minutoInicio >= minutoActual)) {
//         let option = document.createElement("option");
//         option.setAttribute("value", hora);
//         option.innerHTML += hora + " hs";
//         $horario.appendChild(option);
//       }
//     });
//   } else {
//     listaHorarios.forEach(hora => {
//       let option = document.createElement("option");
//       option.setAttribute("value", hora);
//       option.innerHTML += hora + " hs";
//       $horario.appendChild(option);
//     });
//   }
// }

function BorrarErrores() {
  $error_nombre.innerHTML = "";
  $error_apellido.innerHTML = "";
  $error_email.innerHTML = "";
  $error_telefono.innerHTML = "";
  $error_fecha.innerHTML = "";
  $error_servicio.innerHTML = "";
  $error_horario.innerHTML = "";
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
  BorrarErrores();
  console.log($servicio.value === "");
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
    errores.telefono = "Solo Numeros";
  } else {
    datosCita.telefono = $telefono.value;
  }
  if ($servicio.value === "") {
    errores.servicio = "El campo es obligatorio";
  } else {
    
    datosCita.servicio = $servicio.value;
  }
  if ($fecha.value === "") {
    errores.fecha = "El campo es obligatorio";
  } else {
   
    datosCita.fecha = $fecha.value;
  }
  if($horario.value === "Cerrado"){
    errores.horario = "En este dia la barberia no se encuentra cerrada";
  }else{
    datosCita.horario = $horario.value;
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

// $horario.addEventListener("change", () => {
//   if (!$horario.value === "Cerrado") {
//     errores.horario = "";
//     errores = {};
//     datosCita.horario = $horario.value;
//   }
// });

$fecha.addEventListener("change", () => {
  if ($fecha.value === "") {
    errores.fecha = "El campo es obligatorio";
  } else {
    errores = {};
    datosCita.fecha = $fecha.value;
  }
});

$servicio.addEventListener("change", () => {
  if ($servicio.value === "") {
    errores.servicio = "El campo es obligatorio";
  } else {
    errores = {};
    datosCita.servicio = $servicio.value;
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
    errores.telefono = "Solo numeros";
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

$botonReservar.addEventListener("click", (event) => {
  event.preventDefault();

  let error = validarCampos();

  console.log(error.servicio, error.fecha);
  if (Object.keys(error).length > 0) {
    if (error.servicio) $error_servicio.innerHTML = error.servicio;
    if (error.fecha) $error_fecha.innerHTML = error.fecha;
    if (error.nombre) $error_nombre.innerHTML = error.nombre;
    if (error.apellido) $error_apellido.innerHTML = error.apellido;
    if (error.email) $error_email.innerHTML = error.email;
    if (error.telefono) $error_telefono.innerHTML = error.telefono;
    if(error.horario) $error_horario.innerHTML = error.horario;
  } else {
    let numero = "+5493489558201";
    let mensaje = `
    Esta reserva fue realizada el dia: ${hoyFormatted} a las ${horaActual}
    Hola , mi nombre es ${$nombre.value} ${$apellido.value} y mi correo es ${$email.value} .
    Quisiera reservar un turno para el dia ${$fecha.value} a las ${$horario.value}.
    Servicio: ${$servicio.value}.
    
    `;

    let datos = encodeURIComponent(mensaje);

    const enlaceWhatsApp = `https://wa.me/${numero}?text=${datos}`;

    // Abrir el enlace en una nueva pestaña
    window.open(enlaceWhatsApp, "_blank");
    // alert('Se envio correctamente')
  }
});
// Función para obtener la fecha en formato YYYY-MM-DD
function formatoFecha(fecha) {
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");
  return `${anio}-${mes}-${dia}`;
}

// Crear un nuevo objeto Date con la fecha y hora actuales
const ahora = new Date();

// Obtener la hora actual
const horas = ahora.getHours();
const minutos = ahora.getMinutes();
const segundos = ahora.getSeconds();

// Mostrar la hora en formato HH:MM:SS
const horaActual = `${horas.toString().padStart(2, "0")}:${minutos
  .toString()
  .padStart(2, "0")}`;

// console.log("La hora actual es:", horaActual);

// Obtener la fecha actual
const hoy = new Date();
const hoyFormatted = formatoFecha(hoy);

// Establecer el atributo min del input de fecha
const inputFecha = document.getElementById("fecha");
inputFecha.setAttribute("min", hoyFormatted);

// Evento para verificar la selección
inputFecha.addEventListener("change", ajustarFecha);
