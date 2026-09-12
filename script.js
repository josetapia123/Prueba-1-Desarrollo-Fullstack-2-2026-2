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
