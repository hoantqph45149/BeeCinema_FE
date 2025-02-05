import React, { useEffect } from "react";

//import Scss

import Route from "./routes";
//imoprt Route
function App() {
  useEffect(() => {
    if (
      location.pathname.startsWith("/admin") ||
      location.pathname.startsWith("/login") ||
      location.pathname.startsWith("/register")
    ) {
      import("./assets/scss/themes.scss");
    } else {
      import("./index.css");
    }
  }, [location.pathname]);
  return (
    <React.Fragment>
      <Route />
    </React.Fragment>
  );
}

export default App;
