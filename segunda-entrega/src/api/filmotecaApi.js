// Dirección del mock de servicios (json-server). Se levanta con: npm run mock
const URL_API = "http://localhost:3000";

/**
 * Pide al servidor la lista completa de películas.
 * @returns {Promise<Array>} Lista de películas
 */
export const obtenerPeliculas = async () => {
    const response = await fetch(`${URL_API}/peliculas`);

    if (!response.ok) {
        throw new Error("No se pudieron obtener las películas.");
    }

    return await response.json();
};

/**
 * Pide al servidor una película por su id.
 * @param {string} id - Id de la película
 * @returns {Promise<Object>} Datos de la película
 */
export const obtenerPelicula = async (id) => {
    const response = await fetch(`${URL_API}/peliculas/${id}`);

    if (!response.ok) {
        throw new Error("No se encontró la película.");
    }

    return await response.json();
};

/**
 * Modifica solo algunos datos de una película (PATCH).
 * Se usa para guardar el nuevo puntaje promedio y la cantidad de votos.
 * @param {string} id - Id de la película
 * @param {Object} datos - Campos a modificar, por ejemplo { promedio: 4.5, votos: 129 }
 * @returns {Promise<Object>} Película actualizada
 */
export const actualizarPelicula = async (id, datos) => {
    const response = await fetch(`${URL_API}/peliculas/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    });

    if (!response.ok) {
        throw new Error("No se pudo actualizar la película.");
    }

    return await response.json();
};

/**
 * Pide al servidor todas las reseñas y devuelve solo las de una película.
 * Se filtran acá porque json-server convierte "?peliculaId=3" en el número 3,
 * y en db.json los ids son texto ("3"), así que no coincidirían.
 * @param {string} peliculaId - Id de la película
 * @returns {Promise<Array>} Reseñas de esa película
 */
export const obtenerResenasDePelicula = async (peliculaId) => {
    const response = await fetch(`${URL_API}/resenas`);

    if (!response.ok) {
        throw new Error("No se pudieron obtener las reseñas.");
    }

    const resenas = await response.json();
    return resenas.filter((resena) => resena.peliculaId === peliculaId);
};

/**
 * Pide al servidor las reseñas que escribió un usuario.
 * @param {string} usuario - Nombre del usuario
 * @returns {Promise<Array>} Reseñas de ese usuario
 */
export const obtenerResenasDeUsuario = async (usuario) => {
    const response = await fetch(`${URL_API}/resenas?usuario=${usuario}`);

    if (!response.ok) {
        throw new Error("No se pudieron obtener tus reseñas.");
    }

    return await response.json();
};

/**
 * Guarda una reseña nueva en el servidor (POST).
 * @param {Object} resena - Datos de la reseña
 * @returns {Promise<Object>} Reseña guardada, con el id que le asignó el servidor
 */
export const crearResena = async (resena) => {
    const response = await fetch(`${URL_API}/resenas`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(resena)
    });

    if (!response.ok) {
        throw new Error("No se pudo guardar la reseña.");
    }

    return await response.json();
};

/**
 * Busca un usuario por su nombre.
 * @param {string} usuario - Nombre del usuario
 * @returns {Promise<Object|undefined>} El usuario encontrado, o undefined si no existe
 */
export const obtenerUsuario = async (usuario) => {
    const response = await fetch(`${URL_API}/usuarios?usuario=${usuario}`);

    if (!response.ok) {
        throw new Error("No se pudo verificar el usuario.");
    }

    const usuarios = await response.json();
    return usuarios[0];
};