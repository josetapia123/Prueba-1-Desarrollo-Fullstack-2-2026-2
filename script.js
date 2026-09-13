// 1. Definimos los usuarios válidos, sus contraseñas numéricas y a qué vista van
const usuarios = {
    "cliente": { pass: "1234", vista: "vista-cliente" },
    "director": { pass: "1234", vista: "vista-director" },
    "especialista": { pass: "1234", vista: "vista-especialista" },
    "admin": { pass: "1234", vista: "vista-admin" }
};

// 2. Función para procesar el login
function iniciarSesion() {
    // Obtenemos los valores de los inputs (pasamos el usuario a minúsculas por seguridad)
    let user = document.getElementById("input-user").value.toLowerCase();
    let pass = document.getElementById("input-pass").value;

    // Validación 1: Verificar que la contraseña solo tenga números usando Expresiones Regulares
    if (!/^[0-9]+$/.test(pass)) {
        alert("Error: La contraseña solo puede contener números.");
        return; // Detiene la ejecución aquí
    }

    // Validación 2: Verificar si el usuario existe y la contraseña coincide
    if (usuarios[user] && usuarios[user].pass === pass) {
        
        // Ocultamos la vista de login
        document.getElementById("vista-login").classList.add("d-none");
        
        // Mostramos el header con el botón de cerrar sesión
        document.getElementById("header-sistema").classList.remove("d-none");
        
        // Mostramos la vista correspondiente al usuario
        document.getElementById(usuarios[user].vista).classList.remove("d-none");
        
    } else {
        alert("Credenciales incorrectas. Intente nuevamente.");
    }
}

// 3. Función para cerrar sesión y reiniciar la vista
function cerrarSesion() {
    // Ocultar todas las vistas de los roles
    document.getElementById('vista-cliente').classList.add('d-none');
    document.getElementById('vista-director').classList.add('d-none');
    document.getElementById('vista-especialista').classList.add('d-none');
    document.getElementById('vista-admin').classList.add('d-none');

    // Ocultar el header superior
    document.getElementById("header-sistema").classList.add("d-none");

    // Limpiar los inputs
    document.getElementById("input-user").value = "";
    document.getElementById("input-pass").value = "";

    // Volver a mostrar el login
    document.getElementById("vista-login").classList.remove("d-none");
}