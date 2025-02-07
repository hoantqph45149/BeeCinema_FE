import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";

// Redux

import { Link } from "react-router-dom";

//formik

// Import React FilePond

import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";

const EditVoucher = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  document.title =
    "Quản lý mã giảm giá | Velzon - React Admin & Dashboard Template";

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Quản lý mã giảm giá" pageTitle="Thêm mới" />

        <Row>
          <Col lg={8}>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <Card>
                <CardBody>
                  <Row>
                    <Col lg={4} md={12}>
                      <div className="mb-3">
                        <Label
                          className="form-label"
                          htmlFor="product-title-input"
                        >
                          <span className="text-danger">*</span>Mã giảm giá:
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="product-title-input"
                          name="name"
                        />
                      </div>
                    </Col>
                    <Col lg={4} md={12}>
                      <div className="mb-3">
                        <Label
                          className="form-label"
                          htmlFor="product-title-input"
                        >
                          <span className="text-danger">*</span>Số lượng:
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="product-title-input"
                          placeholder="Nhập số lượng..."
                          name="name"
                        />
                      </div>
                    </Col>
                    <Col lg={4} md={12}>
                      <div className="mb-3">
                        <Label
                          className="form-label"
                          htmlFor="product-title-input"
                        >
                          <span className="text-danger">*</span>Giảm giá(vnd):
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="product-title-input"
                          placeholder="Nhập số tiền..."
                          name="name"
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={4} md={12}>
                      <div className="mb-3">
                        <Label className="form-label">
                          <span className="text-danger">*</span>Chọn thời gian
                          bắt đầu:
                        </Label>
                        <Flatpickr
                          className="form-control"
                          value={startDate}
                          onChange={(date) => setStartDate(date)}
                          options={{
                            enableTime: true,
                            dateFormat: "d-m-Y H:i",
                            time_24hr: true,
                          }}
                          placeholder="Vui lòng chọn"
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={12}>
                      <div className="mb-3">
                        <Label className="form-label">
                          <span className="text-danger">*</span>Chọn thời gian
                          kết thúc:
                        </Label>
                        <Flatpickr
                          className="form-control"
                          value={endDate}
                          onChange={(date) => setEndDate(date)}
                          options={{
                            enableTime: true,
                            dateFormat: "d-m-Y H:i",
                            time_24hr: true,
                          }}
                          placeholder="Vui lòng chọn"
                        />
                      </div>
                    </Col>
                    <Col lg={4} md={12}>
                      <div className="mb-3">
                        <Label
                          className="form-label"
                          htmlFor="product-title-input"
                        >
                          <span className="text-danger">*</span>Giới hạn sử
                          dụng:
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="product-title-input"
                          name="name"
                        />
                      </div>
                    </Col>
                  </Row>
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="product-title-input">
                      <span className="text-danger">*</span>Tiêu đề:
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="product-title-input"
                      placeholder="Enter product title"
                      name="name"
                    />
                  </div>
                  <div className="mb-3">
                    <Label
                      htmlFor="exampleFormControlTextarea5"
                      className="form-label"
                    >
                      Mô tả ngắn:
                    </Label>
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea5"
                      rows="3"
                    ></textarea>
                  </div>
                </CardBody>
              </Card>
            </Form>
          </Col>

          <Col lg={4}>
            <Card>
              <CardBody>
                <Row>
                  <Col lg={6} md={12}>
                    <div className="form-check form-switch form-switch-success mb-3">
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="SwitchCheck3"
                        defaultChecked
                      />
                      <Label className="form-check-label" for="SwitchCheck3">
                        Hoạt động
                      </Label>
                    </div>
                  </Col>
                  <Col lg={6} md={12}>
                    <div className="form-check form-switch form-switch-danger mb-3">
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="SwitchCheck5"
                        defaultChecked
                      />
                      <Label className="form-check-label" for="SwitchCheck5">
                        Publish
                      </Label>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <div className="text-end mb-3">
            <button type="submit" className="btn btn-success w-sm">
              Thêm mới
            </button>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default EditVoucher;
