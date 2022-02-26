import spinner from "../../assets/spinning-loading.gif";

import "./spinner.css";

const Spinner = () => {
  return (
    <div className="spinner__container">
      <img src={spinner} alt="cargando datos"></img>
    </div>
  );
};

export default Spinner;
