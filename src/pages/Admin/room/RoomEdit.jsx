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

const RoomEdit = () => {
  const { id } = useParams();
  const { data: room } = useFetch(["rooms", { id }], `/rooms/${id}`);
  const { patch: patchRoom } = useCRUD(["rooms"]);

  const [matrix, setMatrix] = useState({});
  const [seatsByRow, setSeatsByRow] = useState([]);
  const [isActive, setIsActive] = useState(null);
  const [seatSelected, setSeatSelected] = useState([]);

  useEffect(() => {
    if (room) {
      const seatSelected = room.seatMap.flatMap((row) =>
        row.seats.filter((seat) => !seat.is_active)
      );
      setIsActive(room.room.is_active);
      setMatrix(room.room.seat_template.matrix_id);
      setSeatsByRow(room.seatMap);
      setSeatSelected(seatSelected.map((item) => ({ ...item, is_active: 0 })));
    }
  }, [room]);

  const handleSubmit = () => {
    patchRoom.mutate({
      url: `/rooms/${id}`,
      data: { ...room.room, is_active: isActive, seats: seatSelected },
    });
  };

  const handlePublish = () => {
    patchRoom.mutate({
      url: `/rooms/${id}`,
      data: { ...room?.room, is_active: 1, is_publish: 1, action: "publish" },
    });
  };

  const handleUnPublish = () => {
    patchRoom.mutate({
      url: `/rooms/${id}`,
      data: { ...room?.room, is_active: 0, is_publish: 0 },
    });
  };

  const handleSeatSelect = (seat) => {
    setSeatSelected((prevSeats) => {
      const chairExists = prevSeats.some((item) => item.id === seat.id);

      if (chairExists) {
        return prevSeats.map((item) =>
          item.id === seat.id
            ? { ...item, is_active: item.is_active === 0 ? 1 : 0 }
            : item
        );
      } else {
        return [...prevSeats, { ...seat, is_active: 0 }];
      }
    });
  };

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Quản lý rạp chiếu" pageTitle="Quản lý" />
          <Row>
            <Col lg={9}>
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
                                            seat?.type_seat_id === 3
                                              ? "px-1"
                                              : ""
                                          }`}
                                        >
                                          {seat && seat?.type_seat_id === 3 ? (
                                            <div
                                              className={`position-relative d-flex justify-content-center align-items-center w-100`}
                                              onClick={() =>
                                                room?.room.is_publish
                                                  ? handleSeatSelect(seat)
                                                  : null
                                              }
                                            >
                                              <img
                                                src={
                                                  seatSelected.find(
                                                    (item) =>
                                                      item.id === seat.id
                                                  )?.is_active === 0
                                                    ? "/svg/seat-double-broken.svg"
                                                    : "/svg/seat-double.svg"
                                                }
                                                alt={`${seat.name}-${x}`}
                                                className="w-100 position-absolute top-50 start-50 translate-middle"
                                              />
                                              <span
                                                style={{
                                                  fontSize: "10px",
                                                  wordSpacing: "10px",
                                                }}
                                                className="position-absolute top-40 start-50 translate-middle fw-bold"
                                              >
                                                {seat.name}
                                              </span>
                                            </div>
                                          ) : seat &&
                                            seat?.type_seat_id === 2 ? (
                                            <di
                                              style={{ width: "45px" }}
                                              className={`position-relative bg-secondary-subtle d-flex justify-content-center align-items-center"`}
                                              onClick={() =>
                                                room?.room.is_publish
                                                  ? handleSeatSelect(seat)
                                                  : null
                                              }
                                            >
                                              <img
                                                src={
                                                  seatSelected.find(
                                                    (item) =>
                                                      item.id === seat.id
                                                  )?.is_active === 0
                                                    ? "/svg/seat-vip-broken.svg"
                                                    : "/svg/seat-vip.svg"
                                                }
                                                alt={`${seat.name}-${x}`}
                                                className="w-100 position-absolute top-50 start-50 translate-middle"
                                              />
                                              <span
                                                style={{
                                                  fontSize: "10px",
                                                }}
                                                className="position-absolute top-40 start-50 translate-middle fw-bold small"
                                              >
                                                {seat.name}
                                              </span>
                                            </di>
                                          ) : seat &&
                                            seat?.type_seat_id === 1 ? (
                                            <div
                                              className={`position-relative d-flex justify-content-center align-items-center w-100"`}
                                              onClick={() =>
                                                room?.room.is_publish
                                                  ? handleSeatSelect(seat)
                                                  : null
                                              }
                                            >
                                              <img
                                                src={
                                                  seatSelected.find(
                                                    (item) =>
                                                      item.id === seat.id
                                                  )?.is_active === 0
                                                    ? "/svg/seat-regular-broken.svg"
                                                    : "/svg/seat-regular.svg"
                                                }
                                                alt={`${seat.name}-${x}`}
                                                className="w-100 position-absolute top-50 start-50 translate-middle"
                                              />
                                              <span
                                                style={{
                                                  fontSize: "10px",
                                                }}
                                                className="position-absolute top-40 start-50 translate-middle fw-bold small"
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
            <Col lg={3}>
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
                        {room?.room.is_publish
                          ? "Đã xuất bản"
                          : "Chưa xuất bản"}
                      </span>
                    </Col>
                    <Col md={12}>
                      <div className="form-check form-switch form-check-right">
                        <Label>Hoạt Động:</Label>
                        {room?.room.is_publish ? (
                          <>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              role="switch"
                              id="flexSwitchCheckRightDisabled"
                              defaultChecked={room?.room.is_active}
                              onChange={(e) => setIsActive(e.target.checked)}
                            />
                          </>
                        ) : (
                          <>
                            <span className="text-muted">
                              {" "}
                              {room?.is_active
                                ? "Hoạt Động"
                                : "Không hoạt động"}
                            </span>
                          </>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <div className="card-body get-end d-flex justify-content-end gap-2"></div>
                  <Row className="gap-3">
                    {room?.room.is_publish ? (
                      <>
                        <Col lg={12} className="flex-grow-1">
                          <Link
                            to="/admin/room"
                            type="submit"
                            className="btn btn-primary"
                          >
                            Danh sách
                          </Link>
                        </Col>
                      </>
                    ) : (
                      <>
                        <Col lg={12} className="flex-grow-1">
                          <Button
                            onClick={handleUnPublish}
                            color="primary"
                            type="submit"
                            className="btn w-sm"
                          >
                            Lưu Nháp
                          </Button>
                        </Col>
                      </>
                    )}

                    {room?.room.is_publish ? (
                      <>
                        <Col lg={12} className="flex-grow-1">
                          <Button
                            onClick={handleSubmit}
                            color="primary"
                            type="submit"
                            className="btn w-sm"
                            disabled={patchRoom.isLoading}
                          >
                            Cập nhật
                          </Button>
                        </Col>
                      </>
                    ) : (
                      <>
                        <Col lg={12} className="flex-grow-1">
                          <Button
                            onClick={handlePublish}
                            color="primary"
                            type="submit"
                            className="btn w-sm"
                            disabled={patchRoom.isLoading}
                          >
                            Xuất Bản
                          </Button>
                        </Col>
                      </>
                    )}
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
                    {room?.total_seats > 0 && (
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

export default RoomEdit;
