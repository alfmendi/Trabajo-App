import { useEffect } from "react";

import "./acerca.css";

const Acerca = () => {
  useEffect(() => {
    console.log("Entro en useEffect de Acerca.js...");
  }, []);

  return (
    <div className="acerca__contenedor">
      <p>
        Aplicación que permite gestionar todas las solicitudes de empleo
        asociadas a un usuario. Permite la creación, consulta, modificación y
        eliminación de dichas solicitudes. Toda la información relativa a cada
        usuario se almacena de forma permanente en una base de datos. Para poder
        acceder a la aplicación, es necesario registrarse. El proyecto completo
        está formado por un servidor RESTful API desarrollado mediante NodeJS y
        Express. Para dar vida a la base de datos se ha utilizado MongoDB. El
        acceso a los diferentes recursos privados del servidor se lleva a cabo
        empleando TOKENS (Json Web Token). La interfaz de usuario se ha
        desarrollado empleando React.
      </p>
    </div>
  );
};

export default Acerca;
