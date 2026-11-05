import { useEffect, useState } from "react";
import Input from "@components/Input";
import TarjetaPelicula from "@components/TarjetaPelicula";
import { obtenerPeliculas } from "@api/filmotecaApi";

/**
 * Página de inicio: muestra el top 5 de películas por puntaje promedio.
 * El buscador funciona igual que en el catálogo (issues #11 y #12):
 * filtra mientras se escribe, sin botón.
 */
const Inicio = () => {
    const [peliculas, setPeliculas] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        document.title = "Filmoteca | Inicio";

        /**
         * Pide las películas al mock y las guarda en el estado.
         */
        const cargarPeliculas = async () => {
            try {
                const datos = await obtenerPeliculas();
                setPeliculas(datos);
            } catch (error) {
                console.error("Error al cargar las películas:", error);
                setError("No se pudieron cargar las películas. Probá de nuevo en unos minutos.");
            }
        };

        cargarPeliculas();
    }, []);

    const top = [...peliculas].sort((a, b) => b.promedio - a.promedio).slice(0, 5);

    const resultados = peliculas.filter(
        (pelicula) => pelicula.titulo.toLowerCase().indexOf(busqueda.toLowerCase()) !== -1
    );

    const mostradas = busqueda === "" ? top : resultados;

    return (
        <section>
            <p className="subtitulo">Tu diario personal de películas</p>

            <div className="buscador">
                <Input
                    id="buscar-inicio"
                    label="Buscar película"
                    type="text"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="Ej: La red social"
                    maxLength={50}
                />
            </div>

            <h2>{busqueda === "" ? "Top películas de la semana" : "Resultados de la búsqueda"}</h2>

            {error !== "" && <p className="mensaje-error" role="alert">{error}</p>}

            <div className="grilla-tarjetas">
                {mostradas.map((pelicula) => (
                    <TarjetaPelicula key={pelicula.id} pelicula={pelicula}>
                        <p>Dir: {pelicula.director}</p>
                        <p className="puntaje">Puntaje promedio: {pelicula.promedio}</p>
                    </TarjetaPelicula>
                ))}
            </div>

            {peliculas.length > 0 && mostradas.length === 0 && (
                <div className="sin-resultados">
                    <p className="sin-resultados-icono">!</p>
                    <p><strong>No encontramos resultados.</strong></p>
                    <p>Probá con otro título.</p>
                </div>
            )}
        </section>
    );
};

export default Inicio;