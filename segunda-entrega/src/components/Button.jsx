/**
 * Botón genérico del sitio. Se reutiliza en Login y en Ficha.
 * @param {Object} props
 * @param {Function} props.onClick - Función que se ejecuta al hacer clic
 * @param {*} props.children - Texto o contenido del botón
 */
const Button = ({ onClick, children }) => {
    return (
        <button type="button" className="boton" onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;