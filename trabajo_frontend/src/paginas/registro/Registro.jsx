import { useState, useEffect, useContext } from "react";

import { Link, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axiosPublica from "../../axiosAPI/axios";

import UsuarioContext from "../../context/usuario/UsuarioContext";

import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Input,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import "./registro.css";

const Registro = () => {
  const navigate = useNavigate();
  const { setUsuario } = useContext(UsuarioContext);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);

  useEffect(() => {
    // console.log("Entro en useEffect de Registro.js...");
  }, []);

  const gestionarRegistro = async (e) => {
    e.preventDefault();
    const credenciales = { nombre, email, password };
    try {
      const usuario = await axiosPublica.post(
        "/api/auth/registro",
        credenciales
      );
      setNombre("");
      setEmail("");
      setPassword("");
      setUsuario(usuario.data);
      navigate("/login");
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
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        // className: "registro__container__toastify",
        bodyClassName: "registro__texto__toastify",
      });
    }
  };

  return (
    <div className="registro__contenedor">
      <ToastContainer />
      <form onSubmit={gestionarRegistro} className="registro__card">
        <div className="registro__card__titulo">
          <h2>Regístrate</h2>
        </div>
        <div className="registro__card__entradas">
          <FormControl variant="standard" size="small" required>
            <InputLabel
              sx={{ fontSize: { movil: 12, movilGrande: "1rem" } }}
              htmlFor="registro__nombre"
            >
              Nombre
            </InputLabel>
            <Input
              sx={{
                fontSize: { movil: 12, movilGrande: "1rem", border: 4 },
              }}
              id="registro__nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              label="Nombre"
              // autoComplete="off"
            />
          </FormControl>
          <FormControl variant="standard" size="small" required>
            <InputLabel
              sx={{ fontSize: { movil: 12, movilGrande: "1rem" } }}
              htmlFor="registro__email"
            >
              Email
            </InputLabel>
            <Input
              sx={{
                fontSize: { movil: 12, movilGrande: "1rem", border: 4 },
              }}
              id="registro__email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              // autoComplete="off"
            />
          </FormControl>
          <FormControl variant="standard" size="small" required>
            <InputLabel
              sx={{ fontSize: { movil: 12, movilGrande: "1rem" } }}
              htmlFor="registro__password"
            >
              Password
            </InputLabel>
            <Input
              sx={{ fontSize: { movil: 12, movilGrande: "1rem" } }}
              id="registro__password"
              type={mostrarPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setMostrarPassword((valorAnterior) => !valorAnterior)
                    }
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {mostrarPassword ? (
                      <VisibilityOff
                        sx={{
                          height: { movil: 15, movilGrande: 24 },
                          width: { movil: 15, movilGrande: 24 },
                        }}
                      />
                    ) : (
                      <Visibility
                        sx={{
                          height: { movil: 15, movilGrande: 24 },
                          width: { movil: 15, movilGrande: 24 },
                        }}
                      />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </div>
        <div className="registro__card__footer">
          <button type="submit" className="boton__azul">
            REGÍSTRATE AHORA
          </button>
          <p>
            ¿Ya tienes una cuenta? <Link to="/">Inicia Sesión</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Registro;
