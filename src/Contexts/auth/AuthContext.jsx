import { createContext } from "react";

const AuthContext = createContext({
  authUser: {},
  setAuthUser: () => {},
});

export default AuthContext;
