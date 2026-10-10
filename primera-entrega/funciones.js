const peliculas = [
    {
        titulo: "El club de la pelea",
        anio: 1999,
        director: "David Fincher",
        genero: "Drama",
        sinopsis: "Un oficinista insomne y desencantado conoce a Tyler Durden, un carismático vendedor de jabón, y juntos fundan un club de peleas clandestino que termina saliéndose de control.",
        imagen: "poster-fightclub.webp",
        promedio: 4.7,
        votos: 210
    },
    {
        titulo: "Michael",
        anio: 2026,
        director: "Antoine Fuqua",
        genero: "Drama Musical",
        sinopsis: "Película biográfica sobre Michael Jackson, que recorre su vida y su carrera desde sus comienzos con los Jackson 5 hasta convertirse en el Rey del Pop.",
        imagen: "poster-michael.webp",
        promedio: 3.8,
        votos: 75
    },
    {
        titulo: "La odisea",
        anio: 2026,
        director: "Christopher Nolan",
        genero: "Aventura",
        sinopsis: "Odiseo, el legendario rey de Ítaca, emprende un largo y peligroso viaje de regreso a casa tras la Guerra de Troya. A lo largo de su travesía, se ve obligado a enfrentarse a los caprichos de los dioses, a monstruos mitológicos y a pruebas que llevan su astucia y su humanidad al límite.",
        imagen: "poster-odisea.webp",
        promedio: 4.3,
        votos: 128
    },
    {
        titulo: "La red social",
        anio: 2010,
        director: "David Fincher",
        genero: "Drama",
        sinopsis: "La historia de cómo Mark Zuckerberg creó Facebook siendo estudiante de Harvard, y de las demandas que enfrentó por parte de sus antiguos socios.",
        imagen: "poster-socialnetwork.webp",
        promedio: 4.6,
        votos: 190
    },
    {
        titulo: "El señor de los anillos: La comunidad del anillo",
        anio: 2001,
        director: "Peter Jackson",
        genero: "Aventura",
        sinopsis: "El hobbit Frodo Bolsón recibe un anillo de enorme poder y emprende, junto a ocho compañeros, un peligroso viaje para destruirlo en el Monte del Destino.",
        imagen: "poster-lotr.webp",
        promedio: 4.9,
        votos: 340
    },
    {
        titulo: "Spider-Man: Un nuevo día",
        anio: 2026,
        director: "Destin Cretton",
        genero: "Ciencia Ficción",
        sinopsis: "Tras los hechos de Sin camino a casa, Peter Parker intenta seguir adelante como Spider-Man en un mundo donde nadie recuerda quién es.",
        imagen: "poster-spiderman.webp",
        promedio: 4.1,
        votos: 95
    },
    {
        titulo: "Whiplash",
        anio: 2014,
        director: "Damien Chazelle",
        genero: "Drama Musical",
        sinopsis: "Un joven baterista ingresa a un prestigioso conservatorio de música, donde un instructor implacable lo lleva al límite en su búsqueda de la perfección.",
        imagen: "poster-whiplash.webp",
        promedio: 3.9,
        votos: 160
    }
];
/**
 * Comprueba que los campos de la reseña sean correctos. Si alguno no lo es,
 * avisa al usuario con un alert y blanquea ese campo.
 * @method validarResena
 * @param {number} anioEstreno - Año de estreno de la película
 * @return {boolean} true si todos los campos son correctos, false si hay algún error
 */
const validarResena = (anioEstreno) => {
    const puntaje = document.getElementById("puntaje").value;
    const fecha = document.getElementById("fecha-vista").value;
    const resena = document.getElementById("resena").value;
    const hoy = new Date().toISOString().slice(0, 10);

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

    if (resena.replaceAll(" ", "").length < 10) {
        alert("La reseña debe tener al menos 10 caracteres.");
        document.getElementById("resena").value = "";
        return false;
    }

    if (fecha > hoy) {
        alert("La fecha no puede ser posterior a hoy.");
        document.getElementById("fecha-vista").value = "";
        return false;
    }

    return true;

};

/**
 * Calcula el nuevo puntaje promedio de la película al sumar el voto del usuario.
 * @method calcularNuevoPromedio
 * @param {number} promedio - Puntaje promedio actual de la película
 * @param {number} votos - Cantidad de votos actuales
 * @param {number} puntaje - Puntaje que eligió el usuario (1 a 5)
 * @return {number} Nuevo puntaje promedio
 */
const calcularNuevoPromedio = (promedio, votos, puntaje) => {
    return (promedio * votos + puntaje) / (votos + 1);
};

/**
 * Valida la reseña y, si es correcta, calcula y muestra el nuevo puntaje promedio
 * de la película elegida.
 * @method guardarResena
 */
const guardarResena = () => {
    const pelicula = peliculas[obtenerIdElegido()];

    document.getElementById("resultado").innerText = "";

    if (validarResena(pelicula.anio)) {
        const puntaje = Number(document.getElementById("puntaje").value);
        const nuevoPromedio = calcularNuevoPromedio(pelicula.promedio, pelicula.votos, puntaje);

        document.getElementById("resultado").innerText =
            `¡Reseña guardada! Nuevo puntaje promedio: ${nuevoPromedio.toFixed(2)} / 5 (${pelicula.votos + 1} votos)`;
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

/**
 * Muestra solo las películas del catálogo cuyo título contiene el texto buscado.
 * Si ninguna coincide, muestra el mensaje de sin resultados.
 * @method filtrarCatalogo
 */
const filtrarCatalogo = () => {
    const texto = document.getElementById("buscar-catalogo").value.toLowerCase();
    const items = document.getElementsByClassName("item-pelicula");
    let cantidadVisibles = 0;

    for (let i = 0; i < items.length; i++) {
        const titulo = items[i].getElementsByTagName("h3")[0].innerText.toLowerCase();

        if (titulo.indexOf(texto) !== -1) {
            items[i].style.display = "";
            cantidadVisibles++;
        } else {
            items[i].style.display = "none";
        }
    }

    if (cantidadVisibles === 0) {
        document.getElementById("sin-resultados").style.display = "block";
    } else {
        document.getElementById("sin-resultados").style.display = "none";
    }
};

/**
 * Guarda el texto buscado en el inicio y lleva al catálogo para filtrar ahí.
 * @method buscarDesdeInicio
 */
const buscarDesdeInicio = () => {
    const texto = document.getElementById("buscar-inicio").value;
    localStorage.setItem("busqueda", texto);
    window.location.href = "catalogo.html";
};

/**
 * Al cargar el catálogo, si hay una búsqueda guardada desde el inicio,
 * la escribe en el buscador, filtra la lista y borra la búsqueda guardada.
 * @method cargarBusqueda
 */
const cargarBusqueda = () => {
    const busqueda = localStorage.getItem("busqueda");

    if (busqueda !== null) {
        document.getElementById("buscar-catalogo").value = busqueda;
        localStorage.removeItem("busqueda");
        filtrarCatalogo();
    }
};
/**
 * Genera el listado del catálogo a partir del array de películas.
 * @method cargarCatalogo
 */
const cargarCatalogo = () => {
    let contenido = "";

    peliculas.forEach((pelicula, id) => {
        contenido += `<article class="item-pelicula">
            <img src="imagenes/${pelicula.imagen}" alt="Póster de ${pelicula.titulo}" class="poster poster-chico">
            <div class="item-info">
                <h3><a href="ficha.html" onclick="seleccionarPelicula(${id})">${pelicula.titulo} (${pelicula.anio})</a></h3>
                <p>Género: ${pelicula.genero}</p>
                <p>Director: ${pelicula.director}</p>
            </div>
        </article>`;
    });

    document.getElementById("lista-peliculas").innerHTML = contenido;
};

/**
 * Guarda en localStorage qué película eligió el usuario, para mostrarla en la ficha.
 * @method seleccionarPelicula
 * @param {number} id - Posición de la película en el array peliculas
 */
const seleccionarPelicula = (id) => {
    localStorage.setItem("peliculaElegida", id);
};
/**
 * Devuelve la posición de la película elegida en el catálogo.
 * Si el usuario todavía no eligió ninguna, devuelve la de La odisea.
 * @method obtenerIdElegido
 * @return {number} Posición de la película en el array peliculas
 */
const obtenerIdElegido = () => {
    const id = localStorage.getItem("peliculaElegida");

    if (id === null) {
        return 2;
    }

    return Number(id);
};

/**
 * Completa la ficha con los datos de la película elegida.
 * @method cargarFicha
 */
const cargarFicha = () => {
    const pelicula = peliculas[obtenerIdElegido()];

    document.getElementById("ficha-poster").src = `imagenes/${pelicula.imagen}`;
    document.getElementById("ficha-poster").alt = `Póster de la película ${pelicula.titulo}`;
    document.getElementById("ficha-titulo").innerText = pelicula.titulo;
    document.getElementById("ficha-datos").innerText = `${pelicula.anio} · Dir: ${pelicula.director} · ${pelicula.genero}`;
    document.getElementById("ficha-puntaje").innerText = `${pelicula.promedio} / 5 · Puntaje promedio (${pelicula.votos} votos)`;
    document.getElementById("ficha-sinopsis").innerText = pelicula.sinopsis;
    document.title = `Filmoteca | ${pelicula.titulo}`;
};

/**
 * Genera el top del inicio con las 5 películas de mayor puntaje promedio.
 * @method cargarTop
 */
const cargarTop = () => {
    const copia = peliculas.slice(0);
    copia.sort((a, b) => b.promedio - a.promedio);
    const top = copia.slice(0, 5);
    let contenido = "";

    top.forEach((pelicula) => {
        const id = peliculas.indexOf(pelicula);

        contenido += `<article class="tarjeta">
            <img src="imagenes/${pelicula.imagen}" alt="Póster de ${pelicula.titulo}" class="poster">
            <div class="tarjeta-info">
                <h3><a href="ficha.html" onclick="seleccionarPelicula(${id})">${pelicula.titulo} (${pelicula.anio})</a></h3>
                <p>Dir: ${pelicula.director}</p>
                <p class="puntaje">Puntaje promedio: ${pelicula.promedio}</p>
            </div>
        </article>`;
    });

    document.getElementById("top-peliculas").innerHTML = contenido;
};