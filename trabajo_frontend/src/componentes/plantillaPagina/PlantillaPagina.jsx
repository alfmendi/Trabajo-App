import { useState, useEffect } from "react";

import { Outlet } from "react-router-dom";

import NavbarIzquierda from "../navbarIzquierda/NavbarIzquierda";
import NavbarSuperior from "../navbarSuperior/NavbarSuperior";

import "./plantillaPagina.css";

// Componente que define cual es el diseño común de cada página
const PlantillaPagina = () => {
  const [ocultarMenu, setOcultarMenu] = useState(false);

  useEffect(() => {
    // console.log("PlantillaPagina -> useEffect -> Entro...");
  }, []);

  const manejarOcultarMenu = () => {
    setOcultarMenu((estadoPrevio) => !estadoPrevio);
  };

  return (
    <div className="plantillaPagina__contenedor">
      {ocultarMenu && (
        <div className={`plantillaPagina__izquierda`}>
          <NavbarIzquierda manejarOcultarMenu={manejarOcultarMenu} />
        </div>
      )}
      <div
        className={`plantillaPagina__derecha ${
          ocultarMenu && "width__0__movil"
        }`}
      >
        <NavbarSuperior
          ocultarMenu={ocultarMenu}
          manejarOcultarMenu={manejarOcultarMenu}
        />
        <Outlet />
      </div>
    </div>
  );
};

export default PlantillaPagina;
