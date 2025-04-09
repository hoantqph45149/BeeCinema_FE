import { useEffect, useLayoutEffect, useState } from "react";
import RoutesComponent from "./Routes";
import { useAuthContext } from "./Contexts/auth/UseAuth";
import { useFetch } from "./Hooks/useCRUD";
import Loading from "./Components/Common/Loading";

function App() {
  const { setAuthUser, setRole, setPermissions } = useAuthContext();
  const { data, isLoading, error } = useFetch(["user"], "/user", {
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnMount: false,
  });

  const [isUserSet, setIsUserSet] = useState(false);

  useLayoutEffect(() => {
    if (location.pathname.startsWith("/admin")) {
      import("./assets/scss/themes.scss");
    } else {
      import("./index.css");
    }
  });

  useEffect(() => {
    if (data) {
      setAuthUser(data?.user);
      setRole(data?.user?.roles[0]);
      setPermissions(data?.user?.permissions);
      setIsUserSet(true);
    }

    if (error) {
      if (error?.response?.status === 401) {
        setIsUserSet(true);
      }
    }
  }, [data, error, setAuthUser]);

  if (isLoading || !isUserSet) {
    return (
      <div className="container h-screen">
        <Loading />
      </div>
    );
  }

  return <RoutesComponent />;
}

export default App;
