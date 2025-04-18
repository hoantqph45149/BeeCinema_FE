import { useLayoutEffect } from "react";
import RoutesComponent from "./Routes";

function App() {
  useLayoutEffect(() => {
    if (location.pathname.startsWith("/admin")) {
      import("./assets/scss/themes.scss");
    } else {
      import("./index.css");
    }
  });

  return <RoutesComponent />;
}

export default App;
