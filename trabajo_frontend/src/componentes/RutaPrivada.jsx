import { useContext } from "react";

import { Navigate, Outlet } from "react-router-dom";

import UsuarioContext from "../context/usuario/UsuarioContext";

const RutaPrivada = () => {
  const { usuario } = useContext(UsuarioContext);

  return usuario ? <Outlet /> : <Navigate to="/login" />;
};

export default RutaPrivada;
