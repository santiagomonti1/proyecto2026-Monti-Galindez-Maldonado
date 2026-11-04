import { NavLink, useNavigate } from "react-router-dom";
import logo from "@assets/logo.png";

/**
 * Encabezado del sitio con el logo y el menú.
 * Muestra "Mi diario" y "Cerrar sesión" solo si hay una sesión iniciada (issues #9 y #13).
 */
const Header = () => {
    const navigate = useNavigate();
    const usuario = localStorage.getItem("usuarioActivo");

    /**
     * Cierra la sesión borrando el usuario guardado y lleva al login.
     */
    const cerrarSesion = () => {
        localStorage.removeItem("usuarioActivo");
        navigate("/login");
    };

    return (
        <header className="encabezado">
            <div className="contenedor">
                <img src={logo} alt="Logo Filmoteca" className="logo" />
                <h1>Filmoteca</h1>

                <nav>
                    <ul className="menu-lista">
                        <li><NavLink to="/">Inicio</NavLink></li>
                        <li><NavLink to="/catalogo">Catálogo</NavLink></li>
                        {usuario && <li><NavLink to="/diario">Mi diario</NavLink></li>}
                        {usuario && (
                            <li>
                                <button type="button" className="boton-menu" onClick={cerrarSesion}>
                                    Cerrar sesión
                                </button>
                            </li>
                        )}
                        {!usuario && <li><NavLink to="/login">Ingresar</NavLink></li>}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;