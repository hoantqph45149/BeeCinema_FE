import PropTypes from "prop-types";
import { useCallback, useState } from "react";
import AuthContext from "./AuthContext";

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [permissions, setPermissions] = useState(null);
  const [role, setRole] = useState(null);
  const [roles, setRoles] = useState(null);

  const hasPermission = useCallback(
    (permissionKey) => {
      if (!permissions || permissions.length === 0) return false;
      return permissions.includes(permissionKey);
    },
    [permissions]
  );
  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
        permissions,
        setPermissions,
        role,
        setRole,
        roles,
        setRoles,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
