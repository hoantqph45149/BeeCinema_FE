import { useLayoutEffect } from "react";
import RoutesComponent from "./Routes";

function App() {
  useLayoutEffect(() => {
    if (location.pathname.startsWith("/admin")) {
      console.log("admin");
      import("./assets/scss/themes.scss");
    } else {
      console.log("client");
      import("./index.css");
    }
  });

  return <RoutesComponent />;
}

export default App;
