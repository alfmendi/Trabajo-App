import { useState, useEffect, useContext } from "react";

import { Outlet } from "react-router-dom";

import useRefreshToken from "../hooks/useRefreshToken";

import UsuarioContext from "../context/usuario/UsuarioContext";

import Spinner from "./spinner/Spinner";

const LoginPersistente = () => {
  const { usuario } = useContext(UsuarioContext);
  const [estaCargando, setEstaCargando] = useState(true);
  const refrescar = useRefreshToken();

  useEffect(() => {
    const verificarToken = async () => {
      try {
        await refrescar();
      } catch (error) {
        console.log("Error en LoginPersistente...", error);
      } finally {
        setEstaCargando(false);
      }
    };
    !usuario?.accessToken ? verificarToken() : setEstaCargando(false);
  }, []);

  return <>{estaCargando ? <Spinner /> : <Outlet />}</>;
};

export default LoginPersistente;
