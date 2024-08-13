// Función para obtener la fecha en formato YYYY-MM-DD
function formatoFecha(fecha) {
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    return `${anio}-${mes}-${dia}`;
}

// Obtener la fecha actual
const hoy = new Date();
const hoyFormatted = formatoFecha(hoy);

// Establecer el atributo min del input de fecha
const inputFecha = document.getElementById('fecha');
inputFecha.setAttribute('min', hoyFormatted);

// Función para ajustar el valor máximo permitido
function ajustarFecha() {
    const valorSeleccionado = new Date(inputFecha.value);
    console.log(valorSeleccionado.getDay());
    if (valorSeleccionado.getDay() === 6 ) { // Verifica si es domingo (0 = domingo)
        alert('No puedes seleccionar este día.');
        inputFecha.value = '';
    }
}

// Evento para verificar la selección
inputFecha.addEventListener('change', ajustarFecha);