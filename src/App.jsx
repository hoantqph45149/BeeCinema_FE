import React, { useEffect, useLayoutEffect, useState } from "react";
import RoutesComponent from "./Routes"; // Đổi tên để tránh trùng với `Route` của react-router-dom
import { useAuthContext } from "./Contexts/auth/UseAuth";
import { useFetch } from "./Hooks/useCRUD";
import Loading from "./Components/Common/Loading";

function App() {
  const { setAuthUser } = useAuthContext();
  const {
    data: user,
    isLoading,
    error,
  } = useFetch(["user"], "/user", {
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
  }, [location, isUserSet]);

  useEffect(() => {
    if (user) {
      setAuthUser(user);
      setIsUserSet(true);
    }

    if (error) {
      if (error?.response?.status === 401) {
        setIsUserSet(true);
      }
    }
  }, [user, error]);

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
