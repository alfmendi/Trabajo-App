import { NavLink } from "react-router-dom";

import CloseIcon from "@mui/icons-material/Close";

import "./navbarIzquierda.css";

const NavbarIzquierda = ({ manejarOcultarMenu }) => {
  return (
    <div className="navbar__izquierda__contenedor">
      <div className="navbar__izquierda__titulo">
        <h4>DASHBOARD</h4>
        <CloseIcon
          className="navbar__izquierda__boton__cerrarMenuX"
          onClick={manejarOcultarMenu}
        />
      </div>
      <hr />
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "navbar__izquierda__activa" : "navbar__izquierda__enlace"
        }
      >
        Gestión solicitudes
      </NavLink>
      <NavLink
        to="/acerca"
        className={({ isActive }) =>
          isActive ? "navbar__izquierda__activa" : "navbar__izquierda__enlace"
        }
      >
        Acerca de...
      </NavLink>
    </div>
  );
};

export default NavbarIzquierda;
