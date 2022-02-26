import { useEffect, useContext } from "react";

import { axiosPrivado } from "../axiosAPI/axios";

import UsuarioContext from "../context/usuario/UsuarioContext";

import useRefreshToken from "./useRefreshToken";

const useAxiosPrivado = () => {
  const refrescar = useRefreshToken();
  const { usuario } = useContext(UsuarioContext);

  useEffect(() => {
    const requestInterceptor = axiosPrivado.interceptors.request.use(
      (config) => {
        if (!config.headers["authorization"]) {
          config.headers["authorization"] = `Bearer ${usuario.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosPrivado.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest.enviado) {
          prevRequest.enviado = true;
          const nuevoAccessToken = await refrescar();
          prevRequest.headers["authorization"] = `Bearer ${nuevoAccessToken}`;
          return axiosPrivado(prevRequest);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosPrivado.interceptors.request.eject(requestInterceptor);
      axiosPrivado.interceptors.response.eject(responseInterceptor);
    };
  }, [usuario, refrescar]);

  return axiosPrivado;
};

export default useAxiosPrivado;
// Agrega un interceptor a la instancia privada de axios
