import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "@components/Input";
import Button from "@components/Button";
import { obtenerUsuario } from "@api/filmotecaApi";

/**
 * Devuelve el mensaje de error del usuario, o "" si es correcto.
 * @param {string} valor - Usuario ingresado
 * @returns {string} Mensaje de error
 */
const validarUsuario = (valor) => {
    if (valor.trim() === "") {
        return "Ingresá tu usuario.";
    }

    if (valor.trim().length < 3) {
        return "El usuario debe tener al menos 3 caracteres.";
    }

    return "";
};

/**
 * Devuelve el mensaje de error de la contraseña, o "" si es correcta.
 * @param {string} valor - Contraseña ingresada
 * @returns {string} Mensaje de error
 */
const validarContrasena = (valor) => {
    if (valor === "") {
        return "Ingresá tu contraseña.";
    }

    if (valor.length < 6) {
        return "La contraseña debe tener al menos 6 caracteres.";
    }

    return "";
};

/**
 * Página de inicio de sesión.
 * Valida los campos mientras el usuario escribe y, al ingresar,
 * busca el usuario en el mock y guarda la sesión en localStorage.
 */
const Login = () => {
    const [usuario, setUsuario] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [errorUsuario, setErrorUsuario] = useState("");
    const [errorContrasena, setErrorContrasena] = useState("");
    const [errorServidor, setErrorServidor] = useState("");
    const navigate = useNavigate();

    useEffect(() => {                         
        document.title = "Filmoteca | Iniciar sesión"; 
    }, []);

    /**
     * Guarda lo que se escribe en el usuario y lo valida en el momento.
     * @param {Object} e - Evento del input
     */
    const cambiarUsuario = (e) => {
        setUsuario(e.target.value);
        setErrorUsuario(validarUsuario(e.target.value));
    };

    /**
     * Guarda lo que se escribe en la contraseña y la valida en el momento.
     * @param {Object} e - Evento del input
     */
    const cambiarContrasena = (e) => {
        setContrasena(e.target.value);
        setErrorContrasena(validarContrasena(e.target.value));
    };

    /**
     * Valida los dos campos y, si son correctos, compara con los datos del mock.
     * Si el usuario y la contraseña coinciden, guarda la sesión y lleva al inicio.
     */
    const ingresar = async () => {
        const mensajeUsuario = validarUsuario(usuario);
        const mensajeContrasena = validarContrasena(contrasena);

        setErrorUsuario(mensajeUsuario);
        setErrorContrasena(mensajeContrasena);
        setErrorServidor("");

        if (mensajeUsuario !== "" || mensajeContrasena !== "") {
            return;
        }

        try {
            const nombre = usuario.trim().toLowerCase();
            const encontrado = await obtenerUsuario(nombre);

            if (encontrado === undefined) {
                setErrorUsuario("Ese usuario no existe.");
                return;
            }

            if (encontrado.contrasena !== contrasena) {
                setErrorContrasena("Contraseña incorrecta. Intentá de nuevo.");
                return;
            }

            localStorage.setItem("usuarioActivo", nombre);
            navigate("/");
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            setErrorServidor("No se pudo conectar con el servidor. Probá de nuevo en unos minutos.");
        }
    };

    return (
        <section className="caja-login">
            <h2>Iniciar sesión</h2>

            <div className="formulario">
                <Input
                    id="usuario"
                    label="Usuario"
                    type="text"
                    value={usuario}
                    onChange={cambiarUsuario}
                    placeholder="Ej: santiago"
                    maxLength={20}
                    error={errorUsuario}
                />

                <Input
                    id="contrasena"
                    label="Contraseña"
                    type="password"
                    value={contrasena}
                    onChange={cambiarContrasena}
                    maxLength={20}
                    error={errorContrasena}
                />

                <Button onClick={ingresar}>Ingresar</Button>
                <p className="mensaje-error" role="alert">{errorServidor}</p>
            </div>

            <p><Link to="/">Volver al inicio</Link></p>
        </section>
    );
};

export default Login;