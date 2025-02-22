import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  Label,
  Row,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";

import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { useCRUD } from "../../../Hooks/useCRUD";

document.title = "Quản lý mã giảm giá | Quản lý";
const AddVoucher = () => {
  const { create: createVoucher } = useCRUD(["vouchers"]);
  const [code, setCode] = useState("");

  useEffect(() => {
    const text = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomCode = "";
    for (let i = 0; i < 8; i++) {
      randomCode += text.charAt(Math.floor(Math.random() * text.length));
    }
    setCode(randomCode);
  }, []);
  const validationSchema = Yup.object({
    code: Yup.string()
      .required("Mã giảm giá không được để trống")
      .matches(/^[A-Z0-9]+$/, "Mã giảm giá chỉ chứa chữ in hoa và số"),
    quantity: Yup.number()
      .typeError("Số lượng phải là số")
      .positive("Số lượng phải lớn hơn 0")
      .integer("Số lượng phải là số nguyên")
      .required("Số lượng không được để trống"),
    discount: Yup.number()
      .typeError("Giảm giá phải là số")
      .min(1000, "Giảm giá tối thiểu là 1,000 VNĐ")
      .required("Giảm giá không được để trống"),
    start_date_time: Yup.date()
      .required("Bắt buộc nhập")
      .test("is-future", "Thời gian bắt đầu phải ở tương lai", (value) => {
        return dayjs(value).isAfter(dayjs(), "minute");
      }),

    end_date_time: Yup.date()
      .required("Bắt buộc nhập")
      .test(
        "is-after-start",
        "Thời gian kết thúc phải sau thời gian bắt đầu",
        function (value) {
          const { start_date_time } = this.parent;

          return dayjs(value).isAfter(dayjs(start_date_time), "minute");
        }
      ),
    limit: Yup.number()
      .typeError("Giới hạn sử dụng phải là số")
      .positive("Giới hạn sử dụng phải lớn hơn 0")
      .integer("Giới hạn sử dụng phải là số nguyên")
      .required("Giới hạn sử dụng không được để trống"),
    title: Yup.string().required("Tiêu đề không được để trống"),
    description: Yup.string().max(255, "Mô tả không được vượt quá 255 ký tự"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      code: code || "",
      quantity: "",
      discount: "",
      start_date_time: null,
      end_date_time: null,
      limit: "",
      title: "",
      description: "",
      is_active: false,
    },
    validationSchema,
    onSubmit: (values) => {
      const start_date_time = dayjs(values.start_date_time).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      const end_date_time = dayjs(values.end_date_time).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      createVoucher.mutate(
        {
          url: "/vouchers",
          data: { ...values, start_date_time, end_date_time },
        },
        {
          onSuccess: () => {
            formik.resetForm();
          },
        }
      );
    },
  });

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Quản lý mã giảm giá" pageTitle="Thêm mới" />

        <Form onSubmit={formik.handleSubmit}>
          <Row>
            <Col lg={8}>
              <Card>
                <CardBody>
                  <Row>
                    <Col lg={4} md={12}>
                      <div className="mb-3">
                        <Label className="form-label" htmlFor="code">
                          Mã giảm giá:
                        </Label>
                        <Input
                          type="text"
                          value={formik.values.code}
                          className="form-control"
                          id="code"
                          placeholder="Nhập mã giảm giá..."
                          name="code"
                          {...formik.getFieldProps("code")}
                        />
                        {formik.touched.code && formik.errors.code ? (
                          <div className="text-danger">
                            {formik.errors.code}
                          </div>
                        ) : null}
                      </div>
                    </Col>
                    <Col lg={4} md={12}>
                      <div className="mb-3">
                        <Label className="form-label" htmlFor="quantity">
                          Số lượng:
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="quantity"
                          placeholder="Nhập số lượng..."
                          name="quantity"
                          {...formik.getFieldProps("quantity")}
                        />
                        {formik.touched.quantity && formik.errors.quantity ? (
                          <div className="text-danger">
                            {formik.errors.quantity}
                          </div>
                        ) : null}
                      </div>
                    </Col>
                    <Col lg={4} md={12}>
                      <div className="mb-3">
                        <Label className="form-label" htmlFor="discount">
                          Giảm giá(VNĐ):
                        </Label>
                        <Input
                          type="number"
                          className="form-control"
                          id="discount"
                          placeholder="Nhập số tiền..."
                          name="name"
                          {...formik.getFieldProps("discount")}
                        />
                        {formik.touched.discount && formik.errors.discount ? (
                          <div className="text-danger">
                            {formik.errors.discount}
                          </div>
                        ) : null}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={4} md={12}>
                      <div className="mb-3">
                        <Label htmlFor="start_date_time" className="form-label">
                          Thời gian bắt đầu:
                        </Label>
                        <Flatpickr
                          id="start_date_time"
                          name="start_date_time"
                          className="form-control"
                          value={formik.values.start_date_time}
                          placeholder="Thời gian bắt đầu"
                          onChange={(date) => {
                            formik.setTouched({
                              ...formik.touched,
                              start_date_time: true,
                            });
                            formik.setFieldValue("start_date_time", date[0]);
                          }}
                          options={{
                            enableTime: true,
                            dateFormat: "d-m-Y H:i",
                            time_24hr: true,
                          }}
                        />
                        {formik.touched.start_date_time &&
                          formik.errors.start_date_time && (
                            <div className="text-danger">
                              {formik.errors.start_date_time}
                            </div>
                          )}
                      </div>
                    </Col>

                    <Col lg={4} md={12}>
                      <div className="mb-3">
                        <Label htmlFor="end_date_time" className="form-label">
                          Thời gian kết thúc:
                        </Label>
                        <Flatpickr
                          id="end_date_time"
                          name="end_date_time"
                          className="form-control"
                          placeholder="Thời gian kết thúc"
                          value={formik.values.end_date_time}
                          onChange={(date) => {
                            formik.setTouched({
                              ...formik.touched,
                              end_date_time: true,
                            });
                            formik.setFieldValue("end_date_time", date[0]);
                          }}
                          options={{
                            enableTime: true,
                            dateFormat: "d-m-Y H:i",
                            time_24hr: true,
                          }}
                        />
                        {formik.touched.end_date_time &&
                          formik.errors.end_date_time && (
                            <div className="text-danger">
                              {formik.errors.end_date_time}
                            </div>
                          )}
                      </div>
                    </Col>
                    <Col lg={4} md={12}>
                      <div className="mb-3">
                        <Label className="form-label" htmlFor="limit">
                          Giới hạn sử dụng:
                        </Label>
                        <Input
                          type="number"
                          className="form-control"
                          id="limit"
                          name="limit"
                          placeholder="Nhập số lượng..."
                          {...formik.getFieldProps("limit")}
                        />
                        {formik.touched.limit && formik.errors.limit ? (
                          <div className="text-danger">
                            {formik.errors.limit}
                          </div>
                        ) : null}
                      </div>
                    </Col>
                  </Row>
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="title">
                      Tiêu đề:
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="title"
                      placeholder="Nhâp tiêu đề..."
                      name="title"
                      {...formik.getFieldProps("title")}
                    />
                    {formik.touched.title && formik.errors.title ? (
                      <div className="text-danger">{formik.errors.title}</div>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <Label htmlFor="description" className="form-label">
                      Mô tả ngắn:
                    </Label>
                    <textarea
                      className="form-control"
                      id="description"
                      rows="3"
                      placeholder="Nhập mô tả ngắn..."
                      {...formik.getFieldProps("description")}
                    ></textarea>
                    {formik.touched.description && formik.errors.description ? (
                      <div className="text-danger">
                        {formik.errors.description}
                      </div>
                    ) : null}
                  </div>
                </CardBody>
              </Card>
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
                          id="is_active"
                          defaultChecked={formik.values.is_active}
                          {...formik.getFieldProps("is_active")}
                        />
                        <Label className="form-check-label" htmlFor="is_active">
                          Hoạt động
                        </Label>
                      </div>
                    </Col>
                    <Col lg={6} md={12}>
                      {" "}
                      <div className="text-end mb-3">
                        <Button type="submit" color="primary">
                          Thêm mới
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default AddVoucher;
