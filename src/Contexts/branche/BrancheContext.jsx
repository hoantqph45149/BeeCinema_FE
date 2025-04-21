import { createContext } from "react";

const BrancheContext = createContext({
  branches: [],
  cinema: "",
  setCinema: () => {},
});

export default BrancheContext;
