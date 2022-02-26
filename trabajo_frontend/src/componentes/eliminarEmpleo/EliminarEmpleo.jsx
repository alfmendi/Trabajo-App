import { useState, useEffect, useContext } from "react";

import { useParams, useNavigate, useLocation } from "react-router-dom";

import { FormControl, InputLabel, Input } from "@mui/material";

import useAxiosPrivado from "../../hooks/useAxiosPrivado";

import TrabajosContext from "../../context/trabajos/TrabajosContext";

import "./eliminarEmpleo.css";

const EliminarEmpleo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivado = useAxiosPrivado();
  const { trabajoId } = useParams();
  const { trabajos, setTrabajos } = useContext(TrabajosContext);

  const [compañia, setCompañia] = useState("");
  const [puesto, setPuesto] = useState("");
  const [estado, setEstado] = useState("");

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const obtenerTrabajo = async () => {
      try {
        const resultado = await axiosPrivado.get(`/api/trabajos/${trabajoId}`, {
          signal: controller.signal,
        });
        isMounted && setCompañia(resultado.data.compañia);
        isMounted && setPuesto(resultado.data.puesto);
        isMounted && setEstado(resultado.data.estado);
      } catch (error) {
        console.log("Error.message en EliminarEmpleo vale...", error.message);
        // IMPORTANTE
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    obtenerTrabajo();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const eliminarSolicitud = async (e) => {
    e.preventDefault();
    try {
      await axiosPrivado.delete(`/api/trabajos/${trabajoId}`);
      setTrabajos(trabajos.filter((elemento) => elemento.id !== trabajoId));
      navigate("/");
    } catch (error) {
      console.log("Error.message en EliminarEmpleo vale...", error.message);
      // IMPORTANTE
      navigate("/login", { state: { from: location }, replace: true });
    }
  };

  return (
    <div className="eliminarEmpleo__contenedor">
      <form className="eliminarEmpleo__formulario" onSubmit={eliminarSolicitud}>
        <h3>Eliminar solicitud</h3>
        <div className="eliminarEmpleo__entradas">
          <FormControl variant="standard" size="small" fullWidth={true}>
            <InputLabel
              sx={{ fontSize: { movil: 12, movilGrande: "1rem" } }}
              htmlFor="eliminarEmpleo__compañia"
            >
              Compañia
            </InputLabel>
            <Input
              sx={{
                fontSize: { movil: 12, movilGrande: "1rem", border: 4 },
              }}
              id="eliminarEmpleo__compañia"
              value={compañia}
              label="Compañia"
              disabled
            />
          </FormControl>
          <FormControl variant="standard" size="small" fullWidth={true}>
            <InputLabel
              sx={{ fontSize: { movil: 12, movilGrande: "1rem" } }}
              htmlFor="eliminarEmpleo__puesto"
            >
              Puesto
            </InputLabel>
            <Input
              sx={{
                fontSize: { movil: 12, movilGrande: "1rem", border: 4 },
              }}
              id="eliminarEmpleo__puesto"
              value={puesto}
              label="Puesto"
              disabled
            />
          </FormControl>
          <FormControl variant="standard" size="small" fullWidth={true}>
            <InputLabel
              sx={{ fontSize: { movil: 12, movilGrande: "1rem" } }}
              htmlFor="eliminarEmpleo__estado"
            >
              Estado
            </InputLabel>
            <Input
              sx={{
                fontSize: { movil: 12, movilGrande: "1rem", border: 4 },
              }}
              id="eliminarEmpleo__estado"
              value={estado}
              label="Estado"
              disabled
            />
          </FormControl>
          <div className="eliminarEmpleo__botones">
            <button
              type="button"
              className="boton__negro"
              onClick={() => navigate("/")}
            >
              CANCELAR
            </button>
            <button type="submit" className="boton__azul">
              ELIMINAR
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EliminarEmpleo;
