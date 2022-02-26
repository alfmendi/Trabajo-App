import { useContext } from "react";

import { useNavigate } from "react-router-dom";

import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import MenuOpenSharpIcon from "@mui/icons-material/MenuOpenSharp";

import axios from "../../axiosAPI/axios";

import UsuarioContext from "../../context/usuario/UsuarioContext";

import "./navbarSuperior.css";

const NavbarSuperior = ({ ocultarMenu, manejarOcultarMenu }) => {
  const { usuario, setUsuario } = useContext(UsuarioContext);
  const navigate = useNavigate();

  const salir = async () => {
    setUsuario(null);
    try {
      await axios.get("/api/tokens/borrarRefreshToken");
    } catch (error) {
      console.log("NavbarSuperior -> Error en salir...", error);
    }
    navigate("/login");
  };

  return (
    <div className="navbar__superior__contenedor">
      <div className="navbar__superior__izquierda ">
        {!ocultarMenu && (
          <MenuOpenSharpIcon
            className="navbar__superior__boton__abrirMenu"
            onClick={manejarOcultarMenu}
          />
        )}

        {ocultarMenu && (
          <MenuSharpIcon
            className="navbar__superior__boton__cerrarMenu"
            onClick={manejarOcultarMenu}
          />
        )}
      </div>
      <div className="navbar__superior__derecha">
        <p>{usuario?.nombre}</p>
        <button onClick={salir} className="boton__azul">
          SALIR
        </button>
      </div>
    </div>
  );
};

export default NavbarSuperior;
