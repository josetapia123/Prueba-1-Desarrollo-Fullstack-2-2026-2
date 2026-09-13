
function cambiarVista(idVistaMostrar, idBotonActivar) {
    // Oculto las 4 vistas
    document.getElementById('vista-cliente').classList.add('d-none');
    document.getElementById('vista-director').classList.add('d-none');
    document.getElementById('vista-especialista').classList.add('d-none');
    document.getElementById('vista-admin').classList.add('d-none');

    // Muestro solo la vista que corresponde al botón que se apretó
    document.getElementById(idVistaMostrar).classList.remove('d-none');

    // Le quito el color activo a los 4 botones
    document.getElementById('btn-cliente').classList.remove('active');
    document.getElementById('btn-director').classList.remove('active');
    document.getElementById('btn-especialista').classList.remove('active');
    document.getElementById('btn-admin').classList.remove('active');

    // Le pongo el color activo solo al botón que se apretó
    document.getElementById(idBotonActivar).classList.add('active');
}
