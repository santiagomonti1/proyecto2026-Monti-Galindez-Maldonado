import { useEffect, useState } from "react";
import Input from "@components/Input";
import TarjetaPelicula from "@components/TarjetaPelicula";
import { obtenerPeliculas } from "@api/filmotecaApi";

/**
 * Página del catálogo: trae las películas del mock al abrirse
 * y las filtra por título mientras el usuario escribe.
 */
const Catalogo = () => {
    const [peliculas, setPeliculas] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        /**
         * Pide las películas al mock y las guarda en el estado.
         */
        const cargarPeliculas = async () => {
            try {
                const datos = await obtenerPeliculas();
                setPeliculas(datos);
            } catch (error) {
                console.error("Error al cargar el catálogo:", error);
                setError("No se pudo cargar el catálogo. Probá de nuevo en unos minutos.");
            }
        };

        cargarPeliculas();
    }, []);

    const visibles = peliculas.filter(
        (pelicula) => pelicula.titulo.toLowerCase().indexOf(busqueda.toLowerCase()) !== -1
    );

    return (
        <section>
            <h2>Catálogo</h2>

            <div className="buscador">
                <Input
                    id="buscar-catalogo"
                    label="Buscar por título"
                    type="text"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="Ej: Michael"
                    maxLength={50}
                />
            </div>

            {error !== "" && <p className="mensaje-error" role="alert">{error}</p>}

            <div className="grilla-tarjetas">
                {visibles.map((pelicula) => (
                    <TarjetaPelicula key={pelicula.id} pelicula={pelicula}>
                        <p>Género: {pelicula.genero}</p>
                        <p>Director: {pelicula.director}</p>
                    </TarjetaPelicula>
                ))}
            </div>

            {peliculas.length > 0 && visibles.length === 0 && (
                <div className="sin-resultados">
                    <p className="sin-resultados-icono">!</p>
                    <p><strong>No encontramos resultados.</strong></p>
                    <p>Probá con otro título.</p>
                </div>
            )}
        </section>
    );
};

export default Catalogo;