import React, { useState } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import Revenue from "./Revenue";
import Section from "./Section";
import StoreVisits from "./StoreVisits";
import Widgets from "./Widgets";
import GradientCharts from "./GradientCharts";
import { useFetch } from "../../../Hooks/useCRUD";
import BookingHeatmap from "./BookingHeatmap";

const Overview = () => {
  document.title = "Tổng quan";
  const { data } = useFetch(["dashboard"], "/dashboard");
  console.log(data);

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
                <Card>
                  <CardBody>
                    <Row>
                      <Col xl={12}>
                        <GradientCharts
                          dataColors='["--vz-success"]'
                          data={data?.revenueChart}
                        />
                      </Col>
                    </Row>
                  </CardBody>
                </Card>

                <Row>
                  <Col xl={12}>
                    <BookingHeatmap date={data?.bookingHeatmap} />
                  </Col>
                </Row>
                <StoreVisits />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Overview;
