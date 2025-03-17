import React, { useLayoutEffect } from "react";

import RoutesComponent from "./Routes"; // Đổi tên để tránh trùng với `Route` của react-router-dom

function App() {
  useLayoutEffect(() => {
    if (location.pathname.startsWith("/admin")) {
      import("./assets/scss/themes.scss");
    } else {
      import("./index.css");
    }
  }, [location]);

  return (
    <>
      <RoutesComponent />
    </>
  );
}

export default App;
