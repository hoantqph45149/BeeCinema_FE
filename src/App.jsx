import React, { useLayoutEffect } from "react";

import Route from "./Routes";
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
      <Route />
    </>
  );
}

export default App;
