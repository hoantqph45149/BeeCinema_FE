import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Loading from "../Components/Common/Loading";
import { useAuthContext } from "../Contexts/auth/UseAuth";
import { useFetch } from "../Hooks/useCRUD";

const ProtectedRoute = ({ children }) => {
  const nav = useNavigate();
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

  if (error || errorRoles) {
    if (error?.response?.status === 401) {
      nav("/login");
    }

    if (errorRoles?.response?.status === 401) {
      nav("/login");
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
  const { authUser } = useAuthContext();

  if (!authUser) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

const RequireVerifiedEmail = ({ children }) => {
  const { authUser } = useAuthContext();
  if (!authUser || !authUser?.email_verified_at) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
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
