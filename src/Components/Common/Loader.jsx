import React from "react";
import { Spinner } from "reactstrap";

const Loader = (props) => {
  return (
    <React.Fragment>
      <div className="d-flex justify-content-center mx-2 mt-2">
        <Spinner color="primary"> Loading... </Spinner>
      </div>
    </React.Fragment>
  );
};

export default Loader;
