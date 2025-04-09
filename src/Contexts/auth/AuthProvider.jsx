import PropTypes from "prop-types";
import { useState } from "react";
import AuthContext from "./AuthContext";

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [permissions, setPermissions] = useState(null);
  const [role, setRole] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
        permissions,
        setPermissions,
        role,
        setRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
