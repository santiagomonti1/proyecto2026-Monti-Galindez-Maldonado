/**
 * Comprueba que los campos de la reseña sean correctos. Si alguno no lo es,
 * avisa al usuario con un alert y blanquea ese campo.
 * @method validarResena
 * @param {number} anioEstreno 
 * @return {boolean} 
 */
const validarResena = (anioEstreno) => {
    const puntaje = document.getElementById("puntaje").value;
    const fecha = document.getElementById("fecha-vista").value;
    const resena = document.getElementById("resena").value;

    if (puntaje === "") {
        alert("Elegí un puntaje antes de guardar tu reseña.");
        return false;
    }

    if (fecha === "") {
        alert("Ingresá la fecha en que viste la película.");
        return false;
    }

    if (Number(fecha.slice(0, 4)) < anioEstreno) {
        alert(`La fecha no puede ser anterior al estreno de la película (${anioEstreno}).`);
        document.getElementById("fecha-vista").value = "";
        return false;
    }

    if (resena.length < 10) {
        alert("La reseña debe tener al menos 10 caracteres.");
        document.getElementById("resena").value = "";
        return false;
    }

    return true;
};

/**
 * Calcula el nuevo puntaje promedio de la película al sumar el voto del usuario.
 * @method calcularNuevoPromedio
 * @param {number} promedio
 * @param {number} votos 
 * @param {number} puntaje 
 * @return {number} 
 */
const calcularNuevoPromedio = (promedio, votos, puntaje) => {
    return (promedio * votos + puntaje) / (votos + 1);
};

/**
 * Valida la reseña y, si es correcta, calcula y muestra el nuevo puntaje promedio.
 * @method guardarResena
 * @param {number} promedio 
 * @param {number} votos 
 * @param {number} anioEstreno 
 */
const guardarResena = (promedio, votos, anioEstreno) => {
    if (validarResena(anioEstreno)) {
        const puntaje = Number(document.getElementById("puntaje").value);
        const nuevoPromedio = calcularNuevoPromedio(promedio, votos, puntaje);

        document.getElementById("resultado").innerText =
            `¡Reseña guardada! Nuevo puntaje promedio: ${nuevoPromedio.toFixed(2)} / 5 (${votos + 1} votos)`;
    }
};

// funciones para login

/**
 * Borra los mensajes de error del login y devuelve los bordes de los campos a su color original.
 * @method limpiarErroresLogin
 */
const limpiarErroresLogin = () => {
    document.getElementById("error-usuario").innerText = "";
    document.getElementById("error-contrasena").innerText = "";
    document.getElementById("usuario").style.borderColor = "";
    document.getElementById("contrasena").style.borderColor = "";
};

/**
 * Muestra un mensaje de error debajo de un campo, marca su borde en rojo y blanquea el campo.
 * @method mostrarError
 * @param {string} idCampo - Id del input que tiene el error
 * @param {string} idMensaje - Id del párrafo donde se escribe el mensaje
 * @param {string} texto - Mensaje de error para el usuario
 */
const mostrarError = (idCampo, idMensaje, texto) => {
    document.getElementById(idMensaje).innerText = texto;
    document.getElementById(idCampo).style.borderColor = "var(--color-acento-claro)";
    document.getElementById(idCampo).value = "";
};

/**
 * Comprueba el usuario y la contraseña ingresados. Si son correctos, lleva al inicio;
 * si no, muestra el error correspondiente.
 * @method iniciarSesion
 */
const iniciarSesion = () => {
    const usuarios = [
        { usuario: "santiago", contrasena: "santi2026" },
        { usuario: "luis", contrasena: "luis2026" },
        { usuario: "baltazar", contrasena: "balta2026" }
    ];
    const usuario = document.getElementById("usuario").value.toLowerCase();
    const contrasena = document.getElementById("contrasena").value;

    limpiarErroresLogin();

    if (usuario === "") {
        mostrarError("usuario", "error-usuario", "Ingresá tu usuario.");
        return;
    }

    if (contrasena === "") {
        mostrarError("contrasena", "error-contrasena", "Ingresá tu contraseña.");
        return;
    }

    const usuarioEncontrado = usuarios.find(u => u.usuario === usuario);

    if (usuarioEncontrado === undefined) {
        mostrarError("usuario", "error-usuario", "Ese usuario no existe.");
        return;
    }

    if (usuarioEncontrado.contrasena !== contrasena) {
        mostrarError("contrasena", "error-contrasena", "Contraseña incorrecta. Intentá de nuevo.");
        return;
    }

    window.location.href = "index.html";
};