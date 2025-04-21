import React, { useState, useEffect } from "react";
import BrancheContext from "./BrancheContext";
import { useFetch } from "../../Hooks/useCRUD";
import { useLocation, useNavigate } from "react-router-dom";

const BrancheProvider = ({ children }) => {
  const { data } = useFetch(["branchesActive"], "/branches/active");
  const [branches, setBranches] = useState([]);
  const [cinema, setCinema] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (data) {
      setBranches(data.branches);

      // Kiểm tra nếu có cinema đã lưu trong localStorage thì dùng, nếu không thì lấy mặc định từ API
      const savedCinema = localStorage.getItem("selectedCinema");
      if (savedCinema) {
        setCinema(JSON.parse(savedCinema));
      } else {
        const defaultCinema = data.branches[0]?.cinemas[0];
        if (defaultCinema) {
          setCinema(defaultCinema);
          localStorage.setItem("selectedCinema", JSON.stringify(defaultCinema));
        }
      }
    }
  }, [data]);

  const handleSetCinema = (newCinema) => {
    if (
      location.pathname.startsWith("/checkout") ||
      location.pathname.startsWith("/choose-seat")
    ) {
      navigate("/");
    }

    setCinema(newCinema);
    localStorage.setItem("selectedCinema", JSON.stringify(newCinema));
  };

  return (
    <BrancheContext.Provider
      value={{ branches, cinema, setCinema: handleSetCinema }}
    >
      {children}
    </BrancheContext.Provider>
  );
};

export default BrancheProvider;
