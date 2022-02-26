import { useEffect, useContext } from "react";

import { Navigate, Outlet } from "react-router-dom";

import PlantillaPagina from "./plantillaPagina/PlantillaPagina";

import UsuarioContext from "../context/usuario/UsuarioContext";

const RutaPrivada = () => {
  const { usuario } = useContext(UsuarioContext);

  useEffect(() => {
    // console.log("RutaPrivada -> useEffect -> Entro...");
  }, []);

  return usuario ? <Outlet /> : <Navigate to="/login" />;
};

export default RutaPrivada;
