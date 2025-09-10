// Clave para localStorage
const STORAGE_KEY = "calificaciones_estudiante";

// Estado inicial
let calificaciones = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// Referencias al DOM
const form = document.getElementById("formCalificacion");
const inputNota = document.getElementById("nota");
const listaEl = document.getElementById("listaCalificaciones");
const promedioEl = document.getElementById("promedio");
const btnLimpiar = document.getElementById("btnLimpiar");

// Función: guardar en localStorage
function guardarCalificaciones() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(calificaciones));
}

// Función: renderizar lista y promedio
function renderizar() {
  // lista
  listaEl.innerHTML = "";
  calificaciones.forEach((nota, i) => {
    const li = document.createElement("li");
    li.textContent = `Calificación ${i + 1}: ${nota}`;
    listaEl.appendChild(li);
  });

  // promedio
  if (calificaciones.length > 0) {
    const promedio =
      calificaciones.reduce((a, b) => a + b, 0) / calificaciones.length;
    promedioEl.textContent = `Promedio: ${promedio.toFixed(2)}`;
  } else {
    promedioEl.textContent = "Promedio: -";
  }
}

// Evento: agregar calificación
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const valor = Number(inputNota.value);
  if (!isNaN(valor) && valor >= 0) {
    calificaciones.push(valor);
    guardarCalificaciones();
    renderizar();
    form.reset();
  }
});

// Evento: limpiar
btnLimpiar.addEventListener("click", () => {
  calificaciones = [];
  guardarCalificaciones();
  renderizar();
});

// Inicializar al cargar
renderizar();
