import { Link } from "react-router-dom";

/**
 * Tarjeta con el póster, el título y el año de una película.
 * Se reutiliza en Inicio y en Mi diario.
 * Lo que cambia en cada página (director, puntaje...) se pasa como children.
 * @param {Object} props
 * @param {Object} props.pelicula - Datos de la película (id, titulo, anio, imagen)
 * @param {*} props.children - Contenido extra que se muestra debajo del título
 */
const TarjetaPelicula = ({ pelicula, children }) => {
    return (
        <article className="tarjeta">
            <img src={`/imagenes/${pelicula.imagen}`} alt={`Póster de ${pelicula.titulo}`} className="poster" />
            <div className="tarjeta-info">
                <h3>
                    <Link to={`/pelicula/${pelicula.id}`}>{pelicula.titulo} ({pelicula.anio})</Link>
                </h3>
                {children}
            </div>
        </article>
    );
};

export default TarjetaPelicula;