import { useNavigate } from "react-router-dom";

import "./paginaNoEncontrada.css";

const PaginaNoEncontrada = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Página no encontrada</h2>
      <button onClick={() => navigate("/")}>Volver</button>
    </div>
  );
};

export default PaginaNoEncontrada;
