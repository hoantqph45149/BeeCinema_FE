import React from "react";
import { Navigate, Route } from "react-router-dom";

const AuthProtected = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user || !user.token) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

const CheckRouteVerifiedEmail = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user || !user.token || !user.user.email_verified_at) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

const CheckRouteAuth = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (user?.user || user?.token) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

const CheckRouteAdmin = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (user?.user?.role !== "admin") {
    return (window.location.href = "/");
  }

  if (!user || !user.token) {
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
