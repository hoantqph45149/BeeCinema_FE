import React from "react";
import { Navigate, Route } from "react-router-dom";
import { useAuthContext } from "../Contexts/auth/UseAuth";

const AuthProtected = ({ children }) => {
  const { authUser } = useAuthContext();

  if (!authUser) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

const CheckRouteVerifiedEmail = ({ children }) => {
  const { authUser } = useAuthContext();
  if (!authUser || !authUser?.email_verified_at) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

const CheckRouteAuth = ({ children }) => {
  const { authUser } = useAuthContext();

  if (authUser) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

const CheckRouteAdmin = ({ children }) => {
  const { authUser } = useAuthContext();
  console.log(authUser?.role);
  if (authUser?.role !== "admin") {
    return (window.location.href = "/");
  }

  if (!authUser) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

const AccessRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <>
            {" "}
            <Component {...props} />{" "}
          </>
        );
      }}
    />
  );
};

export {
  AccessRoute,
  AuthProtected,
  CheckRouteAuth,
  CheckRouteAdmin,
  CheckRouteVerifiedEmail,
};
