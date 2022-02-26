import { useState, useEffect, useContext } from "react";

import { useParams, useNavigate, useLocation } from "react-router-dom";

import {
  FormControl,
  InputLabel,
  Input,
  Select,
  MenuItem,
} from "@mui/material";

import useAxiosPrivado from "../../hooks/useAxiosPrivado";

import TrabajosContext from "../../context/trabajos/TrabajosContext";

import "./editarEmpleo.css";

const EditarEmpleo = () => {
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
        console.log("Error.message en EditarEmpleo vale...", error.message);
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

  const editarSolicitud = async (e) => {
    e.preventDefault();
    try {
      await axiosPrivado.patch(`/api/trabajos/${trabajoId}`, {
        compañia,
        puesto,
        estado,
      });
      setTrabajos(trabajos.filter((elemento) => elemento.id !== trabajoId));
      navigate("/");
    } catch (error) {
      console.log("Error.message en EliminarEmpleo vale...", error.message);
      // IMPORTANTE
      navigate("/login", { state: { from: location }, replace: true });
    }
  };

  return (
    <div className="editarEmpleo__contenedor">
      <form className="editarEmpleo__formulario" onSubmit={editarSolicitud}>
        <h3>Editar solicitud</h3>
        <div className="editarEmpleo__entradas">
          <FormControl
            variant="standard"
            size="small"
            fullWidth={true}
            required
          >
            <InputLabel
              sx={{ fontSize: { movil: 12, movilGrande: "1rem" } }}
              htmlFor="editarEmpleo__compañia"
            >
              Compañia
            </InputLabel>
            <Input
              sx={{
                fontSize: { movil: 12, movilGrande: "1rem", border: 4 },
              }}
              id="editarEmpleo__compañia"
              value={compañia}
              onChange={(e) => setCompañia(e.target.value)}
              label="Compañia"
            />
          </FormControl>
          <FormControl
            variant="standard"
            size="small"
            fullWidth={true}
            required
          >
            <InputLabel
              sx={{ fontSize: { movil: 12, movilGrande: "1rem" } }}
              htmlFor="editarEmpleo__puesto"
            >
              Puesto
            </InputLabel>
            <Input
              sx={{
                fontSize: { movil: 12, movilGrande: "1rem", border: 4 },
              }}
              id="editarEmpleo__puesto"
              value={puesto}
              onChange={(e) => setPuesto(e.target.value)}
              label="Puesto"
            />
          </FormControl>
          <FormControl
            variant="standard"
            size="small"
            fullWidth={true}
            required
          >
            <InputLabel
              sx={{ fontSize: { movil: 12, movilGrande: "1rem" } }}
              htmlFor="editarEmpleo__estado"
            >
              Estado
            </InputLabel>
            <Select
              sx={{ fontSize: { movil: 12, movilGrande: "1rem" } }}
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              label="Estado"
            >
              <MenuItem
                sx={{ fontSize: { movil: 12, movilGrande: "1rem" } }}
                value={"pendiente"}
              >
                Pendiente
              </MenuItem>
              <MenuItem
                sx={{ fontSize: { movil: 12, movilGrande: "1rem" } }}
                value={"entrevistado"}
              >
                Entrevistado
              </MenuItem>
              <MenuItem
                sx={{ fontSize: { movil: 12, movilGrande: "1rem" } }}
                value={"rechazado"}
              >
                Rechazado
              </MenuItem>
            </Select>
          </FormControl>
          <div className="editarEmpleo__botones">
            <button
              type="button"
              className="boton__negro"
              onClick={() => navigate("/")}
            >
              CANCELAR
            </button>
            <button type="submit" className="boton__azul">
              MODIFICAR
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditarEmpleo;
