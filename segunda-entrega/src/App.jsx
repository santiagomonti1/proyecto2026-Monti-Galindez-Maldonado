import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@layout/Layout";
import Inicio from "@pages/Inicio";
import Catalogo from "@pages/Catalogo";
import Ficha from "@pages/Ficha";
import Diario from "@pages/Diario";
import Login from "@pages/Login";

/**
 * Componente principal: define qué página se muestra en cada ruta.
 * Todas las rutas son hijas de Layout, que las renderiza en su <Outlet />.
 */
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Inicio />} />
                    <Route path="catalogo" element={<Catalogo />} />
                    <Route path="pelicula/:id" element={<Ficha />} />
                    <Route path="diario" element={<Diario />} />
                    <Route path="login" element={<Login />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
