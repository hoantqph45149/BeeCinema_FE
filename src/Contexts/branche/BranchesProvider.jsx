import React, { useState, useEffect } from "react";
import BrancheContext from "./BrancheContext";

const BrancheProvider = ({ children }) => {
  const [branches, setBranches] = useState([]);
  const [cinema, setCinema] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/branches")
      .then((res) => res.json())
      .then((res) => {
        setBranches(res);
        setCinema(res[0].cinemas[0]);
      });
  }, []);

  return (
    <BrancheContext.Provider value={{ branches, cinema, setCinema }}>
      {children}
    </BrancheContext.Provider>
  );
};

export default BrancheProvider;
