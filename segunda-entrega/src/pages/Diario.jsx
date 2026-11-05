import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TarjetaPelicula from "@components/TarjetaPelicula";
import Fecha from "@components/Fecha";
import { obtenerPeliculas, obtenerResenasDeUsuario } from "@api/filmotecaApi";

/**
 * Página "Mi diario": perfil, películas favoritas e historial del usuario.
 * Solo se puede ver con una sesión iniciada; si no, lleva al login (issue #13).
 */
const Diario = () => {
    const usuario = localStorage.getItem("usuarioActivo");
    const navigate = useNavigate();

    const [resenas, setResenas] = useState([]);
    const [peliculas, setPeliculas] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!usuario) {
            navigate("/login");
            return;
        }

        document.title = "Filmoteca | Mi diario"

        /**
         * Pide al mock las reseñas del usuario y las películas, y las guarda en el estado.
         */
        const cargarDiario = async () => {
            try {
                const datosResenas = await obtenerResenasDeUsuario(usuario);
                const datosPeliculas = await obtenerPeliculas();
                setResenas(datosResenas);
                setPeliculas(datosPeliculas);
            } catch (error) {
                console.error("Error al cargar el diario:", error);
                setError("No se pudo cargar tu diario. Probá de nuevo en unos minutos.");
            }
        };

        cargarDiario();
    }, [usuario, navigate]);

    if (!usuario) {
        return null;
    }

    const nombre = usuario.charAt(0).toUpperCase() + usuario.slice(1);

    let suma = 0;
    resenas.forEach((resena) => {
        suma += resena.puntaje;
    });

    const favoritas = peliculas.filter(
        (pelicula) => resenas.find((resena) => resena.peliculaId === pelicula.id && resena.puntaje === 5) !== undefined
    );

    const historial = [...resenas].sort((a, b) => b.fecha.localeCompare(a.fecha));

    return (
        <div>
            <section className="perfil">
                <div className="avatar">{nombre.charAt(0)}</div>
                <div className="perfil-info">
                    <h2>{nombre}</h2>
                    <p>
                        {resenas.length === 0
                            ? "Todavía no puntuaste películas"
                            : `Puntaje promedio: ${(suma / resenas.length).toFixed(1)}`}
                    </p>
                </div>
            </section>

            {error !== "" && <p className="mensaje-error" role="alert">{error}</p>}

            <section>
                <h2>Tus favoritas</h2>

                {favoritas.length === 0 && (
                    <p className="sin-resenas">Las películas que puntúes con 5 van a aparecer acá.</p>
                )}

                <div className="grilla-tarjetas">
                    {favoritas.map((pelicula) => (
                        <TarjetaPelicula key={pelicula.id} pelicula={pelicula}>
                            <p className="puntaje">Tu puntaje: 5</p>
                        </TarjetaPelicula>
                    ))}
                </div>
            </section>

            <section>
                <h2>Historial</h2>
                <table className="tabla-historial">
                    <caption>Películas que viste, de la más reciente a la más antigua</caption>
                    <thead>
                        <tr>
                            <th>Película</th>
                            <th>Fecha</th>
                            <th>Tu puntaje</th>
                            <th>Reseña</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historial.length === 0 && (
                            <tr>
                                <td colSpan={4}>Todavía no guardaste reseñas.</td>
                            </tr>
                        )}

                        {historial.map((resena) => (
                            <tr key={resena.id}>
                                <td>{resena.titulo}</td>
                                <td><Fecha valor={resena.fecha} /></td>
                                <td>{resena.puntaje}</td>
                                <td>{resena.texto}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default Diario;