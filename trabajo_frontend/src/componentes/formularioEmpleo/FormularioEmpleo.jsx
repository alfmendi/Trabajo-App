import { useState, useContext } from "react";

import { FormControl, InputLabel, Input } from "@mui/material";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import { axiosPrivado } from "../../axiosAPI/axios";
import useAxiosPrivado from "../../hooks/useAxiosPrivado";

import TrabajosContext from "../../context/trabajos/TrabajosContext";

import "./formularioEmpleo.css";

const FormularioEmpleo = () => {
  const axiosPrivado = useAxiosPrivado();
  const { trabajos, setTrabajos } = useContext(TrabajosContext);
  const [compañia, setCompañia] = useState("");
  const [puesto, setPuesto] = useState("");

  const crearSolicitud = async (e) => {
    e.preventDefault();
    try {
      const resultado = await axiosPrivado.post("/api/trabajos", {
        compañia,
        puesto,
        estado: "pendiente",
      });
      const trabajosAux = [...trabajos];
      trabajosAux.unshift(resultado.data);
      setTrabajos(trabajosAux);
      toast.success("Solicitud creada", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        className: "formularioEmpleo__contenedor__toastify",
        bodyClassName: "formularioEmpleo__texto__toastify",
      });
      setCompañia("");
      setPuesto("");
    } catch (error) {
      let mensajeError = "";
      if (!error?.response) {
        mensajeError = "No hay respuesta del servidor";
      } else {
        mensajeError = error.response.data.mensaje;
        if (Array.isArray(mensajeError)) {
          mensajeError = mensajeError.join("\n");
        }
      }
      toast.error(mensajeError, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        // className: "formularioEmpleo__contenedor__toastify",
        bodyClassName: "formularioEmpleo__texto__toastify",
      });
    }
  };

  return (
    <form className="formularioEmpleo__contenedor" onSubmit={crearSolicitud}>
      <ToastContainer className="formulario__toast" />
      <h3>Nueva solicitud</h3>
      <div className="formularioEmpleo__entradas">
        <FormControl variant="standard" size="small" fullWidth={true} required>
          <InputLabel
            sx={{ fontSize: { movil: 12, movilGrande: "1rem" } }}
            htmlFor="formularioEmpleo__compañia"
          >
            Compañia
          </InputLabel>
          <Input
            sx={{
              fontSize: { movil: 12, movilGrande: "1rem", border: 4 },
            }}
            id="formularioEmpleo__compañia"
            value={compañia}
            onChange={(e) => setCompañia(e.target.value)}
            label="Compañia"
            // autoComplete="off"
          />
        </FormControl>
        <FormControl variant="standard" size="small" fullWidth={true} required>
          <InputLabel
            sx={{ fontSize: { movil: 12, movilGrande: "1rem" } }}
            htmlFor="formularioEmpleo__puesto"
          >
            Puesto
          </InputLabel>
          <Input
            sx={{
              fontSize: { movil: 12, movilGrande: "1rem", border: 4 },
            }}
            id="formularioEmpleo__puesto"
            value={puesto}
            onChange={(e) => setPuesto(e.target.value)}
            label="Puesto"
            // autoComplete="off"
          />
        </FormControl>
      </div>
      <button type="submit" className="boton__azul">
        CREAR
      </button>
    </form>
  );
};

export default FormularioEmpleo;
