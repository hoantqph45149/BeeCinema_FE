import React, { useMemo, useState } from "react";
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

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link, useNavigate } from "react-router-dom";

const Showtime = () => {
  const nav = useNavigate();

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

  const option = [
    {
      options: [
        { label: "Status", value: "Status" },
        { label: "Approved", value: "Approved" },
        { label: "New", value: "New" },
        { label: "Pending", value: "Pending" },
        { label: "Rejected", value: "Rejected" },
      ],
    },
  ];

  const option1 = [
    {
      options: [
        { label: "Select Options", value: "Select Options" },
        { label: "Full Time", value: "Full Time" },
        { label: "Part Time", value: "Part Time" },
      ],
    },
  ];

  document.title = "";
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
                        <Col lg={3} md={6} sm={12}>
                          <div>
                            <Label className="form-label " for="address">
                              Chi nhánh
                            </Label>
                            <select id="address" className="form-select">
                              <option>Hà Nội</option>
                              <option defaultValue="1">Hải Phòng</option>
                              <option defaultValue="2">Thái Bình</option>
                              <option defaultValue="3">
                                Thành Phố Hồ Chí Minh
                              </option>
                            </select>
                          </div>
                        </Col>
                        <Col lg={2} md={6} sm={12}>
                          <div>
                            <Label className="form-label " for="rap">
                              Rạp
                            </Label>
                            <select id="rap" className="form-select">
                              <option>Hà Nội</option>
                              <option defaultValue="1">Hải Phòng</option>
                              <option defaultValue="2">Thái Bình</option>
                              <option defaultValue="3">
                                Thành Phố Hồ Chí Minh
                              </option>
                            </select>
                          </div>
                        </Col>
                        <Col xxl={2} md={6}>
                          <div>
                            <Label
                              htmlFor="exampleInputdate"
                              className="form-label"
                            >
                              Ngày chiếu
                            </Label>
                            <Input
                              type="date"
                              className="form-control"
                              id="exampleInputdate"
                            />
                          </div>
                        </Col>
                        <Col lg={2} md={6} sm={12}>
                          <div>
                            <Label className="form-label" for="trangthai">
                              Trạng thái
                            </Label>
                            <select id="trangthai" className="form-select">
                              <option>Hà Nội</option>
                              <option defaultValue="1">Hải Phòng</option>
                              <option defaultValue="2">Thái Bình</option>
                              <option defaultValue="3">
                                Thành Phố Hồ Chí Minh
                              </option>
                            </select>
                          </div>
                        </Col>
                        <Col lg={2} md={12} sm={12}>
                          <div>
                            <Label className="form-label">&nbsp;</Label>
                            <Button
                              type="button"
                              color="primary"
                              className="btn w-100"
                            >
                              {" "}
                              <i className="ri-equalizer-fill me-1 align-bottom"></i>
                              Filters
                            </Button>
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
                  <Table bordered>
                    <thead>
                      <tr>
                        <th></th>
                        <th>Phim</th>
                        <th>Thời lượng</th>
                        <th>Thể loại</th>
                      </tr>
                    </thead>
                    <tbody>
                      {columns.map((item, index) => (
                        <React.Fragment key={index}>
                          <tr>
                            <td className="text-center">
                              <button
                                type="button"
                                className="btn-soft-primary btn btn-sm"
                                onClick={() => toggleScheduler(index)}
                              >
                                <i className="ri-add-circle-fill"></i>
                              </button>
                            </td>
                            <td>
                              <img
                                src={item.movie.image}
                                alt={item.movie.name}
                                className="img-fluid"
                                style={{
                                  width: "100px",
                                  marginBottom: "10px",
                                }}
                              />
                              <div>
                                {item.movie.name}{" "}
                                {item.movie.special && (
                                  <span className="badge bg-danger">
                                    ĐẶC BIỆT
                                  </span>
                                )}
                              </div>
                            </td>
                            <td>{item.movie.duration}</td>
                            <td>{item.movie.genre}</td>
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
                                      {item.schedules.map(
                                        (schedule, scheduleIndex) => (
                                          <tr key={scheduleIndex}>
                                            <td>{schedule.time}</td>
                                            <td>{schedule.room}</td>
                                            <td>{schedule.seats}</td>
                                            <td>{schedule.format}</td>
                                            <td>
                                              <input
                                                type="checkbox"
                                                checked={schedule.active}
                                                readOnly
                                              />
                                            </td>
                                            <td>
                                              <Link
                                                to="#"
                                                className="btn btn-sm btn-soft-success"
                                              >
                                                <i className="ri-edit-line"></i>
                                              </Link>
                                              <button
                                                type="button"
                                                className="btn btn-sm btn-soft-danger"
                                              >
                                                <i className="ri-delete-bin-2-line"></i>
                                              </button>
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
                <ToastContainer closeButton={false} limit={1} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Showtime;
