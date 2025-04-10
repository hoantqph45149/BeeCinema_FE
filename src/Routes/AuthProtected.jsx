import { Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../Contexts/auth/UseAuth";
import { useFetch } from "../Hooks/useCRUD";
import { useEffect } from "react";
import Loading from "../Components/Common/Loading";

const ProtectedRoute = ({ children }) => {
  const nav = useNavigate();
  const { setAuthUser, setRole, setPermissions } = useAuthContext();
  const { data, isLoading, error } = useFetch(["user"], "/user", {
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (data) {
      setAuthUser(data?.user);
      setRole(data?.user?.roles[0]);
      setPermissions(data?.user?.permissions);
    }
  }, [data, setAuthUser, setRole, setPermissions]);

  if (error) {
    if (error?.response?.status === 401) {
      nav("/login");
    }
  }


  if (isLoading)
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

const RequireAdmin = ({ children }) => {
  const { authUser, role } = useAuthContext();
  console.log("role admin", role);
  if (role !== "admin") {
    return (window.location.href = "/");
  }

  if (!authUser) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export {
  ProtectedRoute,
  RequireAuth,
  RequireAdmin,
  RejectIfAuthenticated,
  RequireVerifiedEmail,
};
