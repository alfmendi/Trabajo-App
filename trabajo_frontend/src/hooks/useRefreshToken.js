import { useContext } from "react";

import UsuarioContext from "../context/usuario/UsuarioContext";

import axios from "../axiosAPI/axios";

const useRefreshToken = () => {
  const { setUsuario } = useContext(UsuarioContext);

  const refrescar = async () => {
    const respuesta = await axios.get("/api/tokens/refrescarAccessToken", {
      withCredentials: true,
    });
    setUsuario(respuesta.data);
    return respuesta.data.accessToken;
  };

  return refrescar;
};

export default useRefreshToken;
