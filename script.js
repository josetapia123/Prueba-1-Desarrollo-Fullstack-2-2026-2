function cambiarVista(idVistaMostrar, idBotonActivar) {
    // PASO 1: Ocultar absolutamente todas las vistas
    document.getElementById('vista-cliente').classList.add('d-none');
    document.getElementById('vista-director').classList.add('d-none');
    document.getElementById('vista-especialista').classList.add('d-none');
    document.getElementById('vista-admin').classList.add('d-none');

    // PASO 2: Mostrar únicamente la vista que nos pidieron
    document.getElementById(idVistaMostrar).classList.remove('d-none');

    // PASO 3: Quitar el color azul (active) de todos los botones
    document.getElementById('btn-cliente').classList.remove('active');
    document.getElementById('btn-director').classList.remove('active');
    document.getElementById('btn-especialista').classList.remove('active');
    document.getElementById('btn-admin').classList.remove('active');

    // PASO 4: Pintar de azul (active) solo el botón que se acaba de presionar
    document.getElementById(idBotonActivar).classList.add('active');
}


// -------------------- DATOS --------------------
const proyectos = [
    { codigo: "PR001", nombre: "Campaña Social Media TechStore", cliente: "TechStore S.A.", tipo: "Redes Sociales", presupuesto: 12000000, inicio: "2026-01-15", fin: "2026-03-15", estado: "En ejecución" },
    { codigo: "PR002", nombre: "Branding ModaHoy", cliente: "ModaHoy", tipo: "Branding", presupuesto: 8500000, inicio: "2026-02-01", fin: "2026-04-30", estado: "Planificado" },
    { codigo: "PR003", nombre: "Campaña PPC Alimentos Sanos", cliente: "Alimentos Sanos", tipo: "Publicidad", presupuesto: 5000000, inicio: "2026-01-10", fin: "2026-06-30", estado: "En ejecución" },
    { codigo: "PR004", nombre: "Estrategia de Contenido Turismo Sur", cliente: "Turismo Sur", tipo: "Contenido", presupuesto: 15000000, inicio: "2026-03-01", fin: "2026-08-31", estado: "Planificado" }
];

// Mapea cada estado a una clase de badge de Bootstrap
function getBadgeClase(estado) {
    switch (estado) {
        case "En ejecución": return "bg-primary";
        case "Planificado": return "bg-warning text-dark";
        case "En revisión": return "bg-info text-dark";
        case "Entregado": return "bg-success";
        case "Cancelado": return "bg-danger";
        default: return "bg-secondary";
    }
}

// Formatea número como CLP
function formatearCLP(valor) {
    return valor.toLocaleString("es-CL");
}

// Renderiza la tabla y las tarjetas resumen del director
function renderVistaDirector(filtro = "todos") {
    const tbody = document.getElementById("tabla-proyectos-director");
    tbody.innerHTML = "";

    const listaFiltrada = filtro === "todos"
        ? proyectos
        : proyectos.filter(p => p.estado === filtro);

    listaFiltrada.forEach(p => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${p.codigo}</td>
            <td>${p.nombre}</td>
            <td>${p.cliente}</td>
            <td>${p.tipo}</td>
            <td>$${formatearCLP(p.presupuesto)}</td>
            <td>${p.inicio}</td>
            <td>${p.fin}</td>
            <td><span class="badge ${getBadgeClase(p.estado)}">${p.estado}</span></td>
        `;
        tbody.appendChild(fila);
    });

    // Actualizar tarjetas de resumen (siempre con el total, no el filtrado)
    document.getElementById("stat-activos").textContent =
        proyectos.filter(p => p.estado === "En ejecución").length;
    document.getElementById("stat-planificados").textContent =
        proyectos.filter(p => p.estado === "Planificado").length;
    document.getElementById("stat-retrasados").textContent =
        proyectos.filter(p => p.estado === "Cancelado").length; // ajustar lógica de "retraso" luego
    document.getElementById("stat-presupuesto").textContent =
        "$" + formatearCLP(proyectos.reduce((acc, p) => acc + p.presupuesto, 0));
}

// Evento del filtro
document.addEventListener("DOMContentLoaded", () => {
    const filtro = document.getElementById("filtro-estado");
    if (filtro) {
        filtro.addEventListener("change", (e) => renderVistaDirector(e.target.value));
    }
    renderVistaDirector();
});
