import React, { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  Col,
  Container,
  Form,
  Input,
  Label,
  Row,
  Table,
} from "reactstrap";

// RangeSlider
import { ToastContainer } from "react-toastify";
import BreadCrumb from "../../../Components/Common/BreadCrumb";

const Addshowtime = () => {
  const [isAuto, setIsAuto] = useState(false);
  const [showtimes, setShowtimes] = useState([
    { start_time: "", end_time: "" },
  ]);
  document.title = "";

  return (
    <div className="page-content">
      <ToastContainer closeButton={false} limit={1} />

      <Container fluid>
        <BreadCrumb title="Thêm mới suất chiếu" pageTitle="Thêm mới" />

        <Row>
          <Col xl={8} lg={7}>
            <div>
              <Card>
                <div className="card-header border-0">
                  <Row className="align-items-center">
                    <Col>
                      <div className="d-flex mb-3">
                        <div className="flex-grow-1">
                          <h5 className="fs-16">Thêm thông tin suất chiếu</h5>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="card-body">
                  <Form>
                    <Row>
                      <Col lg={8}>
                        <div className="mb-3">
                          <Label className="form-label">Tên phim</Label>
                          <select
                            className="form-select mb-3"
                            aria-label="Default select example"
                          >
                            <option defaultValue="1">Hà Nội </option>
                            <option defaultValue="2">Thuyết minh </option>
                            <option defaultValue="3">Phụ đề</option>
                          </select>
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="mb-3">
                          <Label className="form-label">Phiên bản phim </Label>
                          <select
                            className="form-select mb-3"
                            aria-label="Default select example"
                          >
                            <option defaultValue="1">Vietsub </option>
                            <option defaultValue="2">Thuyết minh </option>
                            <option defaultValue="3">Phụ đề</option>
                          </select>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={4}>
                        <div className="mb-3">
                          <Label className="form-label">Tên chi nhánh </Label>
                          <select
                            className="form-select mb-3"
                            aria-label="Default select example"
                          >
                            <option defaultValue="1">Hà Nội </option>
                            <option defaultValue="2">Thuyết minh </option>
                            <option defaultValue="3">Phụ đề</option>
                          </select>
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="mb-3">
                          <Label className="form-label">Tên rạp </Label>
                          <select
                            className="form-select mb-3"
                            aria-label="Default select example"
                          >
                            <option defaultValue="1">Hà Nội </option>
                            <option defaultValue="2">Thuyết minh </option>
                            <option defaultValue="3">Phụ đề</option>
                          </select>
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="mb-3">
                          <Label className="form-label">Tên phòng </Label>
                          <select
                            className="form-select mb-3"
                            aria-label="Default select example"
                          >
                            <option defaultValue="1">1 </option>
                            <option defaultValue="2">2 </option>
                            <option defaultValue="3">3</option>
                          </select>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={8}>
                        <div>
                          <Label htmlFor="ngaychieu" className="form-label">
                            Ngày khởi chiếu
                          </Label>
                          <Input
                            type="date"
                            className="form-control"
                            id="ngaychieu"
                          />
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div>
                          <Button
                            onClick={() =>
                              setShowtimes([
                                ...showtimes,
                                { start_time: "", end_time: "" },
                              ])
                            }
                            color="primary"
                            className="mt-4"
                          >
                            Thêm giờ chiếu
                          </Button>
                        </div>
                      </Col>
                    </Row>
                    <div className="form-check py-2">
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        id="autotaosuatchieu"
                        onChange={() => setIsAuto(!isAuto)}
                      />{" "}
                      <Label
                        className="form-check-label"
                        for="autotaosuatchieu"
                      >
                        Tự động tạo xuất chiếu trong ngày
                      </Label>
                    </div>
                    <Row>
                      {isAuto ? (
                        <>
                          <Col lg={6}>
                            <div className="mb-3">
                              <Label htmlFor="giomocua" className="form-label">
                                Giờ Mở Cửa
                              </Label>
                              <Input
                                type="time"
                                className="form-control"
                                id="giomocua"
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <Label
                                htmlFor="giodongcua"
                                className="form-label"
                              >
                                Giờ Đóng Cửa
                              </Label>
                              <Input
                                type="time"
                                className="form-control"
                                id="giodongcua"
                              />
                            </div>
                          </Col>
                        </>
                      ) : (
                        <>
                          {showtimes.map((showtime, index) => (
                            <>
                              <Col lg={5}>
                                <div className="mb-3">
                                  <Label
                                    htmlFor="giochieu"
                                    className="form-label"
                                  >
                                    Giờ Chiếu
                                  </Label>
                                  <Input
                                    type="time"
                                    className="form-control"
                                    id="giochieu"
                                  />
                                </div>
                              </Col>
                              <Col lg={5}>
                                <div className="mb-3">
                                  <Label
                                    htmlFor="gioketthuc"
                                    className="form-label"
                                  >
                                    Giờ Kết Thúc
                                  </Label>
                                  <Input
                                    type="time"
                                    className="form-control"
                                    id="gioketthuc"
                                  />
                                </div>
                              </Col>

                              <Col lg={2}>
                                <div>
                                  <Button
                                    onClick={() =>
                                      setShowtimes(
                                        showtimes.filter((_, i) => i !== index)
                                      )
                                    }
                                    color="danger"
                                    className="mt-4"
                                  >
                                    Xóa
                                  </Button>
                                </div>
                              </Col>
                            </>
                          ))}
                        </>
                      )}
                    </Row>
                  </Form>
                </div>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <div className="d-flex mb-3">
                  <div className="flex-grow-1">
                    <div className="card-body border-bottom border-light d-flex justify-content-start gap-2">
                      <Button color="primary" className="mr-3">
                        Lưu nháp
                      </Button>
                      <Button color="primary">Xuất bản</Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Col>

          <Col xl={4} lg={5}>
            <Card>
              <CardHeader>
                <div className="d-flex mb-3">
                  <div className="flex-grow-1">
                    <h5 className="fs-16">Suất chiếu đang có </h5>
                  </div>
                </div>
              </CardHeader>
            </Card>
            <Card>
              <div className="table-responsive">
                <Table className="table-bordered align-middle table-nowrap mb-0">
                  <thead>
                    <tr>
                      <th scope="col">Thời gian</th>
                      <th scope="col">Phòng</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="fw-medium">01</td>
                      <td>Implement new UX</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Addshowtime;
