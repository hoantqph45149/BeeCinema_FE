import { createContext } from "react";

const AuthContext = createContext({
  authUser: {},
  setAuthUser: () => {},
  permissions: null,
  setPermissions: () => {},
  role: null,
  setRole: () => {},
});

export default AuthContext;
