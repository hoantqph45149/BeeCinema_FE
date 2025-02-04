import React from "react";
import { Col, Row } from "reactstrap";
import Flatpickr from "react-flatpickr";

const Section = (props) => {
  return (
    <React.Fragment>
      <Row className="mb-3 pb-1">
        <Col xs={12}>
          <div className="d-flex align-items-lg-center flex-lg-row flex-column">
            <div className="flex-grow-1">
              <h4 className="fs-16 mb-1">Good Morning, Anna!</h4>
              <p className="text-muted mb-0">
                Here's what's happening with your store today.
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Section;
