import React from "react";
import { Col, Row } from "reactstrap";
import { useAuthContext } from "./../../../Contexts/auth/UseAuth";

const Section = () => {
  const { authUser } = useAuthContext();
  return (
    <React.Fragment>
      <Row className="mb-3 pb-1">
        <Col xs={12}>
          <div className="d-flex align-items-lg-center flex-lg-row flex-column">
            <div className="flex-grow-1">
              <h4 className="fs-16 mb-1">Xin chào, {authUser.name}!</h4>
              <p className="text-muted mb-0">
                Sau đây là những gì đang diễn ra tại hệ thống của bạn.
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Section;
