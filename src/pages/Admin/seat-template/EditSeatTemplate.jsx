import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Label,
  Row,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { showAlert } from "../../../Components/Common/showAlert";
import { useCRUD, useFetch } from "../../../Hooks/useCRUD";

const seatTypeId = {
  regular: 1,
  vip: 2,
  double: 3,
};

const EditSeatTemplate = () => {
  const { id } = useParams();
  const { data: seatTemplate } = useFetch(
    ["seatTemplate", { id }],
    `/seat-templates/${id}`
  );
  const { patch: patchSeatTemplate } = useCRUD(["seatTemplate"]);
  const [seats, setSeats] = useState([]);
  const [seatMap, setSeatMap] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const isSeatsInitialized = useRef(false);
  // console.log("seats", seats);
  // console.log("seatMap", seatMap);
  console.log(seatTemplate);

  useEffect(() => {
    if (seatTemplate) {
      setSeats(() => generateInitialSeats(seatTemplate));
      isSeatsInitialized.current = true;
    }
  }, [seatTemplate]);

  useEffect(() => {
    if (seatTemplate?.seat_map.length > 0) {
      const selectedSeats = seatTemplate?.seat_map.flatMap((row) =>
        row.seats.map((seat) => ({
          coordinates_x: seat.coordinates_x,
          coordinates_y: seat.coordinates_y,
          type_seat_id: row.type == "regular" ? 1 : row.type == "vip" ? 2 : 3,
        }))
      );

      // console.log("seatTemplate:", seatTemplate);
      const copySeatTemplateSeatMap = seats;
      const seatMap = copySeatTemplateSeatMap.map((row) => {
        let skipNext = false; // Biến để bỏ qua ghế bị che phủ
        return {
          ...row,
          seats: row.seats.map((seat, index, arr) => {
            if (skipNext) {
              skipNext = false; // Reset biến để ghế tiếp theo không bị bỏ qua
              return { ...seat, hidden: true }; // Đánh dấu ghế bị che
            }

            const isDouble = seatTemplate?.seat_map.some((s) =>
              s.seats.some((ss) => {
                return (
                  ss.coordinates_x == seat.col &&
                  ss.coordinates_y == seat.rowLabel &&
                  s.type == "double"
                );
              })
            );
            // console.log("isDouble", isDouble);
            if (isDouble) {
              skipNext = true; // Đánh dấu ghế tiếp theo cần bỏ qua
            }

            return {
              ...seat,
              selected: seatTemplate?.seat_map.some((s) =>
                s.seats.some(
                  (ss) =>
                    ss.coordinates_x == seat.col &&
                    ss.coordinates_y == seat.rowLabel
                )
              ),
              colspan: isDouble ? 2 : 1,
              hidden: false, // Ghế này sẽ hiển thị bình thường
            };
          }),
        };
      });

      setSeatMap(seatMap);
      setSelectedSeats(selectedSeats);
    }
  }, [seatTemplate, isSeatsInitialized.current]);

  // Hàm Tạp ghế
  function generateInitialSeats(data) {
    const result = [];
    const seatTypes = ["regular", "vip", "double"];
    let rowIndex = 0;

    seatTypes.forEach((type) => {
      for (let row = 0; row < data[`row_${type}`]; row++) {
        const rowLabel = String.fromCharCode(65 + rowIndex++);
        const seatRow = Array(data.matrix_id.max_row)
          .fill(null)
          .map((_, col) => ({
            type,
            rowLabel,
            col: col + 1,
            selected: false,
            colspan: 1,
            hidden: false,
          }));
        result.push({ type, row: rowLabel, seats: seatRow });
      }
    });

    return result;
  }

  const handleSeatClick = useCallback(
    (rowIndex, colIndex) => {
      // console.log(rowIndex, colIndex);
      const seat =
        seatMap.length > 0
          ? seatMap[rowIndex].seats[colIndex]
          : seats[rowIndex].seats[colIndex];

      // console.log(seat);

      const updateSeats = (seat, action) => {
        if (seatMap.length > 0) {
          setSeatMap((prevSeats) =>
            prevSeats.map((row, rIdx) =>
              rIdx === rowIndex
                ? {
                    ...row,
                    seats: row.seats.map((s, cIdx) =>
                      cIdx === colIndex ? { ...s, ...action } : s
                    ),
                  }
                : row
            )
          );
        } else {
          setSeats((prevSeats) =>
            prevSeats.map((row, rIdx) =>
              rIdx === rowIndex
                ? {
                    ...row,
                    seats: row.seats.map((s, cIdx) =>
                      cIdx === colIndex ? { ...s, ...action } : s
                    ),
                  }
                : row
            )
          );
        }
      };

      if (seat.selected) {
        if (seat.type === "double") {
          const nextSeat =
            seatMap.length > 0
              ? seatMap[rowIndex].seats[colIndex + 1]
              : seats[rowIndex].seats[colIndex + 1];
          nextSeat.hidden = false;
          nextSeat.selected = false;
          seat.colspan = 1;
        }
        removeSeatFromSelected(seat.rowLabel, seat.col);
        updateSeats(seat, { selected: false });
      } else {
        if (seat.type === "double") {
          const nextSeat =
            seatMap.length > 0
              ? seatMap[rowIndex].seats[colIndex + 1]
              : seats[rowIndex].seats[colIndex + 1];
          const prevSeat =
            seatMap.length > 0
              ? seatMap[rowIndex].seats[colIndex - 1]
              : seats[rowIndex].seats[colIndex - 1];

          const seatList = seatMap.length > 0 ? seatMap : seats;
          if (
            colIndex < seatList[rowIndex].seats.length - 1 &&
            !nextSeat.selected
          ) {
            nextSeat.hidden = true;
            seat.colspan = 2;
            nextSeat.selected = true;
            addSeatToSelected(seat.type, seat.rowLabel, seat.col);
            updateSeats(seat, { selected: true });
          } else if (colIndex > 0 && !prevSeat.selected) {
            seat.hidden = true;
            prevSeat.colspan = 2;
            prevSeat.selected = true;
            addSeatToSelected(prevSeat.type, prevSeat.rowLabel, prevSeat.col);
            updateSeats(prevSeat, { selected: true });
          } else if (nextSeat?.selected && prevSeat?.selected) {
            alert("You can only select adjacent seats.");
            return;
          }
        } else {
          addSeatToSelected(seat.type, seat.rowLabel, seat.col);
          updateSeats(seat, { selected: true });
        }
      }
    },
    [seats, seatMap]
  );

  const handleSelectAll = useCallback(
    (rowIndex) => {
      handleDeselectAll(rowIndex);

      if (seatMap.length > 0) {
        setSeatMap((prevSeatMap) =>
          prevSeatMap.map((row, rIdx) =>
            rIdx === rowIndex
              ? {
                  ...row,
                  seats: row.seats.map((seat, i) => {
                    if (
                      seat.type === "double" &&
                      i % 2 === 0 &&
                      i < row.seats.length - 1
                    ) {
                      const nextSeat = row.seats[i + 1];
                      nextSeat.selected = true;
                      nextSeat.hidden = true;
                      seat.selected = true;
                      seat.colspan = 2;
                      addSeatToSelected(seat.type, seat.rowLabel, seat.col);
                    } else if (seat.type !== "double") {
                      seat.selected = true;
                      addSeatToSelected(seat.type, seat.rowLabel, seat.col);
                    }
                    return seat;
                  }),
                }
              : row
          )
        );
      } else {
        setSeats((prevSeats) =>
          prevSeats.map((row, rIdx) =>
            rIdx === rowIndex
              ? {
                  ...row,
                  seats: row.seats.map((seat, i) => {
                    if (
                      seat.type === "double" &&
                      i % 2 === 0 &&
                      i < row.seats.length - 1
                    ) {
                      const nextSeat = row.seats[i + 1];
                      nextSeat.selected = true;
                      nextSeat.hidden = true;
                      seat.selected = true;
                      seat.colspan = 2;
                      addSeatToSelected(seat.type, seat.rowLabel, seat.col);
                    } else if (seat.type !== "double") {
                      seat.selected = true;
                      addSeatToSelected(seat.type, seat.rowLabel, seat.col);
                    }
                    return seat;
                  }),
                }
              : row
          )
        );
      }
    },
    [seats]
  );

  const handleDeselectAll = useCallback((rowIndex) => {
    if (seatMap.length > 0) {
      setSeatMap((prevSeats) =>
        prevSeats.map((row, rIdx) =>
          rIdx === rowIndex
            ? {
                ...row,
                seats: row.seats.map((seat) => {
                  if (seat.selected) {
                    removeSeatFromSelected(seat.rowLabel, seat.col);
                  }
                  return {
                    ...seat,
                    selected: false,
                    hidden: false,
                    colspan: 1,
                  };
                }),
              }
            : row
        )
      );
    } else {
      setSeats((prevSeats) =>
        prevSeats.map((row, rIdx) =>
          rIdx === rowIndex
            ? {
                ...row,
                seats: row.seats.map((seat) => {
                  if (seat.selected) {
                    removeSeatFromSelected(seat.rowLabel, seat.col);
                  }
                  return {
                    ...seat,
                    selected: false,
                    hidden: false,
                    colspan: 1,
                  };
                }),
              }
            : row
        )
      );
    }
  }, []);

  const addSeatToSelected = (type, rowLabel, col) => {
    setSelectedSeats((prev) => [
      ...prev,
      {
        coordinates_x: col.toString(),
        coordinates_y: rowLabel,
        type_seat_id: seatTypeId[type],
      },
    ]);
  };

  const removeSeatFromSelected = (rowLabel, col) => {
    setSelectedSeats((prev) =>
      prev.filter(
        (seat) =>
          !(
            seat.coordinates_x === col.toString() &&
            seat.coordinates_y === rowLabel
          )
      )
    );
  };

  const handleSubmit = (is_publish, is_active) => {
    const data = selectedSeats.sort((a, b) => {
      // Sắp xếp theo coordinates_y theo thứ tự bảng chữ cái
      if (a.coordinates_y > b.coordinates_y) {
        return 1;
      }
      if (a.coordinates_y < b.coordinates_y) {
        return -1;
      }

      // Nếu coordinates_y bằng nhau, sắp xếp theo coordinates_x (theo thứ tự số)
      return parseInt(a.coordinates_x) - parseInt(b.coordinates_x);
    });
    if (data.length === 0) {
      showAlert("Chưa Chọn Ghế", "Không được để trống khi Submit", "error");
    } else {
      const {
        total_seats,
        matrix_id,
        seat_map,
        updated_at,
        created_at,
        ...rest
      } = seatTemplate;
      const dataUpdate = {
        matrix_id: matrix_id.id,
        ...rest,
        seat_structure: JSON.stringify(data),
        is_publish,
        is_active,
      };
      patchSeatTemplate.mutate({
        url: `/seat-templates/${id}`,
        data: dataUpdate,
      });
    }
  };

  // console.log("seatMap", seatMap);
  // console.log("selectedSeats", selectedSeats);
  return (
    <>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Quản lý rạp chiếu" pageTitle="Quản lý" />
          <Row>
            <Col md={8} lg={9}>
              <Card>
                <CardBody>
                  <div className="container py-4">
                    <div className="row">
                      <div className="col-lg-12">
                        <h2 className="h5 fw-semibold mb-3">Sơ đồ ghế</h2>
                        <div className="table-responsive">
                          <table className="table table-bordered text-center">
                            <thead>
                              <tr>
                                <th
                                  colSpan={seatTemplate?.matrix_id?.max_col + 3}
                                >
                                  <img
                                    src="/images/screen.png"
                                    alt="screen"
                                    className="w-100"
                                  />
                                </th>
                              </tr>
                              <tr className="table-light">
                                <th>Row</th>
                                {[
                                  ...Array(seatTemplate?.matrix_id?.max_col),
                                ].map((_, col) => (
                                  <th key={col}>{col + 1}</th>
                                ))}
                                <th colSpan={2}>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {seatMap.length > 0
                                ? seatMap.map((row, index) => (
                                    <tr key={index}>
                                      <td>{row.row}</td>
                                      {row.seats.map((seat, i) => (
                                        <td
                                          id={`seat-${seat.rowLabel}-${seat.col}`}
                                          colSpan={seat.colspan}
                                          key={i}
                                          style={{
                                            minWidth: "40px",
                                          }}
                                          onClick={() =>
                                            handleSeatClick(index, i)
                                          }
                                          className={`border p-2 cursor-pointer ${
                                            seat.hidden ? "d-none" : ""
                                          } ${
                                            seat.type === "regular" &&
                                            !seat.selected
                                              ? "bg-warning"
                                              : seat.type === "vip" &&
                                                !seat.selected
                                              ? "bg-primary text-white"
                                              : seat.type === "double" &&
                                                !seat.selected
                                              ? "bg-success text-white"
                                              : "bg-white"
                                          }`}
                                        >
                                          {seat.selected ? (
                                            <div className="position-relative d-flex align-items-center justify-content-center">
                                              <div
                                                className="flex-grow-1"
                                                style={{
                                                  backgroundImage: `url('${
                                                    seat.type === "regular"
                                                      ? "/svg/seat-regular.svg"
                                                      : seat.type === "vip"
                                                      ? "/svg/seat-vip.svg"
                                                      : "/svg/seat-double.svg"
                                                  }')`,
                                                  backgroundSize: "contain",
                                                  backgroundRepeat: "no-repeat",
                                                  backgroundPosition: "center",
                                                  width:
                                                    seat.type === "double"
                                                      ? "20px"
                                                      : "10px",
                                                  height:
                                                    seat.type === "double"
                                                      ? "30px"
                                                      : "30px",
                                                }}
                                              ></div>
                                            </div>
                                          ) : (
                                            "+"
                                          )}
                                        </td>
                                      ))}
                                      <td>
                                        <button
                                          onClick={() => handleSelectAll(index)}
                                          className="btn btn-sm btn-primary"
                                        >
                                          +
                                        </button>
                                      </td>
                                      <td>
                                        <button
                                          onClick={() =>
                                            handleDeselectAll(index)
                                          }
                                          className="btn btn-sm btn-danger ms-2"
                                        >
                                          -
                                        </button>
                                      </td>
                                    </tr>
                                  ))
                                : seats.map((row, index) => (
                                    <tr key={index}>
                                      <td>{row.row}</td>
                                      {row.seats.map((seat, i) => (
                                        <td
                                          id={`seat-${seat.rowLabel}-${seat.col}`}
                                          colSpan={seat.colspan}
                                          key={i}
                                          style={{
                                            minWidth: "40px",
                                          }}
                                          onClick={() =>
                                            handleSeatClick(index, i)
                                          }
                                          className={`border p-2 cursor-pointer ${
                                            seat.hidden ? "d-none" : ""
                                          } ${
                                            seat.type === "regular" &&
                                            !seat.selected
                                              ? "bg-warning"
                                              : seat.type === "vip" &&
                                                !seat.selected
                                              ? "bg-primary text-white"
                                              : seat.type === "double" &&
                                                !seat.selected
                                              ? "bg-success text-white"
                                              : "bg-white"
                                          }`}
                                        >
                                          {seat.selected ? (
                                            <div className="position-relative d-flex align-items-center justify-content-center">
                                              <div
                                                className="flex-grow-1"
                                                style={{
                                                  backgroundImage: `url('${
                                                    seat.type === "regular"
                                                      ? "/svg/seat-regular.svg"
                                                      : seat.type === "vip"
                                                      ? "/svg/seat-vip.svg"
                                                      : "/svg/seat-double.svg"
                                                  }')`,
                                                  backgroundSize: "contain",
                                                  backgroundRepeat: "no-repeat",
                                                  backgroundPosition: "center",
                                                  width:
                                                    seat.type === "double"
                                                      ? "20px"
                                                      : "10px",
                                                  height:
                                                    seat.type === "double"
                                                      ? "30px"
                                                      : "30px",
                                                }}
                                              ></div>
                                            </div>
                                          ) : (
                                            "+"
                                          )}
                                        </td>
                                      ))}
                                      <td>
                                        <button
                                          onClick={() => handleSelectAll(index)}
                                          className="btn btn-sm btn-primary"
                                        >
                                          +
                                        </button>
                                      </td>
                                      <td>
                                        <button
                                          onClick={() =>
                                            handleDeselectAll(index)
                                          }
                                          className="btn btn-sm btn-danger ms-2"
                                        >
                                          -
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
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
                    <h5 className="card-title mb-0">Xuất Bản</h5>
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
                      <Label>Hoạt Động:</Label>
                      <span className="text-muted">
                        {" "}
                        {seatTemplate?.is_active ? "Đang Hoạt Động" : "Khóa"}
                      </span>
                    </Col>
                  </Row>
                  <div className="card-body get-end d-flex justify-content-end gap-2"></div>
                  <Row className="gap-3">
                    <Col lg={12} className="flex-grow-1">
                      <Button
                        onClick={() => {
                          handleSubmit(0, 0);
                        }}
                        color="primary"
                        className="mr-3 "
                      >
                        Lưu nháp
                      </Button>
                    </Col>
                    <Col lg={12} className="flex-grow-1">
                      <Button
                        onClick={() => {
                          handleSubmit(1, 1);
                        }}
                        color="primary"
                        type="submit"
                        className="btn w-sm"
                      >
                        Xuất bản
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
                        <span
                          className="bg-warning"
                          style={{
                            width: "20px",
                            height: "20px",
                            border: "1px solid black",
                          }}
                        ></span>
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
                        <span
                          className="bg-primary"
                          style={{
                            width: "20px",
                            height: "20px",
                            border: "1px solid black",
                          }}
                        ></span>
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
                        <span
                          className="bg-success"
                          style={{
                            width: "20px",
                            height: "20px",
                            border: "1px solid black",
                          }}
                        ></span>

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
                          <span> {seatTemplate?.total_seats} </span>
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

export default EditSeatTemplate;
