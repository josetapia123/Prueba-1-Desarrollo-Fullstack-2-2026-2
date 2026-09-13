// ================== CAMBIO DE VISTA ==================
function cambiarVista(idVistaMostrar, idBotonActivar) {
    document.getElementById('vista-cliente').classList.add('d-none');
    document.getElementById('vista-director').classList.add('d-none');
    document.getElementById('vista-especialista').classList.add('d-none');
    document.getElementById('vista-admin').classList.add('d-none');

    document.getElementById(idVistaMostrar).classList.remove('d-none');

    document.getElementById('btn-cliente').classList.remove('active');
    document.getElementById('btn-director').classList.remove('active');
    document.getElementById('btn-especialista').classList.remove('active');
    document.getElementById('btn-admin').classList.remove('active');
    document.getElementById(idBotonActivar).classList.add('active');
}

// ================== DATOS EN MEMORIA (ARRAYS, SIN BASE DE DATOS) ==================

const proyectos = [
    { codigo: "PR001", nombre: "Campaña Social Media TechStore", cliente: "TechStore S.A.", presupuesto: 12000000, fin: "2026-03-15", estado: "En ejecución" },
    { codigo: "PR002", nombre: "Branding ModaHoy", cliente: "ModaHoy", presupuesto: 8500000, fin: "2026-04-30", estado: "Planificado" },
    { codigo: "PR003", nombre: "Campaña PPC Alimentos Sanos", cliente: "Alimentos Sanos", presupuesto: 5000000, fin: "2026-06-30", estado: "En ejecución" },
    { codigo: "PR004", nombre: "Estrategia de Contenido Turismo Sur", cliente: "Turismo Sur", presupuesto: 15000000, fin: "2026-08-31", estado: "Planificado" }
];

const especialistas = ["Ana Pérez", "Carlos Soto", "María Rojas", "Jorge Díaz"];

const VALOR_HORA_PROMEDIO = 25000;

const tareas = [];         // aquí se van guardando las tareas que asigna el Director
const registrosHoras = []; // aquí se van guardando las horas que registra cada Especialista

// ================== FUNCIÓN QUE CALCULA EL COSTO DE UN PROYECTO ==================
function calcularCostoProyecto(codigoProyecto) {
    let costo = 0;

    for (let i = 0; i < registrosHoras.length; i++) {
        if (registrosHoras[i].proyecto === codigoProyecto) {
            costo = costo + (registrosHoras[i].horas * VALOR_HORA_PROMEDIO);
        }
    }

    return costo;
}

// ================== MOSTRAR: VISTA CLIENTE ==================
function mostrarCliente() {
    const contenedor = document.getElementById('lista-campanas-cliente');
    const filtro = document.getElementById('filtro-cliente').value;

    contenedor.innerHTML = "";

    for (let i = 0; i < proyectos.length; i++) {
        const p = proyectos[i];

        if (filtro === "todos" || filtro === p.cliente) {
            contenedor.innerHTML += `
                <div class="col-md-6 mb-3">
                    <div class="card p-3 shadow-sm h-100">
                        <h6 class="fw-bold">${p.nombre}</h6>
                        <p class="mb-1 text-muted">${p.cliente}</p>
                        <p class="mb-0">Estado: <strong>${p.estado}</strong></p>
                    </div>
                </div>
            `;
        }
    }
}

// ================== LLENAR LOS SELECT (se hace una sola vez al cargar la página) ==================
function llenarSelects() {
    let opcionesProyectos = "";
    for (let i = 0; i < proyectos.length; i++) {
        opcionesProyectos += `<option value="${proyectos[i].codigo}">${proyectos[i].codigo} - ${proyectos[i].nombre}</option>`;
    }

    let opcionesEspecialistas = "";
    for (let i = 0; i < especialistas.length; i++) {
        opcionesEspecialistas += `<option value="${especialistas[i]}">${especialistas[i]}</option>`;
    }

    document.getElementById('select-proyecto-tarea').innerHTML = opcionesProyectos;
    document.getElementById('select-especialista-tarea').innerHTML = opcionesEspecialistas;
    document.getElementById('select-proyecto-horas').innerHTML = opcionesProyectos;
}

// ================== ACCIÓN: ASIGNAR TAREA (Director) ==================
function asignarTarea() {
    const proyecto = document.getElementById('select-proyecto-tarea').value;
    const especialista = document.getElementById('select-especialista-tarea').value;
    const descripcion = document.getElementById('input-tarea').value.trim();

    if (descripcion === "") {
        alert("Escribe una descripción para la tarea.");
        return;
    }

    tareas.push({ proyecto: proyecto, especialista: especialista, descripcion: descripcion, estado: "Pendiente" });

    document.getElementById('input-tarea').value = "";

    mostrarDirector();
    mostrarEspecialista();
}

// ================== MOSTRAR: VISTA DIRECTOR ==================
function mostrarDirector() {
    // --- Carga de trabajo por especialista ---
    const cargaContenedor = document.getElementById('carga-especialistas');
    cargaContenedor.innerHTML = "";

    for (let i = 0; i < especialistas.length; i++) {
        const nombre = especialistas[i];

        let cantidad = 0;
        for (let j = 0; j < tareas.length; j++) {
            if (tareas[j].especialista === nombre) {
                cantidad = cantidad + 1;
            }
        }

        let colorBorde = "border-secondary";
        let colorTexto = "text-dark";
        if (cantidad > 3) {
            colorBorde = "border-danger";
            colorTexto = "text-danger";
        }

        cargaContenedor.innerHTML += `
            <div class="col-md-3 col-6 mb-2">
                <div class="card p-2 text-center shadow-sm ${colorBorde}">
                    <small>${nombre}</small>
                    <span class="fw-bold ${colorTexto}">${cantidad} tarea(s)</span>
                </div>
            </div>
        `;
    }

    // --- Lista de tareas asignadas ---
    const listaContenedor = document.getElementById('lista-tareas');
    listaContenedor.innerHTML = "";

    if (tareas.length === 0) {
        listaContenedor.innerHTML = `<li class="list-group-item text-muted">Aún no hay tareas asignadas.</li>`;
        return;
    }

    for (let i = 0; i < tareas.length; i++) {
        const t = tareas[i];
        listaContenedor.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span><strong>${t.especialista}</strong> — ${t.descripcion} (${t.proyecto})</span>
                <span class="badge bg-warning text-dark rounded-pill">${t.estado}</span>
            </li>
        `;
    }
}

// ================== ACCIÓN: REGISTRAR HORAS (Especialista) ==================
function registrarHoras() {
    const nombre = document.getElementById('input-especialista-nombre').value.trim();
    const proyecto = document.getElementById('select-proyecto-horas').value;
    const horas = Number(document.getElementById('input-horas').value);
    const prioridad = document.getElementById('select-prioridad').value;

    if (nombre === "" || horas <= 0) {
        alert("Completa tu nombre y una cantidad de horas válida.");
        return;
    }

    registrosHoras.push({ especialista: nombre, proyecto: proyecto, horas: horas, prioridad: prioridad });

    document.getElementById('input-especialista-nombre').value = "";
    document.getElementById('input-horas').value = "";

    mostrarEspecialista();
    mostrarAdmin();
}

// ================== MOSTRAR: VISTA ESPECIALISTA ==================
function mostrarEspecialista() {
    // --- Lista de tareas asignadas ---
    const listaTareas = document.getElementById('lista-tareas-especialista');
    listaTareas.innerHTML = "";

    if (tareas.length === 0) {
        listaTareas.innerHTML = `<li class="list-group-item text-muted">No hay tareas asignadas todavía.</li>`;
    } else {
        for (let i = 0; i < tareas.length; i++) {
            const t = tareas[i];
            listaTareas.innerHTML += `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    ${t.descripcion} (${t.proyecto})
                    <span class="badge bg-secondary">${t.especialista}</span>
                </li>
            `;
        }
    }

    // --- Historial de horas ---
    const tablaHoras = document.getElementById('tabla-horas');
    tablaHoras.innerHTML = "";

    for (let i = 0; i < registrosHoras.length; i++) {
        const r = registrosHoras[i];
        const costo = r.horas * VALOR_HORA_PROMEDIO;

        tablaHoras.innerHTML += `
            <tr>
                <td>${r.especialista}</td>
                <td>${r.proyecto}</td>
                <td>${r.horas}</td>
                <td>${r.prioridad}</td>
                <td>$${costo.toLocaleString("es-CL")}</td>
            </tr>
        `;
    }
}

// ================== MOSTRAR: VISTA ADMINISTRADOR ==================
function mostrarAdmin() {
    let presupuestoTotal = 0;
    let proyectosActivos = 0;

    for (let i = 0; i < proyectos.length; i++) {
        presupuestoTotal = presupuestoTotal + proyectos[i].presupuesto;

        if (proyectos[i].estado === "En ejecución") {
            proyectosActivos = proyectosActivos + 1;
        }
    }

    let costoRealTotal = 0;
    for (let i = 0; i < registrosHoras.length; i++) {
        costoRealTotal = costoRealTotal + (registrosHoras[i].horas * VALOR_HORA_PROMEDIO);
    }

    document.getElementById('admin-presupuesto-total').textContent = "$" + presupuestoTotal.toLocaleString("es-CL");
    document.getElementById('admin-proyectos-activos').textContent = proyectosActivos;
    document.getElementById('admin-costo-real').textContent = "$" + costoRealTotal.toLocaleString("es-CL");

    // --- Tabla de reporte financiero ---
    const tabla = document.getElementById('tabla-reporte-admin');
    tabla.innerHTML = "";

    for (let i = 0; i < proyectos.length; i++) {
        const p = proyectos[i];
        const costoReal = calcularCostoProyecto(p.codigo);
        const rentabilidad = p.presupuesto - costoReal;

        let colorRentabilidad = "text-success";
        if (rentabilidad < 0) {
            colorRentabilidad = "text-danger";
        }

        tabla.innerHTML += `
            <tr>
                <td><strong>${p.codigo}</strong></td>
                <td>${p.nombre}</td>
                <td>${p.cliente}</td>
                <td>$${p.presupuesto.toLocaleString("es-CL")}</td>
                <td>$${costoReal.toLocaleString("es-CL")}</td>
                <td class="${colorRentabilidad} fw-bold">$${rentabilidad.toLocaleString("es-CL")}</td>
                <td>${p.estado}</td>
            </tr>
        `;
    }

    // --- Alertas automáticas ---
    const alertas = document.getElementById('alertas-admin');
    alertas.innerHTML = "";
    const hoy = new Date();

    for (let i = 0; i < proyectos.length; i++) {
        const p = proyectos[i];
        const fechaFin = new Date(p.fin);

        if (fechaFin < hoy && p.estado === "En ejecución") {
            alertas.innerHTML += `<div class="alert alert-danger py-2 mb-2">El proyecto <strong>${p.nombre}</strong> superó su fecha de entrega (${p.fin}).</div>`;
        }

        const costoReal = calcularCostoProyecto(p.codigo);
        if (costoReal > p.presupuesto) {
            alertas.innerHTML += `<div class="alert alert-warning py-2 mb-2">El proyecto <strong>${p.nombre}</strong> superó su presupuesto planificado.</div>`;
        }
    }

    if (alertas.innerHTML === "") {
        alertas.innerHTML = `<div class="alert alert-success py-2 mb-2">No hay alertas de plazos ni presupuesto por el momento.</div>`;
    }
}

// ================== INICIO: se ejecuta una sola vez al cargar la página ==================
document.addEventListener('DOMContentLoaded', function () {
    llenarSelects();
    mostrarCliente();
    mostrarDirector();
    mostrarEspecialista();
    mostrarAdmin();
});
