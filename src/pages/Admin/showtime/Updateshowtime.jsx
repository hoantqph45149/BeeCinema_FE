import React, { useMemo, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  Col,
  Container,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";

// RangeSlider
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import TableContainer from "../../../Components/Common/TableContainer";

const Updateshowtime = () => {
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
                          <Label className="form-label">Tên phim: </Label>
                          <select
                            className="form-select mb-3"
                            aria-label="Default select example"
                          >
                            <option defaultValue="1">Nụ hôn thần chết </option>
                            <option defaultValue="2">Cơn mưa bạc tỷ </option>
                            <option defaultValue="3">Tokuda</option>
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
                          <Label className="form-label">Têm chi nhánh</Label>
                          <Input
                            type="text"
                            className="form-control"
                            placeholder="Nhập chi nhánh"
                          />
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
                      <Col lg={4}>
                        <div>
                          <Label
                            htmlFor="exampleInputdate"
                            className="form-label"
                          >
                            Ngày khởi chiếu
                          </Label>
                          <Input
                            type="date"
                            className="form-control"
                            id="exampleInputdate"
                          />
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="mb-3">
                          <Label
                            htmlFor="exampleInputtime"
                            className="form-label"
                          >
                            Giờ chiếu:
                          </Label>
                          <Input
                            type="time"
                            className="form-control"
                            id="exampleInputtime"
                          />
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="mb-3">
                          <Label
                            htmlFor="exampleInputtime"
                            className="form-label"
                          >
                            Giờ kết thúc:
                          </Label>
                          <Input
                            type="time"
                            className="form-control"
                            id="exampleInputtime"
                          />
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <div className="d-flex mb-3">
                  <div className="flex-grow-1">
                    <div className="card-body border-bottom border-light d-flex justify-content-start">
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
                    <Row className="justify-content-center">
                      <Col>
                        <div className="mt-4 mt-md-0">
                          <div>
                            <div className="form-check form-switch form-check-right mb-2">
                              <Input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="flexSwitchCheckRightDisabled"
                                defaultChecked
                              />
                              <Label
                                className="form-check-label"
                                for="flexSwitchCheckRightDisabled"
                              >
                                Hoạt động:
                              </Label>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
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
export default Updateshowtime;
