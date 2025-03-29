import { useState } from "react";
import PropTypes from "prop-types";
import AuthContext from "./AuthContext";

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
