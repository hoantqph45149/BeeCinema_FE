import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  Label,
  Row,
  Button,
} from "reactstrap";
import * as Yup from "yup";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { useCRUD, useFetch } from "../../../Hooks/useCRUD";
import { useFormik } from "formik";
import useUploadImage from "../../../Hooks/useUploadImage";
import { useNavigate, useParams } from "react-router-dom";
import { use } from "react";

const UpdateAccount = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const { data: user } = useFetch(["user", id], `/users/${id}`);
  const { patch: patchUser } = useCRUD(["user", id]);
  const { uploadImage } = useUploadImage();

  const validationSchema = Yup.object({
    avatar: Yup.mixed()
      .required("Vui lòng chọn ảnh")
      .test(
        "fileFormat",
        "Chỉ chấp nhận file JPG, JPEG, PNG",
        (value) =>
          value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type)
      )
      .test(
        "fileSize",
        "Dung lượng ảnh không được quá 2MB",
        (value) => value && value.size <= 2 * 1024 * 1024
      ),
    name: Yup.string().required("Tên không được để trống"),
    email: Yup.string().required("Email không được để trống"),
    phone: Yup.number()
      .required("Số điện thoại không được để trống")
      .typeError("Số điện thoại phải là số")

      .min(10, "Số điện thoại phải có ít nhất 10 ký tự"),
    password: Yup.string().required("Mật khâu không được để trống"),
    password_confirmation: Yup.string()
      .required("Xác nhận mật khẩu không được để trống")
      .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không khớp"),
    birthday: Yup.date().required("Ngày sinh không được để trống"),
    role: Yup.string().required("Vai trò không được để trống"),
    address: Yup.string().required("Địa chỉ không được để trống"),
  });

  const formik = useFormik({
    initialValues: {
      avatar: "",
      name: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
      birthday: "",

      role: "",
      content: "",
      address: "",
    },
    validationSchema,

    onSubmit: async (values) => {
      if (values.password != values.password_confirmation) {
        alert("Mật khẩu xác nhận không khớp!");
        return;
      }
      let image = user?.avatar || ""; // Kiểm tra user có tồn tại không

      if (values.avatar && values.avatar !== user?.avatar) {
        image = await uploadImage(values.avatar);
      }

      patchUser.mutate({
        url: `/users/${id}`,
        data: { ...values, avatar: image },
      });

      nav("/admin/account");
    },
  });
  useEffect(() => {
    if (user) {
      formik.setValues({
        avatar: user.avatar || "",
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        password: user.password || "",
        birthday: user.birthday || "",
        role: user.role || "",
        address: user.address || "",
      });
    }
  }, [user]);

  document.title = "Cập nhật tài khoản quản trị viên";

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb
          title="Thêm mới tài khoản quản trị viên"
          pageTitle="Danh sách"
        />

        <Row>
          <Col lg={12}>
            <Form onSubmit={formik.handleSubmit}>
              <Card>
                <CardBody>
                  <Row>
                    <Col lg={12} className="text-center mb-4">
                      <div className="avatar-upload position-relative d-inline-block">
                        <div className="avatar-preview">
                          <img
                            src={
                              formik.values.avatar instanceof File
                                ? URL.createObjectURL(formik.values.avatar)
                                : user?.avatar ||
                                  "https://via.placeholder.com/100"
                            }
                            alt="Avatar"
                            className="rounded-circle"
                            width={100}
                            height={100}
                          />
                        </div>
                        <Label
                          htmlFor="upload-avatar"
                          className="position-absolute"
                          style={{
                            bottom: 0,
                            right: 0,
                            background: "#fff",
                            borderRadius: "50%",
                            padding: "5px",
                            cursor: "pointer",
                            boxShadow: "0px 0px 5px rgba(0,0,0,0.2)",
                          }}
                        >
                          <i className="fas fa-camera"></i>
                        </Label>
                        <Input
                          type="file"
                          className="d-none"
                          id="upload-avatar"
                          accept="image/png, image/jpeg, image/jpg"
                          onChange={(event) => {
                            formik.setFieldValue(
                              "avatar",
                              event.currentTarget.files[0] || ""
                            );
                          }}
                        />
                        {formik.touched.avatar && formik.errors.avatar && (
                          <div className="text-danger">
                            {formik.errors.avatar}
                          </div>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={4} md={12}>
                      <div className="mb-3">
                        <Label className="form-label">
                          <span className="text-danger">*</span> Họ và tên:
                        </Label>
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          className={`form-control ${
                            formik.touched.name && formik.errors.name
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="Họ và tên"
                          value={formik.values.name || ""}
                          onChange={formik.handleChange}
                        />
                        {formik.touched.name && formik.errors.name && (
                          <div className="text-danger">
                            {formik.errors.name}
                          </div>
                        )}
                      </div>
                    </Col>
                    <Col lg={4} md={12}>
                      <div className="mb-3">
                        <Label className="form-label">
                          <span className="text-danger">*</span> Email:
                        </Label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          className={`form-control ${
                            formik.touched.email && formik.errors.email
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="user123@gmail.com"
                          value={formik.values.email || ""}
                          onChange={formik.handleChange}
                        />
                        {formik.touched.email && formik.errors.email && (
                          <div className="text-danger">
                            {formik.errors.email}
                          </div>
                        )}
                      </div>
                    </Col>
                    <Col lg={4} md={12}>
                      <div className="mb-3">
                        <Label className="form-label">
                          <span className="text-danger">*</span> Số điện thoại:
                        </Label>
                        <Input
                          type="number"
                          id="phone"
                          name="phone"
                          className={`form-control ${
                            formik.touched.phone && formik.errors.phone
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="0912345648"
                          value={formik.values.phone || ""}
                          onChange={formik.handleChange}
                        />
                        {formik.touched.phone && formik.errors.phone && (
                          <div className="text-danger">
                            {formik.errors.phone}
                          </div>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={6}>
                      <div className="mb-3">
                        <Label className="form-label">
                          <span className="text-danger">*</span> Mật khẩu:
                        </Label>
                        <Input
                          type="password"
                          id="password"
                          name="password"
                          className={`form-control ${
                            formik.touched.password && formik.errors.password
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="Mật khẩu"
                          value={formik.values.password || ""}
                          onChange={formik.handleChange}
                        />
                        {formik.touched.password && formik.errors.password && (
                          <div className="text-danger">
                            {formik.errors.password}
                          </div>
                        )}
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <Label className="form-label">
                          <span className="text-danger">*</span> Xác nhận mật
                          khẩu:
                        </Label>
                        <Input
                          type="password"
                          id="password_confirmation"
                          name="password_confirmation"
                          className={`form-control ${
                            formik.touched.password_confirmation &&
                            formik.errors.password_confirmation
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="Mật khẩu"
                          value={formik.values.password_confirmation || ""}
                          onChange={formik.handleChange}
                        />
                        {formik.touched.password_confirmation &&
                          formik.errors.password_confirmation && (
                            <div className="text-danger">
                              {formik.errors.password_confirmation}
                            </div>
                          )}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={3}>
                      <div className="mb-3">
                        <Label className="form-label">Ngày sinh:</Label>
                        <Input
                          type="date"
                          id="birthday"
                          name="birthday"
                          className={`form-control ${
                            formik.touched.birthday && formik.errors.birthday
                              ? "is-invalid"
                              : ""
                          }`}
                          value={formik.values.birthday || ""}
                          onChange={formik.handleChange}
                        />
                        {formik.touched.birthday && formik.errors.birthday && (
                          <div className="text-danger">
                            {formik.errors.birthday}
                          </div>
                        )}
                      </div>
                    </Col>
                    <Col lg={3}>
                      <div className="mb-3">
                        <Label className="form-label">Giới tính:</Label>
                        <Input type="select">
                          <option>Nam</option>
                          <option>Nữ</option>
                        </Input>
                      </div>
                    </Col>
                    <Col lg={3}>
                      <div className="mb-3">
                        <Label className="form-label">Vai trò:</Label>
                        <Input
                          type="text"
                          id="role"
                          name="role"
                          className={`form-control ${
                            formik.touched.role && formik.errors.role
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="Vui lòng nhập vui trò"
                          value={formik.values.role || ""}
                          onChange={formik.handleChange}
                        />
                        {formik.touched.role && formik.errors.role && (
                          <div className="text-danger">
                            {formik.errors.role}
                          </div>
                        )}
                      </div>
                    </Col>
                    <Col lg={3}>
                      <div className="mb-3">
                        <Label className="form-label">Tại:</Label>
                        <Input type="select">
                          <option>Hà Đông</option>
                          <option>Cầu Giấy</option>
                        </Input>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12}>
                      <div className="mb-3">
                        <Label className="form-label">Địa chỉ:</Label>
                        <textarea
                          id="address"
                          className={`form-control ${
                            formik.touched.address && formik.errors.address
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="Nhập mô tả"
                          rows="3"
                          {...formik.getFieldProps("address")}
                        />
                        {formik.touched.address && formik.errors.address && (
                          <div className="text-danger">
                            {formik.errors.address}
                          </div>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <div className="d-flex justify-content-between">
                    <Button color="secondary">Trở về</Button>
                    <Button color="primary" type="submit">
                      Cập nhật
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UpdateAccount;
