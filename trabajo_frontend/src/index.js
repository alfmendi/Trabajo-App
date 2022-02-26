import React from "react";
import ReactDOM from "react-dom";

import { UsuarioProvider } from "./context/usuario/UsuarioContext";
import { TrabajosProvider } from "./context/trabajos/TrabajosContext";

import App from "./App";

import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <UsuarioProvider>
      <TrabajosProvider>
        <App />
      </TrabajosProvider>
    </UsuarioProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
