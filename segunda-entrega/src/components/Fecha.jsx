/**
 * Muestra una fecha con el formato DD/MM/AAAA dentro de una etiqueta <time>.
 * Se reutiliza en Ficha y en Mi diario.
 * @param {Object} props
 * @param {string} props.valor - Fecha en formato AAAA-MM-DD, como la guarda el input date
 */
const Fecha = ({ valor }) => {
    const partes = valor.split("-");

    return <time dateTime={valor}>{`${partes[2]}/${partes[1]}/${partes[0]}`}</time>;
};

export default Fecha;