import { useEffect, useState } from "react";
import { matchPath, Navigate, useNavigate } from "react-router-dom";
import Loading from "../Components/Common/Loading";
import { useAuthContext } from "../Contexts/auth/UseAuth";
import { useFetch } from "../Hooks/useCRUD";
import { publicRoutes } from "./AllRoutes";

const convertPathToRegex = (path) => {
  // Handle empty or invalid paths
  if (!path || path === "") {
    return new RegExp("^/?$"); // Match root or empty path
  }

  // Handle wildcard routes
  if (path === "*") {
    return new RegExp(".*"); // Match any path
  }

  // Replace dynamic segments (e.g., :id) with regex capture group
  const regexPath = path
    .replace(/:[^/]+/g, "([^/]+)") // Replace :param with ([^/]+)
    .replace(/\*/g, ".*"); // Replace * with .*

  return new RegExp(`^${regexPath}$`);
};

const ProtectedRoute = ({ children }) => {
  const { setAuthUser, setRole, setPermissions, setRoles } = useAuthContext();
  const { data, isLoading, error } = useFetch(["user"], "/user", {
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnMount: false,
  });
  const {
    data: dataRoles,
    isLoading: isLoadingRoles,
    error: errorRoles,
  } = useFetch(["roles"], "/roles", {
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (data && dataRoles) {
      setAuthUser(data?.user);
      setRole(data?.user?.roles[0]);
      setPermissions(data?.user?.permissions);
      setRoles([...dataRoles, "admin"]);
    }
  }, [data, dataRoles, setRoles, setAuthUser, setRole, setPermissions]);

  const isPublicRoute = publicRoutes.some((route) => {
    const regex = convertPathToRegex(route.path);
    return window.location.pathname.match(regex) !== null;
  });

  if (error || errorRoles) {
    if (
      error?.response?.status === 401 ||
      errorRoles?.response?.status === 401
    ) {
      if (!isPublicRoute) {
        return <Navigate to="/login" />;
      }
      return <>{children}</>;
    }
  }

  if (isLoading || isLoadingRoles)
    return (
      <div className="container h-screen">
        <Loading />
      </div>
    );

  return <>{children}</>;
};

const RequireAuth = ({ children }) => {
  const navigate = useNavigate();
  const { setAuthUser, setRole, setPermissions, setRoles, authUser } =
    useAuthContext();

  const [isDataReady, setIsDataReady] = useState(false);

  const {
    data,
    error,
    isLoading: isLoadingUser,
  } = useFetch(["user"], "/user", {
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnMount: false,
  });

  const {
    data: dataRoles,
    error: errorRoles,
    isLoading: isLoadingRoles,
  } = useFetch(["roles"], "/roles", {
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (data && dataRoles) {
      setAuthUser(data?.user);
      setRole(data?.user?.roles?.[0] || "");
      setPermissions(data?.user?.permissions || []);
      setRoles([...dataRoles, "admin"]);
      setIsDataReady(true);
    }
  }, [data, dataRoles, setAuthUser, setRole, setPermissions, setRoles]);

  useEffect(() => {
    if (
      error?.response?.status === 401 ||
      errorRoles?.response?.status === 401
    ) {
      navigate("/login", { replace: true });
    }
  }, [error, errorRoles, navigate]);

  if (isLoadingUser || isLoadingRoles)
    return (
      <div className="h-screen">
        <Loading />
      </div>
    );

  if (isDataReady) {
    if (!authUser) {
      return <Navigate to="/login" />;
    }
  }

  return isDataReady ? <>{children}</> : null;
};

const RequireVerifiedEmail = ({ children }) => {
  const navigate = useNavigate();
  const {
    setAuthUser,
    setRole,
    setPermissions,
    setRoles,
    role,
    roles,
    authUser,
  } = useAuthContext();

  const [isDataReady, setIsDataReady] = useState(false);

  const { data, error } = useFetch(["user"], "/user", {
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnMount: false,
  });

  const { data: dataRoles, error: errorRoles } = useFetch(["roles"], "/roles", {
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (data && dataRoles) {
      setAuthUser(data?.user);
      setRole(data?.user?.roles?.[0] || "");
      setPermissions(data?.user?.permissions || []);
      setRoles([...dataRoles, "admin"]);
      setIsDataReady(true);
    }
  }, [data, dataRoles, setAuthUser, setRole, setPermissions, setRoles]);

  useEffect(() => {
    if (
      error?.response?.status === 401 ||
      errorRoles?.response?.status === 401
    ) {
      navigate("/login", { replace: true });
    }
  }, [error, errorRoles, navigate]);

  if (isDataReady) {
    if (!authUser || !authUser?.email_verified_at) {
      return <Navigate to="/" />;
    }
  }

  return isDataReady ? <>{children}</> : null;
};

const RejectIfAuthenticated = ({ children }) => {
  const { authUser } = useAuthContext();

  if (authUser) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

const RequirePermission = ({ children, permission }) => {
  const { hasPermission } = useAuthContext();

  if (!permission) {
    return <>{children}</>;
  }

  if (!hasPermission(permission)) {
    return <Navigate to="/admin/overview" />;
  }

  return <>{children}</>;
};

const RequireAdmin = ({ children }) => {
  const navigate = useNavigate();
  const {
    setAuthUser,
    setRole,
    setPermissions,
    setRoles,
    role,
    roles,
    authUser,
  } = useAuthContext();

  const [isDataReady, setIsDataReady] = useState(false);

  const { data, error } = useFetch(["user"], "/user", {
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnMount: false,
  });

  const { data: dataRoles, error: errorRoles } = useFetch(["roles"], "/roles", {
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (data && dataRoles) {
      setAuthUser(data?.user);
      setRole(data?.user?.roles?.[0] || "");
      setPermissions(data?.user?.permissions || []);
      setRoles([...dataRoles, "admin"]);
      setIsDataReady(true);
    }
  }, [data, dataRoles, setAuthUser, setRole, setPermissions, setRoles]);

  useEffect(() => {
    if (
      error?.response?.status === 401 ||
      errorRoles?.response?.status === 401
    ) {
      navigate("/login", { replace: true });
    }
  }, [error, errorRoles, navigate]);

  if (isDataReady) {
    if (!authUser) {
      return <Navigate to="/login" replace />;
    }

    if (role && roles.length > 0 && !roles.includes(role)) {
      return <Navigate to="/" replace />;
    }
  }

  return isDataReady ? <>{children}</> : null;
};

export default RequireAdmin;

export {
  ProtectedRoute,
  RejectIfAuthenticated,
  RequireAdmin,
  RequireAuth,
  RequirePermission,
  RequireVerifiedEmail,
};
