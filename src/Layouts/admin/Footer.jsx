import React from "react";
import { Col, Container, Row } from "reactstrap";

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer galaxy-border-none">
        <Container fluid>
          <Row>
            <Col sm={6}>{new Date().getFullYear()} © Beecinema.</Col>
            <Col sm={6}>
              <div className="text-sm-end d-none d-sm-block">
                Crafted with <i className="mdi mdi-heart text-danger"></i> by
                Beecinema
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
