import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Input,
  Label,
  Row,
  Table,
} from "reactstrap";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

import api from "../../../apis/axios";
import { useCRUD, useFetch } from "./../../../Hooks/useCRUD";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { showConfirm } from "../../../Components/Common/showAlert";

dayjs.extend(isSameOrBefore);
const Showtime = () => {
  const { data: branchesData } = useFetch(["branches"], "/branches/active");
  const { patch: patchShowtime, delete: deleteShowtime } = useCRUD([
    "showtimes",
  ]);
  const [showtimes, setShowtimes] = useState([]);
  const [showtime, setShowtime] = useState({});
  const [branches, setBranches] = useState([]);
  const [cinemas, setCinemas] = useState([]);
  const [dataFilterShowtime, setDataFilterShowtime] = useState({
    branch_id: "",
    cinema_id: "",
    date: "",
    is_active: "",
  });
  const nav = useNavigate();

  useEffect(() => {
    if (branchesData?.branches?.length > 0) {
      setBranches(branchesData.branches);

      if (branchesData.branches[0]?.cinemas?.length > 0) {
        setCinemas(branchesData.branches[0].cinemas);
        setDataFilterShowtime({
          branch_id: branchesData.branches[0].id,
          cinema_id: branchesData.branches[0].cinemas[0].id,
          date: dayjs().format("YYYY-MM-DD"),
          is_active: "",
        });
      }
    }
  }, [branchesData]);
  useEffect(() => {
    if (
      dataFilterShowtime &&
      dataFilterShowtime.branch_id !== "" &&
      dataFilterShowtime.cinema_id !== "" &&
      dataFilterShowtime.date !== ""
    ) {
      const fetchData = async () => {
        try {
          const { data } = await api.get(
            `/showtimes?branch_id=${dataFilterShowtime.branch_id}&cinema_id=${
              dataFilterShowtime.cinema_id
            }${
              dataFilterShowtime.is_active !== ""
                ? `&is_active=${dataFilterShowtime.is_active}`
                : ""
            }&date=${dataFilterShowtime.date}`
          );
          const showtimes = data.showtimes.reduce((acc, item) => {
            const { movie, ...showtime } = item;
            const existingMovie = acc.find((m) => m.id === movie.id);

            if (existingMovie) {
              existingMovie.showtimes.push(showtime);

              // Sắp xếp showtimes theo start_time tăng dần
              existingMovie.showtimes.sort(
                (a, b) => new Date(a.start_time) - new Date(b.start_time)
              );
            } else {
              acc.push({
                ...movie,
                showtimes: [showtime],
              });
            }

            return acc;
          }, []);

          setShowtimes(showtimes);
        } catch (error) {
          console.error("Fetch error:", error);
        }
      };

      fetchData();
    }
  }, [dataFilterShowtime, showtime]);

  // console.log(showtimes);

  const handleSetCinema = (id) => {
    if (id === "") {
      setCinemas([]);
    } else {
      const branche = branches.find((branche) => branche.id == id);
      setCinemas(branche.cinemas);
      setDataFilterShowtime({
        ...dataFilterShowtime,
        branch_id: id,
        cinema_id: branche.cinemas[0].id,
      });
    }
  };

  // Column
  const columns = useMemo(() => [
    {
      movie: {
        name: "Thợ Săn Thủ Lĩnh",
        special: true,
        duration: "118 phút",
        genre: "Kinh dị",
        image: "path/to/image.jpg", // Thay bằng đường dẫn thật
      },
      schedules: [
        {
          time: "10:15 - 12:28",
          room: "P201",
          seats: "112/112 ghế",
          format: "2D Lồng Tiếng",
          active: true,
        },
        {
          time: "08:00 - 10:13",
          room: "P201",
          seats: "112/112 ghế",
          format: "2D Lồng Tiếng",
          active: true,
        },
      ],
    },
  ]);
  const [visibleRows, setVisibleRows] = useState(
    columns.map(() => false) // Ban đầu, tất cả các dòng đều ẩn scheduler
  );
  const toggleScheduler = (index) => {
    setVisibleRows((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index]; // Đảo trạng thái ẩn/hiện
      return newState;
    });
  };

  const handleUpdateActive = (showtime) => {
    showConfirm(
      "Thay đổi trạng thái",
      "Bạn có chắc muốn thay đổi trạng thái không",
      () => {
        const start_time = dayjs(showtime.start_time).format("HH:mm");
        const end_time = dayjs(showtime.end_time).format("HH:mm");
        patchShowtime.mutate(
          {
            url: `/showtimes/${showtime.id}`,
            data: {
              ...showtime,
              is_active: showtime.is_active === true ? false : true,
              start_time,
              end_time,
            },
          },
          {
            onSuccess: () => {
              setShowtime({});
            },
          }
        );
      }
    );
  };

  const handleDeleteShowtime = (showtime) => {
    showConfirm(
      "Xóa xuất chiếu",
      `Bạn có chắc muốn xóa xuất chiếu lúc  ${dayjs(showtime.start_time).format(
        "HH:mm"
      )}-${dayjs(showtime.end_time).format("HH:mm")} ngày ${
        showtime.date
      } không ?`,
      () => {
        deleteShowtime.mutate(`/showtimes/${showtime.id}`, {
          onSuccess: () => {
            setShowtime({});
          },
        });
      }
    );
  };

  document.title = "Danh sách xuất chiếu";
  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Quản lý xuất chiếu" pageTitle="Quản lý" />
        <Row>
          <Col lg={12}>
            <Card id="orderList">
              <CardHeader className="border-0">
                <Row className="align-items-center gy-3">
                  <div className="col-sm">
                    <Form>
                      <Row className="g-3">
                        <Col xl={3} lg={4} md={6} sm={12}>
                          <div>
                            <Label className="form-label " htmlFor="branches">
                              Chi nhánh
                            </Label>
                            <select
                              value={dataFilterShowtime.branch_id}
                              onChange={(e) => {
                                handleSetCinema(e.target.value);
                              }}
                              id="branches"
                              className="form-select"
                            >
                              {branches.map((branch) => (
                                <option
                                  key={branch.id}
                                  value={branch.id}
                                  onClick={() => handleSetCinema(branch.id)}
                                >
                                  {branch.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </Col>
                        <Col xl={3} lg={4} md={6} sm={12}>
                          <div>
                            <Label className="form-label " htmlFor="cinemas">
                              Rạp
                            </Label>
                            <select
                              value={dataFilterShowtime.cinema_id}
                              onChange={(e) => {
                                setDataFilterShowtime({
                                  ...dataFilterShowtime,
                                  cinema_id: e.target.value,
                                });
                              }}
                              id="cinemas"
                              className="form-select"
                            >
                              {cinemas.map((cinema) => (
                                <option key={cinema.id} value={cinema.id}>
                                  {cinema.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </Col>
                        <Col xl={3} lg={4} md={6}>
                          <div>
                            <Label
                              htmlFor="exampleInputdate"
                              className="form-label"
                            >
                              Ngày chiếu
                            </Label>
                            <Input
                              value={dataFilterShowtime.date}
                              onChange={(e) => {
                                setDataFilterShowtime({
                                  ...dataFilterShowtime,
                                  date: e.target.value,
                                });
                              }}
                              type="date"
                              className="form-control"
                              id="exampleInputdate"
                            />
                          </div>
                        </Col>
                        <Col xl={3} lg={4} md={6} sm={12}>
                          <div>
                            <Label className="form-label" htmlFor="is_active">
                              Trạng thái
                            </Label>
                            <select
                              onChange={(e) => {
                                setDataFilterShowtime({
                                  ...dataFilterShowtime,
                                  is_active: e.target.value,
                                });
                              }}
                              value={dataFilterShowtime.is_active}
                              id="is_active"
                              className="form-select"
                            >
                              <option value="">Tất cả</option>
                              <option value={1}>Đang hoạt động</option>
                              <option value={0}>Không hoạt động</option>
                            </select>
                          </div>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                  <div className="col-sm-auto">
                    <div className="d-flex gap-1 flex-wrap">
                      <Button
                        type="button"
                        className="btn btn-success add-btn"
                        id="create-btn"
                        onClick={() => {
                          nav("/admin/showtime/add");
                        }}
                      >
                        <i className="ri-add-line align-bottom me-1"></i>
                        Thêm xuất chiếu
                      </Button>{" "}
                    </div>
                  </div>
                </Row>
              </CardHeader>
              <CardBody className="pt-0">
                <div className="table-responsive">
                  <Table className="table fw-medium  align-middle table-nowrap table-bordered">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Phim</th>
                        <th>Thời lượng</th>
                        <th>Thể loại</th>
                      </tr>
                    </thead>
                    <tbody>
                      {showtimes.map((item, index) => (
                        <React.Fragment key={index}>
                          <tr>
                            <td>
                              <div
                                style={{ width: "100%", height: "100%" }}
                                className="d-flex justify-content-center align-items-center"
                              >
                                <button
                                  type="button"
                                  className="btn-soft-primary btn btn-sm"
                                  onClick={() => toggleScheduler(index)}
                                >
                                  <i className="ri-add-circle-fill"></i>
                                </button>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex gap-2 align-items-center">
                                <img
                                  src={item.img_thumbnail}
                                  alt={item.name}
                                  className="img-fluid"
                                  style={{
                                    width: "100px",
                                    marginBottom: "10px",
                                  }}
                                />
                                <div className="flex-grow-1 d-flex flex-column">
                                  <span className="fw-medium fs-5 text">
                                    {" "}
                                    {item.name}{" "}
                                  </span>
                                  {item.is_special && (
                                    <span
                                      style={{ width: "70px" }}
                                      className=" badge bg-danger"
                                    >
                                      ĐẶC BIỆT
                                    </span>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td>{item.duration} Phút</td>
                            <td>{item.category}</td>
                          </tr>
                          {visibleRows[index] && (
                            <tr>
                              <td colSpan={6}>
                                <div className="table-responsive">
                                  <Table bordered>
                                    <thead className="table-light">
                                      <tr>
                                        <th>Thời gian</th>
                                        <th>Phòng</th>
                                        <th>Ghế</th>
                                        <th>Định dạng</th>
                                        <th>Hoạt động</th>
                                        <th>Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {item.showtimes.map(
                                        (showtime, scheduleIndex) => (
                                          <tr key={scheduleIndex}>
                                            <td>{`${dayjs(
                                              showtime.start_time
                                            ).format("HH:mm")}-${dayjs(
                                              showtime.end_time
                                            ).format("HH:mm")}`}</td>
                                            <td>{showtime.room.name}</td>
                                            <td>
                                              {`${showtime.remainingSeats} / ${showtime.totalSeats}`}{" "}
                                              Ghế
                                            </td>
                                            <td>{showtime.format}</td>
                                            <td>
                                              <div className="form-check form-switch form-check-right">
                                                <Input
                                                  disabled={
                                                    dayjs(
                                                      showtime.start_time
                                                    ).isSameOrBefore(
                                                      dayjs().add(30, "minute")
                                                    ) ||
                                                    showtime.remainingSeats <
                                                      showtime.totalSeats
                                                  }
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  role="switch"
                                                  id="is_active"
                                                  defaultChecked={
                                                    showtime.is_active
                                                  }
                                                  checked={showtime.is_active}
                                                  name="is_active"
                                                  onChange={() => {
                                                    handleUpdateActive(
                                                      showtime
                                                    );
                                                    setShowtime(showtime);
                                                  }}
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <ul className="list-inline hstack gap-2 mb-0">
                                                <li className="list-inline-item">
                                                  <Button
                                                    disabled={
                                                      dayjs(
                                                        showtime.start_time
                                                      ).isSameOrBefore(
                                                        dayjs().add(
                                                          30,
                                                          "minute"
                                                        )
                                                      ) ||
                                                      showtime.remainingSeats <
                                                        showtime.totalSeats
                                                    }
                                                    color="primary"
                                                    className="btn-sm"
                                                    onClick={() => {
                                                      nav(
                                                        `/admin/showtime/${showtime.id}/edit`
                                                      );
                                                    }}
                                                  >
                                                    <i className="ri-pencil-fill"></i>
                                                  </Button>
                                                </li>
                                                <li className="list-inline-item">
                                                  <Button
                                                    disabled={
                                                      dayjs(
                                                        showtime.start_time
                                                      ).isSameOrBefore(
                                                        dayjs().add(
                                                          30,
                                                          "minute"
                                                        )
                                                      ) ||
                                                      showtime.remainingSeats <
                                                        showtime.totalSeats
                                                    }
                                                    color="primary"
                                                    className="btn-sm "
                                                    onClick={() => {
                                                      handleDeleteShowtime(
                                                        showtime
                                                      );
                                                      setShowtime(showtime);
                                                    }}
                                                  >
                                                    <i className="ri-delete-bin-5-fill"></i>
                                                  </Button>
                                                </li>
                                                <li className="list-inline-item">
                                                  <Button
                                                    color="primary"
                                                    className="btn-sm "
                                                    onClick={() => {
                                                      nav(
                                                        `/admin/showtime/${showtime.id}/detail`
                                                      );
                                                    }}
                                                  >
                                                    <i className="ri-eye-fill"></i>
                                                  </Button>
                                                </li>
                                              </ul>
                                            </td>
                                          </tr>
                                        )
                                      )}
                                    </tbody>
                                  </Table>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Showtime;
