import React, { useState, useEffect } from "react";
import BrancheContext from "./BrancheContext";
import { useFetch } from "../../Hooks/useCRUD";

const BrancheProvider = ({ children }) => {
  const { data } = useFetch(["branchesActive"], "/branches/active");
  const [branches, setBranches] = useState([]);
  const [cinema, setCinema] = useState("");

  useEffect(() => {
    if (data) {
      setBranches(data.branches);
      setCinema(data.branches[0]?.cinemas[0]);
    }
  }, [data]);

  return (
    <BrancheContext.Provider value={{ branches, cinema, setCinema }}>
      {children}
    </BrancheContext.Provider>
  );
};

export default BrancheProvider;
