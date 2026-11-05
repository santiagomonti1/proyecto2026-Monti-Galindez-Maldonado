import { Outlet } from "react-router-dom";
import Header from "@components/Header";
import Footer from "@components/Footer";

/**
 * Plantilla común a todas las páginas: Header arriba, Footer abajo
 * y, en el medio, la página de la ruta activa.
 */
const Layout = () => {
    return (
        <div className="pagina">
            <Header />
            <main>
                <div className="contenedor">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Layout;