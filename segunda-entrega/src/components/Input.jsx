/**
 * Campo de texto genérico con su etiqueta y su mensaje de error.
 * Se reutiliza en Login, Ficha, Inicio y Catálogo.
 *
 * El mensaje de error es accesible:
 * - aria-describedby asocia el input con su mensaje, así un lector de pantalla lo lee junto al campo.
 * - aria-invalid avisa si el valor actual es incorrecto.
 * - role="alert" hace que el lector de pantalla anuncie el mensaje apenas aparece.
 *
 * @param {Object} props
 * @param {string} props.id - Id del input (también se usa para el label y el mensaje de error)
 * @param {string} props.label - Texto de la etiqueta
 * @param {string} props.type - Tipo de input: text, password, date...
 * @param {string} props.value - Valor actual (viene del estado de la página)
 * @param {Function} props.onChange - Función que se ejecuta cada vez que el usuario escribe
 * @param {string} props.placeholder - Texto de ayuda dentro del campo
 * @param {number} props.maxLength - Cantidad máxima de caracteres
 * @param {string} props.error - Mensaje de error; si está vacío, el campo es correcto
 */
const Input = ({ id, label, type, value, onChange, placeholder, maxLength, error = "" }) => {
    return (
        <div className="campo">
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                maxLength={maxLength}
                aria-invalid={error !== ""}
                aria-describedby={`${id}-error`}
            />
            <p id={`${id}-error`} className="mensaje-error" role="alert">{error}</p>
        </div>
    );
};

export default Input;