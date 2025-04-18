import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../Contexts/auth/UseAuth";
import { showAlert } from "../../../Components/Common/showAlert";

const AddAdminAccount = () => {
  const { roles, authUser, role } = useAuthContext();
  const nav = useNavigate();
  const { data: datacinemas, isLoading: isLoadingCinema } = useFetch(
    ["cinemas"],
    "/cinemas"
  );
  const { create: createUsers } = useCRUD(["users"]);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const { uploadImage, loading: loadingImage } = useUploadImage();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
      birthday: "",
      address: "",
      gender: "",
      role: "",
      avatar: null,
      id_cinema: null,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(255, "Tên không được vượt quá 255 ký tự")
        .required("Tên không được để trống"),
      email: Yup.string()
        .email("Email không hợp lệ")
        .max(255, "Email không được vượt quá 255 ký tự")
        .required("Email không được để trống"),
      phone: Yup.string()
        .matches(
          /^((0[2-9])|(84[2-9]))[0-9]{8}$/,
          "Số điện thoại không hợp lệ (VD: 0987654321 hoặc 84987654321)"
        )
        .required("Số điện thoại không được để trống"),
      password: Yup.string()
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
        .required("Mật khẩu không được để trống"),
      password_confirmation: Yup.string()
        .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không khớp")
        .required("Xác nhận mật khẩu không được để trống"),
      birthday: Yup.date()
        .max(new Date(), "Ngày sinh không được là tương lai")
        .required("Ngày sinh không được để trống"),
      gender: Yup.string()
        .oneOf(["nam", "nữ", "khác"], "Giới tính không hợp lệ")
        .required("Giới tính không được để trống"),
      role: Yup.string().required("Vai trò không được để trống"),
      id_cinema: authUser.cinema_id
        ? ""
        : Yup.number()
            .nullable()
            .positive("ID rạp phải là số dương")
            .integer("ID rạp phải là số nguyên"),
    }),
    onSubmit: async (values) => {
      if (values.avatar) values.avatar = await uploadImage(values.avatar);
      const dataToSend = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
        password_confirmation: values.password_confirmation,
        birthday: values.birthday,
        gender: values.gender,
        role: values.role,
        address: values.address,
        avatar: values.avatar,
        id_cinema: values.id_cinema || null,
      };

      if (authUser.cinema_id) dataToSend.id_cinema = authUser.cinema_id;

      createUsers.mutate(
        { url: "/users/create", data: dataToSend },
        {
          onSuccess: () => {
            nav("/admin/account");
          },
          onError: (error) => {
            showAlert(
              "Lỗi",
              "Tạo tài khoản thất bại: " + (error.message || "Lỗi server"),
              "error"
            );
          },
        }
      );
    },
  });

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  document.title = "Thêm mới tài khoản quản trị viên";

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
                    <Col lg={12}>
                      <div className="mb-3 text-center">
                        <img
                          src={avatarPreview || "/images/defaultavatar.jpg"}
                          alt="Avatar"
                          className="avatar avatar-md rounded-circle"
                        />
                        <div className="mt-2">
                          <input
                            type="file"
                            accept="image/*"
                            id="avatarUpload"
                            style={{ display: "none" }}
                            onChange={(e) => {
                              formik.setFieldValue("avatar", e.target.files[0]);
                              handleAvatarChange(e);
                            }}
                          />
                          <Button
                            color="primary"
                            size="sm"
                            onClick={() =>
                              document.getElementById("avatarUpload").click()
                            }
                          >
                            <i className="ri-image-add-fill"></i>
                          </Button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={4} md={12}>
                      <div className="mb-3">
                        <Label className="form-label">Họ và tên:</Label>
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
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
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
                        <Label className="form-label">Email:</Label>
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
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
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
                        <Label className="form-label">Số điện thoại:</Label>
                        <Input
                          type="text"
                          id="phone"
                          name="phone"
                          className={`form-control ${
                            formik.touched.phone && formik.errors.phone
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="0987654321"
                          value={formik.values.phone}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
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
                        <Label className="form-label">Mật khẩu:</Label>
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
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
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
                        <Label className="form-label">Xác nhận mật khẩu:</Label>
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
                          placeholder="Xác nhận mật khẩu"
                          value={formik.values.password_confirmation}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
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
                          value={formik.values.birthday}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
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
                        <Input
                          type="select"
                          id="gender"
                          name="gender"
                          className={`form-control ${
                            formik.touched.gender && formik.errors.gender
                              ? "is-invalid"
                              : ""
                          }`}
                          value={formik.values.gender}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option value="">Chọn giới tính</option>
                          <option value="nam">Nam</option>
                          <option value="nữ">Nữ</option>
                          <option value="khác">Khác</option>
                        </Input>
                        {formik.touched.gender && formik.errors.gender && (
                          <div className="text-danger">
                            {formik.errors.gender}
                          </div>
                        )}
                      </div>
                    </Col>
                    <Col lg={3}>
                      <div className="mb-3">
                        <Label className="form-label">Vai trò:</Label>
                        <Input
                          type="select"
                          id="role"
                          name="role"
                          className={`form-control ${
                            formik.touched.role && formik.errors.role
                              ? "is-invalid"
                              : ""
                          }`}
                          value={formik.values.role}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option value="">Chọn vai trò</option>
                          {roles
                            .filter((r) => {
                              if (authUser.cinema_id) {
                                return r !== "admin" && r !== "admin_cinema";
                              }
                              return r !== "admin";
                            })
                            .map((role) => (
                              <option key={role} value={role}>
                                {role.charAt(0).toUpperCase() + role.slice(1)}
                              </option>
                            ))}
                        </Input>
                        {formik.touched.role && formik.errors.role && (
                          <div className="text-danger">
                            {formik.errors.role}
                          </div>
                        )}
                      </div>
                    </Col>
                    {!authUser.cinema_id && (
                      <Col lg={3}>
                        <div className="mb-3">
                          <Label className="form-label">Rạp:</Label>
                          <Input
                            type="select"
                            id="id_cinema"
                            name="id_cinema"
                            className={`form-control ${
                              formik.touched.id_cinema &&
                              formik.errors.id_cinema
                                ? "is-invalid"
                                : ""
                            }`}
                            value={formik.values.id_cinema || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            disabled={isLoadingCinema}
                          >
                            <option value="">Chọn rạp</option>
                            {datacinemas?.map((cinema) => (
                              <option key={cinema.id} value={cinema.id}>
                                {cinema.name}
                              </option>
                            ))}
                          </Input>
                          {formik.touched.id_cinema &&
                            formik.errors.id_cinema && (
                              <div className="text-danger">
                                {formik.errors.id_cinema}
                              </div>
                            )}
                        </div>
                      </Col>
                    )}
                  </Row>
                  <Row>
                    <Col lg={12}>
                      <div className="mb-3">
                        <Label className="form-label">Địa chỉ:</Label>
                        <textarea
                          name="address"
                          className={`form-control`}
                          placeholder="Nhập địa chỉ"
                          rows="3"
                          {...formik.getFieldProps("address")}
                        />
                      </div>
                    </Col>
                  </Row>
                  <div className="d-flex justify-content-between">
                    <Button color="dark" onClick={() => nav("/admin/account")}>
                      <i className="ri-arrow-left-line align-bottom me-1"></i>
                      Trở về
                    </Button>
                    <Button
                      color="primary"
                      type="submit"
                      disabled={createUsers.isLoading || loadingImage}
                    >
                      {createUsers.isLoading || loadingImage
                        ? "Đang tạo..."
                        : "Thêm mới"}
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

export default AddAdminAccount;
