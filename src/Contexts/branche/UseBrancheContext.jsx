// src/context/useBrancheContext.js
import { useContext } from "react";
import BrancheContext from "./BrancheContext";

export const useBrancheContext = () => {
  return useContext(BrancheContext);
};
