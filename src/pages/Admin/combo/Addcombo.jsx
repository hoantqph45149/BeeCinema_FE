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

const Addcombo = () => {
  const [isAuto, setIsAuto] = useState(false);
  const [blueCounter, setblueCounter] = useState(5);
  const [showtimes, setShowtimes] = useState([
    { start_time: "", end_time: "" },
  ]);
  document.title = "";
  function countDown(id, prev_data_attr) {
    id(prev_data_attr - 1);
  }
  function countUP(id, prev_data_attr) {
    id(prev_data_attr + 1);
  }
  const [foodItems, setFoodItems] = useState([]);
  const [newFood, setNewFood] = useState("");
  const [blueCounter1, setblueCounter1] = useState(5);

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
                      <div className="d-flex flex-column mb-3">
                        <div className="flex-grow-1">
                          <h5 className="fs-16">Thêm thông tin combo</h5>
                        </div>
                        <Button color="primary" className="mt-3 align-self-end">
                          Thêm đồ ăn
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="card-body">
                  <Form>
                    <Row>
                      <Col lg={7}>
                        <div className="mb-3">
                          <Label className="form-label">Đồ ăn:</Label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Đồ ăn"
                          />
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="mb-3">
                          <Label className="form-label">Số lượng:</Label>
                          <div className="d-flex flex-wrap align-items-start gap-2">
                            <div className="input-step step-primary">
                              <button
                                type="button"
                                className="minus material-shadow"
                                onClick={() => {
                                  countDown(setblueCounter, blueCounter);
                                }}
                              >
                                –
                              </button>
                              <Input
                                type="number"
                                className="product-quantity"
                                value={blueCounter}
                                min="0"
                                max="100"
                                readOnly
                                style={{ width: "170px" }}
                              />
                              <button
                                type="button"
                                className="plus material-shadow"
                                onClick={() => {
                                  countUP(setblueCounter, blueCounter);
                                }}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col lg={1}>
                        <div className="mb-3">
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
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={7}>
                        <div className="mb-3">
                          <Label className="form-label">Đồ ăn:</Label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Đồ ăn"
                          />
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="mb-3">
                          <Label className="form-label">Số lượng:</Label>
                          <div className="d-flex flex-wrap align-items-start gap-2">
                            <div className="input-step step-primary">
                              <button
                                type="button"
                                className="minus material-shadow"
                                onClick={() => {
                                  countDown(setblueCounter, blueCounter);
                                }}
                              >
                                –
                              </button>
                              <Input
                                type="number"
                                className="product-quantity"
                                value={blueCounter}
                                min="0"
                                max="100"
                                readOnly
                                style={{ width: "170px" }}
                              />
                              <button
                                type="button"
                                className="plus material-shadow"
                                onClick={() => {
                                  countUP(setblueCounter, blueCounter);
                                }}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col lg={1}>
                        <div className="mb-3">
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
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={4}>
                        <div className="mb-3">
                          <Label className="form-label">Tên Combo</Label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Đồ ăn"
                          />
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="mb-3">
                          <Label className="form-label">Giá gốc </Label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="0"
                          />
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="mb-3">
                          <Label className="form-label">Giá bán </Label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="0"
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12}>
                        <div>
                          <Label
                            htmlFor="exampleFormControlTextarea5"
                            className="form-label"
                          >
                            Mô tả ngắn
                          </Label>
                          <textarea
                            className="form-control"
                            id="exampleFormControlTextarea5"
                            rows="5"
                          ></textarea>
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
                    <div className="card-body border-bottom border-light d-flex justify-content-start gap-2">
                      <Button color="primary" className="mr-3">
                        Danh sách
                      </Button>
                      <Button color="primary">Thêm mới</Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Col>

          <Col xl={4} lg={5}>
            <Card>
              <CardHeader>
                <div className="accordion accordion-flush">
                  <div className="card-body">
                    <div>
                      <Label htmlFor="formFile" className="form-label">
                        Hình ảnh:
                      </Label>
                      <Input
                        className="form-control"
                        type="file"
                        id="formFile"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
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
              </CardHeader>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Addcombo;
