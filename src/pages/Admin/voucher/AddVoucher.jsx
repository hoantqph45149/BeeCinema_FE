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
import { useNavigate } from "react-router-dom";

document.title = "Quản lý mã giảm giá | Quản lý";
const AddVoucher = () => {
  const { create: createVoucher } = useCRUD(["vouchers"]);
  const [code, setCode] = useState("");
  const nav = useNavigate();
  const [type, setType] = useState("");
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
      .trim()
      .required("Mã giảm giá không được để trống")
      .matches(/^[A-Z0-9]+$/, "Mã giảm giá chỉ chứa chữ in hoa và số"),
    quantity: Yup.number()
      .typeError("Số lượng phải là số")
      .positive("Số lượng phải lớn hơn 0")
      .integer("Số lượng phải là số nguyên")
      .required("Số lượng không được để trống"),
    discount_value: Yup.number()
      .typeError("Giảm giá phải là số")
      .when("discount_type", ([discount_type], schema) => {
        if (discount_type === "percent") {
          return schema
            .min(1, "Giảm giá tối thiểu là 1%")
            .max(100, "Giảm giá tối đa là 100%")
            .required("Giảm giá không được để trống");
        }
        if (discount_type === "fixed") {
          return schema
            .min(1000, "Giảm giá tối thiểu là 1,000 VNĐ")
            .required("Giảm giá không được để trống");
        }
        return schema; // Trả về schema mặc định nếu không khớp điều kiện nào
      }),
    start_date: Yup.date()
      .required("Bắt buộc nhập")
      .test("is-future", "Thời gian bắt đầu phải ở tương lai", (value) => {
        return dayjs(value).isAfter(dayjs(), "minute");
      }),

    end_date: Yup.date()
      .required("Bắt buộc nhập")
      .test(
        "is-after-start",
        "Thời gian kết thúc phải sau thời gian bắt đầu",
        function (value) {
          const { start_date } = this.parent;

          return dayjs(value).isAfter(dayjs(start_date), "minute");
        }
      ),
    per_user_limit: Yup.number()
      .typeError("Giới hạn sử dụng phải là số")
      .positive("Giới hạn sử dụng phải lớn hơn 0")
      .integer("Giới hạn sử dụng phải là số nguyên")
      .required("Giới hạn sử dụng không được để trống"),
    min_order_amount: Yup.number()
      .typeError("Giá trị phải là số")
      .min(1, "Giá trị tối thiểu phải lớn hơn 0")
      .required("Vui lòng nhập số tiền tối thiểu"),

    max_discount_amount: Yup.number()
      .typeError("Giá trị phải là số")
      .min(0, "Giá trị tối thiểu phải từ 0 trở lên")
      .when("discount_type", {
        is: "percent", // Chỉ kiểm tra nếu type === "percent"
        then: (schema) =>
          schema.required("Vui lòng nhập số tiền giảm giá tối đa"),
        otherwise: (schema) => schema.notRequired(),
      }),
    title: Yup.string().trim().required("Tiêu đề không được để trống"),
    discount_type: Yup.string()
      .oneOf(["fixed", "percent"])
      .required("Vui lòng chọn loại giảm giá"),
    description: Yup.string()
      .trim()
      .max(255, "Mô tả không được vượt quá 255 ký tự"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      code: code || "",
      quantity: "",
      discount_value: "",
      start_date: null,
      end_date: null,
      per_user_limit: "",
      min_order_amount: "",
      max_discount_amount: "",
      title: "",
      discount_type: "",
      description: "",
      is_active: false,
    },
    validationSchema,
    onSubmit: (values) => {
      const start_date = dayjs(values.start_date).format("YYYY-MM-DD HH:mm:ss");
      const end_date = dayjs(values.end_date).format("YYYY-MM-DD HH:mm:ss");
      createVoucher.mutate(
        {
          url: "/vouchers",
          data: { ...values, start_date, end_date },
        },
        {
          onSuccess: () => {
            formik.resetForm();
            nav("/admin/voucher");
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
                        <Label className="form-label" htmlFor="per_user_limit">
                          Giới hạn sử dụng:
                        </Label>
                        <Input
                          type="number"
                          className="form-control"
                          id="per_user_limit"
                          name="per_user_limit"
                          placeholder="Nhập số lượng..."
                          {...formik.getFieldProps("per_user_limit")}
                        />
                        {formik.touched.per_user_limit &&
                        formik.errors.per_user_limit ? (
                          <div className="text-danger">
                            {formik.errors.per_user_limit}
                          </div>
                        ) : null}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={6} md={12}>
                      <div className="mb-3">
                        <Label htmlFor="discount_type" className="form-label">
                          Kiểu voucher
                        </Label>
                        <select
                          id="discount_type"
                          className="form-select mb-3"
                          name="discount_type"
                          onChange={(e) => {
                            formik.setFieldValue(
                              "discount_type",
                              e.target.value
                            );
                            setType(e.target.value);
                          }}
                        >
                          <option value="">--- Chọn kiểu voucher ---</option>
                          <option value="fixed">Giá tiền</option>
                          <option value="percent">Phần trăm</option>
                        </select>
                        {formik.touched.discount_type &&
                          formik.errors.discount_type && (
                            <div className="text-danger">
                              {formik.errors.discount_type}
                            </div>
                          )}
                      </div>
                    </Col>

                    <Col lg={6} md={12}>
                      <div className="mb-3">
                        <Label className="form-label" htmlFor="discount_value">
                          Giảm giá(VNĐ):
                        </Label>
                        <Input
                          type="number"
                          className="form-control"
                          id="discount_value"
                          placeholder="Nhập số tiền..."
                          name="name"
                          {...formik.getFieldProps("discount_value")}
                        />
                        {formik.touched.discount_value &&
                        formik.errors.discount_value ? (
                          <div className="text-danger">
                            {formik.errors.discount_value}
                          </div>
                        ) : null}
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={6} md={12}>
                      <div className="mb-3">
                        <Label htmlFor="start_date" className="form-label">
                          Thời gian bắt đầu:
                        </Label>
                        <Flatpickr
                          id="start_date"
                          name="start_date"
                          className="form-control"
                          value={formik.values.start_date}
                          placeholder="Thời gian bắt đầu"
                          onChange={(date) => {
                            formik.setTouched({
                              ...formik.touched,
                              start_date: true,
                            });
                            formik.setFieldValue("start_date", date[0]);
                          }}
                          options={{
                            enableTime: true,
                            dateFormat: "d-m-Y H:i",
                            time_24hr: true,
                          }}
                        />
                        {formik.touched.start_date &&
                          formik.errors.start_date && (
                            <div className="text-danger">
                              {formik.errors.start_date}
                            </div>
                          )}
                      </div>
                    </Col>
                    <Col lg={6} md={12}>
                      <div className="mb-3">
                        <Label htmlFor="end_date" className="form-label">
                          Thời gian kết thúc:
                        </Label>
                        <Flatpickr
                          id="end_date"
                          name="end_date"
                          className="form-control"
                          placeholder="Thời gian kết thúc"
                          value={formik.values.end_date}
                          onChange={(date) => {
                            formik.setTouched({
                              ...formik.touched,
                              end_date: true,
                            });
                            formik.setFieldValue("end_date", date[0]);
                          }}
                          options={{
                            enableTime: true,
                            dateFormat: "d-m-Y H:i",
                            time_24hr: true,
                          }}
                        />
                        {formik.touched.end_date && formik.errors.end_date && (
                          <div className="text-danger">
                            {formik.errors.end_date}
                          </div>
                        )}
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
                    <Col md={12}>
                      {" "}
                      <div className="mb-3">
                        <Label
                          className="form-label"
                          htmlFor="min_order_amount"
                        >
                          Đơn hàng tối thiểu:
                        </Label>
                        <Input
                          type="number"
                          className="form-control"
                          id="min_order_amount"
                          placeholder="Nhập số tiền..."
                          name="name"
                          {...formik.getFieldProps("min_order_amount")}
                        />
                        {formik.touched.min_order_amount &&
                        formik.errors.min_order_amount ? (
                          <div className="text-danger">
                            {formik.errors.min_order_amount}
                          </div>
                        ) : null}
                      </div>
                    </Col>
                    {type === "percent" && (
                      <Col md={12}>
                        <div className="mb-3">
                          <Label
                            className="form-label"
                            htmlFor="max_discount_amount"
                          >
                            Số tiền giảm giá tối đa:
                          </Label>
                          <Input
                            type="number"
                            className="form-control"
                            id="max_discount_amount"
                            placeholder="Nhập số tiền..."
                            name="name"
                            {...formik.getFieldProps("max_discount_amount")}
                          />
                          {formik.touched.max_discount_amount &&
                          formik.errors.max_discount_amount ? (
                            <div className="text-danger">
                              {formik.errors.max_discount_amount}
                            </div>
                          ) : null}
                        </div>
                      </Col>
                    )}
                  </Row>
                </CardBody>
              </Card>
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
