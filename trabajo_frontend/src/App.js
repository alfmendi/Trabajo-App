import { useEffect, useContext } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate,
} from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import UsuarioContext from "./context/usuario/UsuarioContext";

import LoginPersistente from "./componentes/LoginPersistente";
import RutaPrivada from "./componentes/RutaPrivada";
import PlantillaPagina from "./componentes/plantillaPagina/PlantillaPagina";

import Login from "./paginas/login/Login";
import Registro from "./paginas/registro/Registro";
import Principal from "./paginas/principal/Principal";
import Acerca from "./paginas/acerca/Acerca";
import PaginaNoEncontrada from "./paginas/paginaNoEncontrada/PaginaNoEncontrada";

import EditarEmpleo from "./componentes/editarEmpleo/EditarEmpleo";
import EliminarEmpleo from "./componentes/eliminarEmpleo/EliminarEmpleo";

import "./app.css";

// Defino los diferentes tamaños para hacer el diseño de la aplicación responsive
const theme = createTheme({
  breakpoints: {
    values: {
      movil: 0,
      movilGrande: 480,
      tableta: 768,
      laptop: 1024,
      desktop: 1280,
    },
  },
});

const App = () => {
  const { usuario } = useContext(UsuarioContext);

  useEffect(() => {
    // console.log("App -> useEffect -> Entro...");
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/">
            {/* Rutas públicas */}
            <Route path="login" element={<Login />} />
            <Route path="registro" element={<Registro />} />
            {/* Rutas protegidas */}
            <Route element={<LoginPersistente />}>
              <Route element={<RutaPrivada />}>
                <Route element={<PlantillaPagina />}>
                  <Route path="" element={<Principal />} />
                  <Route
                    path="editarEmpleo/:trabajoId"
                    element={<EditarEmpleo />}
                  />
                  <Route
                    path="eliminarEmpleo/:trabajoId"
                    element={<EliminarEmpleo />}
                  />
                  <Route path="acerca" element={<Acerca />} />
                </Route>
              </Route>
            </Route>
            {/* Ruta no válida */}
            <Route path="*" element={<PaginaNoEncontrada />} />
            {/* <Route
              path="*"
              element={<Navigate to={`${usuario ? "/" : "/login"}`} />}
            /> */}
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
