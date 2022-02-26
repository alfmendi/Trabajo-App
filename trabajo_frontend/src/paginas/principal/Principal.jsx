import FormularioEmpleo from "../../componentes/formularioEmpleo/FormularioEmpleo";
import ListaTrabajos from "../../componentes/listaTrabajos/ListaTrabajos";

import "./principal.css";

const Principal = () => {
  return (
    <div className="principal__contenedor">
      <FormularioEmpleo />
      <ListaTrabajos />
    </div>
  );
};

export default Principal;
