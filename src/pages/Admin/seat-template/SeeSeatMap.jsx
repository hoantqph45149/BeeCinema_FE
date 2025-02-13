import React, { useEffect, useState } from "react";
import { useCRUD, useFetch } from "../../../Hooks/useCRUD";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  Label,
  Row,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";

const SeeSeatMap = () => {
  const { id } = useParams();
  const { data: seatTemplate } = useFetch(
    ["seatTemplate", { id }],
    `/seat-templates/${id}`
  );
  const { patch: patchSeatTemplate } = useCRUD(["seatTemplate"]);

  const [matrix, setMatrix] = useState({});
  const [seatsByRow, setSeatsByRow] = useState([]);
  const [isActive, setIsActive] = useState(seatTemplate?.is_active);

  console.log("matrix", matrix);
  console.log("seatsByRow", seatsByRow);

  useEffect(() => {
    if (seatTemplate) {
      setMatrix(seatTemplate.matrix_id);
      setSeatsByRow(seatTemplate.seat_map);
    }
  }, [seatTemplate]);

  const handleSubmit = () => {
    patchSeatTemplate.mutate({
      url: `/seat-templates/${seatTemplate.id}`,
      data: { ...seatTemplate, is_active: isActive === true ? 1 : 0 },
    });
  };
  return (
    <>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Quản lý rạp chiếu" pageTitle="Quản lý" />
          <Row>
            <Col md={9}>
              <Card>
                <CardBody>
                  <div className="container py-4">
                    <div className="row">
                      <div className="col-lg-12">
                        <h2 className="h5 fw-semibold mb-3">Sơ đồ ghế</h2>
                        <div className="table-responsive">
                          <table
                            style={{ maxWidth: "70%" }}
                            className="mx-auto table text-center"
                          >
                            <thead>
                              <tr>
                                <th colSpan={matrix?.max_col}>
                                  <img
                                    src="/images/screen.png"
                                    alt=""
                                    className="img-fluid"
                                  />
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {seatsByRow.map((rowData) => {
                                let hideNextSeat = false;
                                return (
                                  <tr key={rowData.row}>
                                    {Array.from(
                                      { length: matrix?.max_row },
                                      (_, i) => i + 1
                                    ).map((x) => {
                                      const seat = rowData.seats.find(
                                        (seat) => seat.coordinates_x == x
                                      );
                                      if (hideNextSeat) {
                                        hideNextSeat = false;
                                        return null;
                                      }

                                      if (rowData?.type === "double") {
                                        hideNextSeat = true;
                                      }
                                      return (
                                        <td
                                          colSpan={
                                            rowData?.type === "double" ? 2 : 1
                                          }
                                          key={x}
                                          className={`border-0 p-2 cursor-pointer align-middle ${
                                            rowData?.type === "double"
                                              ? "px-1"
                                              : ""
                                          }`}
                                        >
                                          {seat ? (
                                            <div
                                              className={`position-relative d-flex justify-content-center align-items-center w-100`}
                                            >
                                              <img
                                                src={`/svg/seat-${rowData.type}.svg`}
                                                alt={`${seat.id} - ${seat.name}`}
                                                className="img-fluid w-100"
                                              />
                                              <span
                                                style={{
                                                  top: "40%",
                                                  wordSpacing: "1.2em",
                                                  fontSize: "10px",
                                                }}
                                                className={`position-absolute start-50 translate-middle fw-bold`}
                                              >
                                                {seat.name}
                                              </span>
                                            </div>
                                          ) : null}
                                        </td>
                                      );
                                    })}
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md={4} lg={3}>
              <Card>
                <CardHeader>
                  <div className="col-sm">
                    <h5 className="card-title mb-0">Thông Tin</h5>
                  </div>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md={12}>
                      <Label>Trạng Thái:</Label>
                      <span className="text-muted">
                        {" "}
                        {seatTemplate?.is_publish
                          ? "Đã xuất bản"
                          : "Chưa xuất bản"}
                      </span>
                    </Col>
                    <Col md={12}>
                      <div className="form-check form-switch form-check-right">
                        <Label>Hoạt Động:</Label>
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckRightDisabled"
                          defaultChecked={seatTemplate?.is_active}
                          onChange={(e) => setIsActive(e.target.checked)}
                        />
                      </div>
                    </Col>
                  </Row>
                  <div className="card-body get-end d-flex justify-content-end gap-2"></div>
                  <Row className="gap-3">
                    <Col lg={12} className="flex-grow-1">
                      <Link
                        to="/admin/seat-template"
                        type="submit"
                        className="btn btn-primary"
                      >
                        Danh sách
                      </Link>
                    </Col>
                    <Col lg={12} className="flex-grow-1">
                      <Button
                        onClick={handleSubmit}
                        color="primary"
                        type="submit"
                        className="btn w-sm"
                      >
                        Cập nhật
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <div className="col-sm">
                    <h5 className="card-title mb-0">Chú Thích</h5>
                  </div>
                </CardHeader>
                <CardBody>
                  <Row className="gap-3">
                    <Col md={12}>
                      <div className="d-flex align-items-center gap-3">
                        <span className="fw-semibold">Ghế Thường:</span>

                        <div>
                          <img
                            src="/svg/seat-regular.svg"
                            alt="seat-double"
                            style={{ width: "30px", height: "40px" }}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col md={12}>
                      <div className="d-flex align-items-center gap-3">
                        <span className="fw-semibold">Ghế VIP:</span>

                        <div>
                          <img
                            src="/svg/seat-vip.svg"
                            alt="seat-double"
                            style={{ width: "30px", height: "40px" }}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col md={12}>
                      <div className="d-flex align-items-center gap-3">
                        <span className="fw-semibold">Ghế Đôi:</span>
                        <div>
                          <img
                            src="/svg/seat-double.svg"
                            alt="seat-double"
                            style={{ width: "50px", height: "40px" }}
                          />
                        </div>
                      </div>
                    </Col>
                    {seatTemplate?.total_seats > 0 && (
                      <Col md={12}>
                        <div className="d-flex align-items-center gap-3">
                          <span className="fw-semibold">Tổng số ghế:</span>
                          <span className="fw-bold">
                            {seatTemplate?.total_seats}
                          </span>
                        </div>
                      </Col>
                    )}
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default SeeSeatMap;
