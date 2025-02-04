import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import Revenue from "./Revenue";
import Section from "./Section";
import StoreVisits from "./StoreVisits";
import Widgets from "./Widgets";

const Overview = () => {
  document.title = "";

  const [rightColumn, setRightColumn] = useState(true);
  const toggleRightColumn = () => {
    setRightColumn(!rightColumn);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col>
              <div className="h-100">
                <Section rightClickBtn={toggleRightColumn} />
                <Row>
                  <Widgets />
                </Row>
                <Row>
                  <Col xl={8}>
                    <Revenue />
                  </Col>
                  <StoreVisits />
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Overview;
