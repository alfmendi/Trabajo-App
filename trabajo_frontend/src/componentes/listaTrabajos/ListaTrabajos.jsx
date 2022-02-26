import { useContext, useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import useAxiosPrivado from "../../hooks/useAxiosPrivado";

import TrabajosContext from "../../context/trabajos/TrabajosContext";

import Trabajo from "../trabajo/Trabajo";

import "./listaTrabajos.css";

const ListaTrabajos = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivado = useAxiosPrivado();
  const { trabajos, setTrabajos } = useContext(TrabajosContext);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const obtenerTrabajos = async () => {
      try {
        const resultado = await axiosPrivado.get("/api/trabajos", {
          signal: controller.signal,
        });
        isMounted && setTrabajos(resultado.data);
      } catch (error) {
        console.log("Error.message en ListaTrabajos vale...", error.message);
        // IMPORTANTE
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    obtenerTrabajos();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className="listaTrabajos__contenedor">
      {trabajos.length > 0 &&
        trabajos?.map((elemento) => {
          return <Trabajo key={elemento._id} elemento={elemento} />;
        })}

      {trabajos.length === 0 && <h3>No existe ninguna solicitud</h3>}
    </div>
  );
};

export default ListaTrabajos;
