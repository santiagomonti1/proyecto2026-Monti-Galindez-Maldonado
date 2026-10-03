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