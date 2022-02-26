import { useNavigate } from "react-router-dom";

import "./trabajo.css";

const Trabajo = ({
  elemento: { compañia, updatedAt, estado, puesto, _id },
}) => {
  const navigate = useNavigate();

  const fecha = new Date(updatedAt);
  const options = { year: "numeric", month: "long", day: "numeric" };

  return (
    <div className="trabajo__contenedor">
      <p className="trabajo__fecha">
        {fecha.toLocaleDateString("es-ES", options)}
      </p>
      <h4>{puesto}</h4>
      <p className="trabajo__compañia">{compañia}</p>
      <div className="trabajo__elemento">
        <div className="trabajo__elemento__botones">
          <button
            className="boton__negro"
            onClick={() => navigate(`/editarEmpleo/${_id}`)}
          >
            EDITAR
          </button>
          <button
            className="boton__negro"
            onClick={() => navigate(`/eliminarEmpleo/${_id}`)}
          >
            ELIMINAR
          </button>
        </div>
        <p
          className={`${
            estado === "rechazado"
              ? "trabajo__estado__rechazado"
              : "trabajo__estado__pendiente"
          }`}
        >
          {estado}
        </p>
      </div>
    </div>
  );
};

// compañia: "gadis"
// creadoPor: "6203975d33fd094329603cd4"
// createdAt: "2022-02-09T10:41:39.889Z"
// estado: "pendiente"
// puesto: "programador junior"
// updatedAt: "2022-02-09T10:41:39.889Z"
// __v: 0
// _id: "62039a63ceaa33f436474d9d"

export default Trabajo;
