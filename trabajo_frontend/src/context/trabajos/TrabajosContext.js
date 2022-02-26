import { useState, createContext } from "react";

const TrabajosContext = createContext();

export const TrabajosProvider = ({ children }) => {
  const [trabajos, setTrabajos] = useState([]);

  return (
    <TrabajosContext.Provider value={{ trabajos, setTrabajos }}>
      {children}
    </TrabajosContext.Provider>
  );
};

export default TrabajosContext;
