import React from "react";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import { formatVND } from "../../../utils/Currency";

export default function TopMoviesCards({ data }) {
  const bootstrapColorVars = [
    "--vz-primary",
    "--vz-secondary",
    "--vz-success",
    "--vz-danger",
    "--vz-warning",
    "--vz-info",
    "--vz-dark",
  ];

  return (
    <React.Fragment>
      <h2 className="fs-4 fw-bold mb-4 text-center">
        Top 6 Phim Có Doanh Thu Cao Nhất
      </h2>
      <Row>
        {(Array.isArray(data) ? data : []).map((movie, index) => (
          <Col key={index} xl={4} md={6}>
            <Card className="border-0 shadow-sm">
              <CardHeader
                className="text-white position-relative overflow-hidden"
                style={{
                  backgroundColor: `var(${
                    bootstrapColorVars[
                      Math.floor(Math.random() * bootstrapColorVars.length)
                    ]
                  })`,
                }}
              >
                <div className="d-flex justify-content-between align-items-center position-relative">
                  <Badge color="light" className="text-dark">
                    #{index + 1}
                  </Badge>
                </div>
                <CardTitle className="mt-2 mb-0 text-white fw-bold">
                  {movie.name}
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs={3}>
                    <img
                      src={movie.img_thumbnail}
                      alt={movie.name}
                      className="w-100"
                    />
                  </Col>
                  <Col xs={9}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-2">
                        <i className="bx bx-dollar-circle fs-4" />
                        <span className="fw-bold">Doanh thu:</span>
                      </div>
                      <span className="fs-5 fw-bold">
                        {formatVND(Number(movie.revenue))}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-2">
                        <i className="ri-ticket-2-line fs-4" />
                        <span className="fw-bold">Số vé:</span>
                      </div>
                      <span className="fs-5 fw-bold">
                        {movie.total_tickets}
                      </span>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </React.Fragment>
  );
}
