import { createContext } from "react";

const AuthContext = createContext({
  authUser: {},
  setAuthUser: () => {},
  permissions: null,
  setPermissions: () => {},
  role: null,
  setRole: () => {},
  roles: null,
  setRoles: () => {},
  hasPermission: () => {},
});

export default AuthContext;
