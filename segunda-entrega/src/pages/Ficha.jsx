import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "@components/Button";
import Input from "@components/Input";
import Fecha from "@components/Fecha";
import { actualizarPelicula, crearResena, obtenerPelicula, obtenerResenasDePelicula } from "@api/filmotecaApi";

/**
 * Devuelve el mensaje de error del puntaje, o "" si es correcto.
 * @param {string} valor - Puntaje elegido ("1" a "5")
 * @returns {string} Mensaje de error
 */
const validarPuntaje = (valor) => {
    if (valor === "") {
        return "Elegí un puntaje.";
    }

    return "";
};

/**
 * Devuelve el mensaje de error de la fecha, o "" si es correcta.
 * La fecha no puede ser anterior al estreno ni posterior a hoy.
 * @param {string} valor - Fecha en formato AAAA-MM-DD
 * @param {number} anioEstreno - Año de estreno de la película
 * @returns {string} Mensaje de error
 */
const validarFecha = (valor, anioEstreno) => {
    if (valor === "") {
        return "Ingresá la fecha en que viste la película.";
    }

    if (Number(valor.slice(0, 4)) < anioEstreno) {
        return `La fecha no puede ser anterior al estreno de la película (${anioEstreno}).`;
    }

    if (new Date(`${valor}T00:00`) > new Date()) {
        return "La fecha no puede ser posterior a hoy.";
    }

    return "";
};

/**
 * Devuelve el mensaje de error de la reseña, o "" si es correcta.
 * @param {string} valor - Texto de la reseña
 * @returns {string} Mensaje de error
 */
const validarTexto = (valor) => {
    if (valor.replaceAll(" ", "").length < 10) {
        return "La reseña debe tener al menos 10 caracteres.";
    }

    return "";
};

/**
 * Página con la información de una película y el formulario para reseñarla.
 * La película se elige por el id de la URL: /pelicula/3
 */
const Ficha = () => {
    const { id } = useParams();
    const usuario = localStorage.getItem("usuarioActivo");

    const [pelicula, setPelicula] = useState(null);
    const [resenas, setResenas] = useState([]);
    const [errorCarga, setErrorCarga] = useState("");

    const [puntaje, setPuntaje] = useState("");
    const [fecha, setFecha] = useState("");
    const [texto, setTexto] = useState("");
    const [errorPuntaje, setErrorPuntaje] = useState("");
    const [errorFecha, setErrorFecha] = useState("");
    const [errorTexto, setErrorTexto] = useState("");
    const [resultado, setResultado] = useState("");

    useEffect(() => {
        document.title = "Filmoteca | Ficha";  

        /**
         * Pide al mock la película y sus reseñas, y las guarda en el estado.
         */
        const cargarFicha = async () => {
            try {
                const datosPelicula = await obtenerPelicula(id);
                const datosResenas = await obtenerResenasDePelicula(id);
                setPelicula(datosPelicula);
                setResenas(datosResenas);
                document.title = `Filmoteca | ${datosPelicula.titulo}`;  
            } catch (error) {
                console.error("Error al cargar la ficha:", error);
                setErrorCarga("No se pudo cargar la película. Volvé al catálogo y probá de nuevo.");
            }
        };

        cargarFicha();
    }, [id]);

    /**
     * Guarda el puntaje elegido y lo valida en el momento.
    * @param {Object} e - Evento del select
     */
    const cambiarPuntaje = (e) => {
        setPuntaje(e.target.value);
        setErrorPuntaje(validarPuntaje(e.target.value));
    };

    /**
     * Guarda la fecha elegida y la valida en el momento.
     * @param {Object} e - Evento del input
     */
    const cambiarFecha = (e) => {
        setFecha(e.target.value);
        setErrorFecha(validarFecha(e.target.value, pelicula.anio));
    };

    /**
     * Guarda el texto de la reseña y lo valida en el momento.
     * @param {Object} e - Evento del textarea
     */
    const cambiarTexto = (e) => {
        setTexto(e.target.value);
        setErrorTexto(validarTexto(e.target.value));
    };

    /**
     * Valida el formulario y, si es correcto, guarda la reseña en el mock (POST)
     * y actualiza el puntaje promedio y los votos de la película (PATCH).
     */
    const guardarResena = async () => {
        const mensajePuntaje = validarPuntaje(puntaje);
        const mensajeFecha = validarFecha(fecha, pelicula.anio);
        const mensajeTexto = validarTexto(texto);

        setErrorPuntaje(mensajePuntaje);
        setErrorFecha(mensajeFecha);
        setErrorTexto(mensajeTexto);
        setResultado("");

        if (mensajePuntaje !== "" || mensajeFecha !== "" || mensajeTexto !== "") {
            return;
        }

        try {
            const nuevaResena = await crearResena({
                usuario: usuario,
                peliculaId: id,
                titulo: pelicula.titulo,
                puntaje: Number(puntaje),
                fecha: fecha,
                texto: texto.trim()
            });

            const votos = pelicula.votos + 1;
            const promedio = Number(((pelicula.promedio * pelicula.votos + Number(puntaje)) / votos).toFixed(2));
            const peliculaActualizada = await actualizarPelicula(id, { promedio: promedio, votos: votos });

            setPelicula(peliculaActualizada);
            setResenas((prev) => [...prev, nuevaResena]);
            setResultado(`¡Reseña guardada! Nuevo puntaje promedio: ${promedio} / 5 (${votos} votos)`);
            setPuntaje("");
            setFecha("");
            setTexto("");
        } catch (error) {
            console.error("Error al guardar la reseña:", error);
            setResultado("No se pudo guardar la reseña. Probá de nuevo en unos minutos.");
        }
    };

    if (errorCarga !== "") {
        return <p className="mensaje-error" role="alert">{errorCarga}</p>;
    }

    if (pelicula === null) {
        return <p>Cargando película...</p>;
    }

    return (
        <article className="ficha">
            <img src={`/imagenes/${pelicula.imagen}`} alt={`Póster de la película ${pelicula.titulo}`} className="poster poster-grande" />

            <div className="ficha-info">
                <h2>{pelicula.titulo}</h2>
                <p className="ficha-datos">{pelicula.anio} · Dir: {pelicula.director} · {pelicula.genero}</p>
                <p className="puntaje">{pelicula.promedio} / 5 · Puntaje promedio ({pelicula.votos} votos)</p>

                <h3>Sinopsis</h3>
                <p>{pelicula.sinopsis}</p>

                <div className="formulario">
                    <h3>Tu reseña</h3>

                    {!usuario && (
                        <p>Para escribir una reseña, <Link to="/login">iniciá sesión</Link>.</p>
                    )}

                    {usuario && (
                        <div>
                            <div className="campo">
                                <label htmlFor="puntaje">Tu puntaje</label>
                                <select
                                    id="puntaje"
                                    value={puntaje}
                                    onChange={cambiarPuntaje}
                                    aria-invalid={errorPuntaje !== ""}
                                    aria-describedby="puntaje-error"
                                >
                                    <option value="" disabled>Elegí un puntaje</option>
                                    <option value="1">1 - Mala</option>
                                    <option value="2">2 - Regular</option>
                                    <option value="3">3 - Buena</option>
                                    <option value="4">4 - Muy buena</option>
                                    <option value="5">5 - Excelente</option>
                                </select>
                                <p id="puntaje-error" className="mensaje-error" role="alert">{errorPuntaje}</p>
                            </div>

                            <Input
                                id="fecha-vista"
                                label="¿Cuándo la viste?"
                                type="date"
                                value={fecha}
                                onChange={cambiarFecha}
                                error={errorFecha}
                            />

                            <div className="campo">
                                <label htmlFor="resena">Reseña</label>
                                <textarea
                                    id="resena"
                                    rows={5}
                                    maxLength={500}
                                    placeholder="Escribí tu reseña..."
                                    value={texto}
                                    onChange={cambiarTexto}
                                    aria-invalid={errorTexto !== ""}
                                    aria-describedby="resena-error"
                                />
                                <p id="resena-error" className="mensaje-error" role="alert">{errorTexto}</p>
                            </div>

                            <Button onClick={guardarResena}>Guardar</Button>
                            <p className="resultado" role="status">{resultado}</p>
                        </div>
                    )}
                </div>

                <section className="resenas">
                    <h3>Reseñas</h3>

                    {resenas.length === 0 && (
                        <p className="sin-resenas">Todavía no hay reseñas de esta película.</p>
                    )}

                    {resenas.map((resena) => (
                        <article className="resena-guardada" key={resena.id}>
                            <p className="resena-datos">
                                <strong>{resena.usuario}</strong> · {resena.puntaje} / 5 · <Fecha valor={resena.fecha} />
                            </p>
                            <p>{resena.texto}</p>
                        </article>
                    ))}
                </section>
            </div>
        </article>
    );
};

export default Ficha;