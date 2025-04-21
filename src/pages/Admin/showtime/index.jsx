import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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

import BreadCrumb from "../../../Components/Common/BreadCrumb";
import Loader from "../../../Components/Common/Loader";
import { showConfirm } from "../../../Components/Common/showAlert";
import { useCRUD, useFetch } from "./../../../Hooks/useCRUD";
import { useAuthContext } from "../../../Contexts/auth/UseAuth";

dayjs.extend(isSameOrBefore);

const Showtime = () => {
  const { authUser } = useAuthContext();
  const { data: branchesData, isLoading: isLoadingBranch } = useFetch(
    ["branches"],
    "/branches/active"
  );
  const { patch: patchShowtime, delete: deleteShowtime } = useCRUD([
    "showtimes",
  ]);

  const { data: cinema, isLoading: isLoadingCinema } = useFetch(
    ["cinemas", authUser?.cinema_id],
    `/cinemas/${authUser?.cinema_id}`,
    {
      enabled: !!authUser?.cinema_id,
    }
  );
  const nav = useNavigate();
  const [showtimes, setShowtimes] = useState([]);
  const [branches, setBranches] = useState([]);
  const [cinemas, setCinemas] = useState([]);
  const [dataFilterShowtime, setDataFilterShowtime] = useState({
    branch_id: "",
    cinema_id: "",
    date: "",
    is_active: "",
  });
  // State for search inputs
  const [searchRoom, setSearchRoom] = useState("");
  const [searchTime, setSearchTime] = useState("");
  const [searchFormat, setSearchFormat] = useState("");

  const finalFilter = {
    ...dataFilterShowtime,
    ...(authUser?.cinema_id && {
      cinema_id: cinema?.id,
      branch_id: cinema?.branch_id,
    }),
  };

  const { data, isLoading: isLoadingShowtime } = useFetch(
    ["showtimes", finalFilter, isLoadingCinema],
    `/showtimes?branch_id=${finalFilter.branch_id}&cinema_id=${
      finalFilter.cinema_id
    }${
      finalFilter.is_active !== "" ? `&is_active=${finalFilter.is_active}` : ""
    }&date=${finalFilter.date}`,
    {
      enabled: !isLoadingCinema,
    }
  );

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
    if (data) {
      const showtimes = data.showtimes.reduce((acc, item) => {
        const { movie, ...showtime } = item;
        const existingMovie = acc.find((m) => m.id === movie.id);

        if (existingMovie) {
          existingMovie.showtimes.push(showtime);
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
    }
  }, [data]);

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

  const [visibleRows, setVisibleRows] = useState([]);

  // Initialize visibleRows when showtimes change
  useEffect(() => {
    setVisibleRows(showtimes.map(() => false));
  }, [showtimes]);

  const toggleScheduler = (index) => {
    setVisibleRows((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
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
        patchShowtime.mutate({
          url: `/showtimes/${showtime.id}`,
          data: {
            ...showtime,
            is_active: showtime.is_active === true ? false : true,
            start_time,
            end_time,
          },
        });
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
        deleteShowtime.mutate(`/showtimes/${showtime.id}`);
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
                        {!authUser.cinema_id && (
                          <>
                            <Col xl={3} lg={4} md={6} sm={12}>
                              <div>
                                <Label
                                  className="form-label "
                                  htmlFor="branches"
                                >
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
                                <Label
                                  className="form-label "
                                  htmlFor="cinemas"
                                >
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
                          </>
                        )}
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
                      </Button>
                    </div>
                  </div>
                </Row>
              </CardHeader>
              <CardBody className="pt-0">
                {isLoadingShowtime || isLoadingBranch ? (
                  <Loader />
                ) : (
                  <div className="table-responsive">
                    <Table className="table fw-medium align-middle table-nowrap table-bordered">
                      <thead>
                        <tr>
                          <th></th>
                          <th>Phim</th>
                          <th>Thời lượng</th>
                          <th>Thể loại</th>
                        </tr>
                      </thead>
                      <tbody>
                        {showtimes.map((item, index) => {
                          const filteredShowtimes = item.showtimes.filter(
                            (showtime) => {
                              const timeString = `${dayjs(
                                showtime.start_time
                              ).format("HH:mm")}-${dayjs(
                                showtime.end_time
                              ).format("HH:mm")}`;
                              return (
                                showtime.room.name
                                  .toLowerCase()
                                  .includes(searchRoom.toLowerCase()) &&
                                timeString
                                  .toLowerCase()
                                  .includes(searchTime.toLowerCase()) &&
                                showtime.format
                                  .toLowerCase()
                                  .includes(searchFormat.toLowerCase())
                              );
                            }
                          );

                          return (
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
                                  <div
                                    style={{
                                      maxWidth: "400px",
                                      display: "inline-block",
                                      whiteSpace: "normal",
                                      wordBreak: "break-word",
                                    }}
                                    className="d-flex gap-2 align-items-center"
                                  >
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
                                        {item.name}
                                      </span>
                                      {item.is_special && (
                                        <span
                                          style={{ width: "70px" }}
                                          className="badge bg-danger"
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
                                      {/* Search Inputs */}
                                      <div className="mb-3">
                                        <Row className="g-3">
                                          <Col md={4}>
                                            <Input
                                              type="text"
                                              placeholder="Tìm kiếm Phòng..."
                                              value={searchRoom}
                                              onChange={(e) =>
                                                setSearchRoom(e.target.value)
                                              }
                                            />
                                          </Col>
                                          <Col md={4}>
                                            <Input
                                              type="text"
                                              placeholder="Tìm kiếm Thời gian (HH:mm-HH:mm)..."
                                              value={searchTime}
                                              onChange={(e) =>
                                                setSearchTime(e.target.value)
                                              }
                                            />
                                          </Col>
                                          <Col md={4}>
                                            <Input
                                              type="text"
                                              placeholder="Tìm kiếm Định dạng..."
                                              value={searchFormat}
                                              onChange={(e) =>
                                                setSearchFormat(e.target.value)
                                              }
                                            />
                                          </Col>
                                        </Row>
                                      </div>
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
                                          {filteredShowtimes.map(
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
                                                          dayjs().add(
                                                            30,
                                                            "minute"
                                                          )
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
                                                      checked={
                                                        showtime.is_active
                                                      }
                                                      name="is_active"
                                                      onChange={() => {
                                                        handleUpdateActive(
                                                          showtime
                                                        );
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
                                                        className="btn-sm"
                                                        onClick={() => {
                                                          handleDeleteShowtime(
                                                            showtime
                                                          );
                                                        }}
                                                      >
                                                        <i className="ri-delete-bin-5-fill"></i>
                                                      </Button>
                                                    </li>
                                                    <li className="list-inline-item">
                                                      <Button
                                                        color="primary"
                                                        className="btn-sm"
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
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Showtime;
