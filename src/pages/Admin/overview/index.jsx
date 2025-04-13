import React, { useState } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { useFetch } from "../../../Hooks/useCRUD";
import BookingHeatmap from "./BookingHeatmap";
import GradientCharts from "./GradientCharts";
import Section from "./Section";
import TopMoviesCards from "./TopMoviesCards";
import Widgets from "./Widgets";
import { useAuthContext } from "../../../Contexts/auth/UseAuth";

document.title = "Tổng quan";
const Overview = () => {
  const { authUser } = useAuthContext();

  const { data } = useFetch(
    ["dashboard"],
    authUser?.cinema_id
      ? `/dashboard?cinema_id=${authUser.cinema_id}`
      : "/dashboard"
  );

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
                  <Widgets
                    data={{
                      totalRevenue: data?.totalRevenue,
                      ticketsSold: data?.ticketsSold,
                      newCustomers: data?.newCustomers,
                      customerRetentionRate: data?.customerRetentionRate,
                    }}
                    date={{ month: data?.month, year: data?.year }}
                  />
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
                <Card>
                  <CardBody>
                    <BookingHeatmap data={data?.bookingHeatmap} />
                  </CardBody>
                </Card>

                <TopMoviesCards data={data?.movies} />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Overview;
