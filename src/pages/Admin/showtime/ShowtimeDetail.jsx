import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../../Hooks/useCRUD";
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
import dayjs from "dayjs";
const ShowtimeDetail = () => {
  const { id } = useParams();
  const { data: showtime } = useFetch(["showtimes", id], `/showtimes/${id}`);
  const [matrix, setMatrix] = useState({});
  const [seatMap, setSeatMap] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    if (showtime) {
      setMatrix(showtime.matrixSeat);
      setSeatMap(showtime.seatMap);
    }
  }, [showtime]);

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Quản lý rạp chiếu" pageTitle="Quản lý" />
        <Row>
          <Col lg={8}>
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
                            {seatMap.map((rowData) => {
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

                                    if (seat?.type_seat_id === 3) {
                                      hideNextSeat = true;
                                    }
                                    return (
                                      <td
                                        colSpan={
                                          seat?.type_seat_id === 3 ? 2 : 1
                                        }
                                        key={x}
                                        style={{
                                          width: "50px",
                                          height: "50px",
                                        }}
                                        className={`border-0 p-1 cursor-pointer align-middle ${
                                          seat?.type_seat_id === 3 ? "px-1" : ""
                                        }`}
                                      >
                                        {seat && seat?.type_seat_id === 3 ? (
                                          <div className="position-relative d-flex align-items-center justify-content-center ">
                                            <div
                                              className={`flex-grow-1 seat-container ${
                                                !seat.is_active
                                                  ? "seat-inactive"
                                                  : ""
                                              }`}
                                              style={{
                                                maskImage: `url("/svg/seat-double.svg")`,
                                                WebkitMaskImage: `url("/svg/seat-double.svg")`,
                                                maskSize: "100% 100%",
                                                maskRepeat: "no-repeat",
                                                backgroundColor: `${
                                                  seat.pivot.status !==
                                                  "available"
                                                    ? "#ff7307"
                                                    : "#d1d1d1"
                                                }`, // Màu của icon SVG
                                                width: "40px",
                                                height: "50px",
                                              }}
                                            ></div>
                                            <span
                                              style={{
                                                fontSize: "10px",
                                                wordSpacing: "10px",
                                                width: "100%",
                                              }}
                                              className="position-absolute top-40 start-50 translate-middle fw-bold"
                                            >
                                              {seat.name}
                                            </span>
                                          </div>
                                        ) : seat && seat?.type_seat_id === 2 ? (
                                          <div className="position-relative d-flex align-items-center justify-content-center ">
                                            <div
                                              className={`flex-grow-1 seat-container ${
                                                !seat.is_active
                                                  ? "seat-inactive"
                                                  : ""
                                              }`}
                                              style={{
                                                maskImage: `url("/svg/seat-vip.svg")`,
                                                WebkitMaskImage: `url("/svg/seat-vip.svg")`,
                                                maskSize: "100% 100%",
                                                maskRepeat: "no-repeat",
                                                backgroundColor: `${
                                                  seat.pivot.status !==
                                                  "available"
                                                    ? "#ff7307"
                                                    : "#d1d1d1"
                                                }`, // Màu của icon SVG
                                                width: "40px",
                                                height: "50px",
                                              }}
                                            ></div>
                                            <span
                                              style={{
                                                fontSize: "10px",
                                                wordSpacing: "10px",
                                                width: "100%",
                                              }}
                                              className="position-absolute top-40 start-50 translate-middle fw-bold"
                                            >
                                              {seat.name}
                                            </span>
                                          </div>
                                        ) : seat && seat?.type_seat_id === 1 ? (
                                          <div className="position-relative d-flex align-items-center justify-content-center ">
                                            <div
                                              className={`flex-grow-1 seat-container ${
                                                !seat.is_active
                                                  ? "seat-inactive"
                                                  : ""
                                              }`}
                                              style={{
                                                maskImage: `url("/svg/seat-regular.svg"})`,
                                                WebkitMaskImage: `url("/svg/seat-regular.svg")`,
                                                maskSize: "100% 100%",
                                                maskRepeat: "no-repeat",
                                                backgroundColor: `${
                                                  seat.pivot.status !==
                                                  "available"
                                                    ? "#ff7307"
                                                    : "#d1d1d1"
                                                }`,
                                                width: "40px",
                                                height: "50px",
                                                position: "relative", // Cần để chứa before/after
                                              }}
                                            ></div>

                                            <span
                                              style={{
                                                fontSize: "10px",
                                                wordSpacing: "10px",
                                                width: "100%",
                                              }}
                                              className="position-absolute top-40 start-50 translate-middle fw-bold"
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
          <Col lg={4}>
            <Card>
              <CardHeader>
                <div className="col-sm">
                  <h5 className="card-title mb-0">Thông tin phim</h5>
                </div>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={6}>
                    <div className="mb-3">
                      <Label>Tên phim:</Label>
                      <span className="text-muted">
                        {showtime?.showtime.movie?.name}
                      </span>
                    </div>
                    <div className="mb-3">
                      <Label>Thể loại:</Label>
                      <br />
                      <span className="text-muted">
                        {showtime?.showtime.movie?.category}
                      </span>
                    </div>
                    <div className="mb-3">
                      <Label>Thoi gian chieu:</Label>
                      <br />
                      <span className="text-muted">
                        {showtime?.showtime.movie.duration} Phút
                      </span>
                    </div>
                  </Col>
                  <Col md={6}>
                    <img
                      style={{ maxWidth: "100px" }}
                      src={showtime?.showtime.movie?.img_thumbnail}
                      alt=""
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <div className="mb-3">
                      <Label>Định dạng:</Label>{" "}
                      <span className="text-muted">
                        {showtime?.showtime.format}
                      </span>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <div className="col-sm">
                  <h5 className="card-title mb-0">Thông tin xuất chiếu</h5>
                </div>
              </CardHeader>
              <CardBody>
                <Row className="gap-3">
                  <Col md={12}>
                    <div className="mb-3">
                      <Label>Phòng chiếu:</Label>{" "}
                      <span className="text-muted">
                        {showtime?.showtime.room.name}
                      </span>
                    </div>
                    <div className="mb-3">
                      <Label>Rạp chiếu:</Label>{" "}
                      <span className="text-muted">
                        {showtime?.showtime.room.cinema.name}
                      </span>
                    </div>
                    <div className="mb-3">
                      <Label>Lịch chiếu:</Label>{" "}
                      <span className="text-muted">
                        {`${dayjs(showtime?.showtime.start_time).format(
                          "HH:mm"
                        )}-${dayjs(showtime?.showtime.end_time).format(
                          "HH:mm"
                        )}`}
                      </span>
                    </div>
                    <div className="mb-3">
                      <Label>Ngày chiếu:</Label>{" "}
                      <span className="text-muted">
                        {dayjs(showtime?.showtime.date).format("DD-MM-YYYY")}
                      </span>
                    </div>
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
                      <span className="fw-semibold">Ghế Trống:</span>
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
                      <span className="fw-semibold">Ghế Hỏng:</span>
                      <div
                        className="seat-container seat-inactive"
                        style={{
                          maskImage: `url("/svg/seat-vip.svg"})`,
                          WebkitMaskImage: `url("/svg/seat-vip.svg")`,
                          maskSize: "100% 100%",
                          maskRepeat: "no-repeat",
                          backgroundColor: "#d1d1d1",
                          width: "30px",
                          height: "40px",
                          position: "relative", // Cần để chứa before/after
                        }}
                      ></div>
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="d-flex align-items-center gap-3">
                      <span className="fw-semibold">Ghế Đã bán:</span>
                      <div
                        style={{
                          maskImage: `url("/svg/seat-vip.svg"})`,
                          WebkitMaskImage: `url("/svg/seat-vip.svg")`,
                          maskSize: "100% 100%",
                          maskRepeat: "no-repeat",
                          backgroundColor: "#ff7307",
                          width: "30px",
                          height: "40px",
                          position: "relative", // Cần để chứa before/after
                        }}
                      ></div>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <div className="col-sm">
                  <button
                    className="btn btn-primary"
                    onClick={() => nav("/admin/showtime")}
                  >
                    Danh sách
                  </button>
                </div>
              </CardHeader>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ShowtimeDetail;
