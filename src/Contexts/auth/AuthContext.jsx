import { createContext } from "react";

const AuthContext = createContext({
  authUser: {},
  setAuthUser: () => {},
  permissions: null,
  setPermissions: () => {},
  role: null,
  setRole: () => {},
  hasPermission: () => {},
});

export default AuthContext;
