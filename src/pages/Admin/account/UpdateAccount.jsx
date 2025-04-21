import { useFormik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import * as Yup from "yup";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { useCRUD, useFetch } from "../../../Hooks/useCRUD";
import { useAuthContext } from "../../../Contexts/auth/UseAuth";
import { showAlert } from "../../../Components/Common/showAlert";
import useUploadImage from "../../../Hooks/useUploadImage";
import Loader from "../../../Components/Common/Loader";

const UpdateAccount = () => {
  const { roles, authUser } = useAuthContext();
  const { id } = useParams();
  const nav = useNavigate();
  const { data: user, isLoading: isLoadingUser } = useFetch(
    ["user", id],
    `/users/${id}`
  );

  const { data: datacinemas, isLoading: isLoadingCinema } = useFetch(
    ["cinemas"],
    "/cinemas"
  );

  const { patch: patchUser, create: changePassword } = useCRUD(["users", id]);
  const [modal, setModal] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const { uploadImage, loading: loadingImage } = useUploadImage();
  const toggle = useCallback(() => {
    setModal(!modal);
  }, [modal]);

  const passwordValidationSchema = Yup.object({
    password: Yup.string()
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .required("Mật khẩu không được để trống"),
    password_confirmation: Yup.string()
      .required("Xác nhận mật khẩu không được để trống")
      .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không khớp"),
  });

  const validationSchema = Yup.object({
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
    birthday: Yup.date()
      .max(new Date(), "Ngày sinh không được là tương lai")
      .required("Ngày sinh không được để trống"),
    role: Yup.string().required("Vai trò không được để trống"),
    gender: Yup.string()
      .oneOf(["nam", "nữ", "khác"], "Giới tính không hợp lệ")
      .required("Giới tính không được để trống"),
    cinema_id: authUser.cinema_id
      ? Yup.string().required("Rạp không được để trống")
      : Yup.number()
          .nullable()
          .positive("ID rạp phải là số dương")
          .integer("ID rạp phải là số nguyên")
          .required("Rạp không được để trống"),
  });

  const formik = useFormik({
    initialValues: {
      avatar: "",
      name: "",
      email: "",
      phone: "",
      birthday: "",
      role: "",
      content: "",
      address: "",
      gender: "",
      cinema_id: authUser.cinema_id || "",
    },
    validationSchema,
    onSubmit: async (values) => {
      if (values.avatar !== user.avatar)
        values.avatar = await uploadImage(values.avatar);
      const dataToSend = { ...values };
      if (authUser.cinema_id) {
        dataToSend.cinema_id = authUser.cinema_id;
      }
      patchUser.mutate(
        {
          url: `/users/${id}`,
          data: dataToSend,
        },
        {
          onSuccess: () => {
            showAlert(
              "Thành công",
              "Cập nhật tài khoản thành công!",
              "success"
            );
            nav("/admin/account");
          },
          onError: (error) => {
            showAlert(
              "Lỗi",
              "Cập nhật tài khoản thất bại: " + (error.message || "Lỗi server"),
              "error"
            );
          },
        }
      );
    },
  });

  const passwordFormik = useFormik({
    initialValues: {
      password: "",
      password_confirmation: "",
    },
    validationSchema: passwordValidationSchema,
    onSubmit: (values) => {
      changePassword.mutate(
        {
          url: `/users/change-password-admin/${id}`,
          data: {
            new_password: values.password,
            new_password_confirmation: values.password_confirmation,
          },
          shouldShowAlert: false,
        },
        {
          onSuccess: () => {
            showAlert("Thành công", "Cập nhật mật khẩu thành công!", "success");
            toggle();
          },
          onError: (error) => {
            showAlert(
              "Lỗi",
              "Cập nhật mật khẩu thất bại: " + (error.message || "Lỗi server"),
              "error"
            );
          },
        }
      );
    },
  });

  useEffect(() => {
    if (user) {
      formik.setValues({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        birthday: user.birthday || "",
        role: user.role || "",
        address: user.address || "",
        gender: user.gender || "",
        cinema_id: authUser.cinema_id || user.cinema_id || "",
        avatar: user.avatar || "",
      });
    }
  }, [user, authUser.cinema_id]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  document.title = "Cập nhật tài khoản quản trị viên";

  return (
    <div className="page-content">
      {isLoadingUser || isLoadingCinema ? (
        <div
          style={{
            height: "100vh",
          }}
        >
          <Loader />
        </div>
      ) : (
        <Container fluid>
          <BreadCrumb
            title="Cập nhật tài khoản quản trị viên"
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
                            src={
                              avatarPreview
                                ? avatarPreview
                                : user?.avatar
                                ? user?.avatar
                                : "/images/defaultavatar.jpg"
                            }
                            alt="Avatar"
                            className="avatar avatar-md rounded-circle"
                          />
                          <div className="mt-2">
                            <input
                              type="file"
                              accept="image/*"
                              id="avatarUpload"
                              style={{ display: "none" }}
                              name="avatar"
                              onChange={(e) => {
                                formik.setFieldValue(
                                  "avatar",
                                  e.target.files[0]
                                );
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
                          <Label className="form-label">
                            <span className="text-danger">*</span> Họ và tên:
                          </Label>
                          <Input
                            type="text"
                            name="name"
                            className={`form-control ${
                              formik.touched.name && formik.errors.name
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="Họ và tên"
                            {...formik.getFieldProps("name")}
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
                            name="email"
                            className={`form-control ${
                              formik.touched.email && formik.errors.email
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="user123@gmail.com"
                            {...formik.getFieldProps("email")}
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
                            <span className="text-danger">*</span> Số điện
                            thoại:
                          </Label>
                          <Input
                            type="text"
                            name="phone"
                            className={`form-control ${
                              formik.touched.phone && formik.errors.phone
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="0987654321"
                            {...formik.getFieldProps("phone")}
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
                      <Col lg={3}>
                        <div className="mb-3">
                          <Label className="form-label">
                            <span className="text-danger">*</span> Ngày sinh:
                          </Label>
                          <Input
                            type="date"
                            name="birthday"
                            className={`form-control ${
                              formik.touched.birthday && formik.errors.birthday
                                ? "is-invalid"
                                : ""
                            }`}
                            {...formik.getFieldProps("birthday")}
                          />
                          {formik.touched.birthday &&
                            formik.errors.birthday && (
                              <div className="text-danger">
                                {formik.errors.birthday}
                              </div>
                            )}
                        </div>
                      </Col>
                      <Col lg={3}>
                        <div className="mb-3">
                          <Label className="form-label">
                            <span className="text-danger">*</span> Giới tính:
                          </Label>
                          <Input
                            type="select"
                            name="gender"
                            className={`form-control ${
                              formik.touched.gender && formik.errors.gender
                                ? "is-invalid"
                                : ""
                            }`}
                            {...formik.getFieldProps("gender")}
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
                          <Label className="form-label">
                            <span className="text-danger">*</span> Vai trò:
                          </Label>
                          <Input
                            type="select"
                            name="role"
                            className={`form-control ${
                              formik.touched.role && formik.errors.role
                                ? "is-invalid"
                                : ""
                            }`}
                            {...formik.getFieldProps("role")}
                          >
                            <option value="">Chọn vai trò</option>
                            {roles
                              .filter((item) => {
                                if (authUser.cinema_id) {
                                  return (
                                    item !== "admin" && item !== "admin_cinema"
                                  );
                                }
                                return item !== "admin";
                              })
                              .map((item) => (
                                <option key={item} value={item}>
                                  {item.charAt(0).toUpperCase() + item.slice(1)}
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
                            <Label className="form-label">
                              <span className="text-danger">*</span> Rạp:
                            </Label>
                            <Input
                              type="select"
                              name="cinema_id"
                              className={`form-control ${
                                formik.touched.cinema_id &&
                                formik.errors.cinema_id
                                  ? "is-invalid"
                                  : ""
                              }`}
                              {...formik.getFieldProps("cinema_id")}
                              disabled={isLoadingCinema}
                            >
                              <option value="">Chọn rạp</option>
                              {datacinemas?.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </Input>
                            {formik.touched.cinema_id &&
                              formik.errors.cinema_id && (
                                <div className="text-danger">
                                  {formik.errors.cinema_id}
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
                            className={`form-control ${
                              formik.touched.address && formik.errors.address
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="Nhập địa chỉ"
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
                    <Link onClick={toggle} className="text-primary">
                      Đổi mật khẩu?
                    </Link>
                    <div className="d-flex justify-content-between mt-3">
                      <Button
                        color="dark"
                        onClick={() => nav("/admin/account")}
                      >
                        <i className="ri-arrow-left-line align-bottom me-1"></i>
                        Trở về
                      </Button>
                      <Button
                        color="primary"
                        type="submit"
                        disabled={patchUser.isLoading || loadingImage}
                      >
                        {patchUser.isLoading || loadingImage
                          ? "Đang cập nhật..."
                          : "Cập nhật"}
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Form>
            </Col>
          </Row>
          <Modal isOpen={modal} toggle={toggle} centered>
            <ModalHeader className="bg-light p-3" toggle={toggle}>
              Đổi mật khẩu
            </ModalHeader>
            <Form onSubmit={passwordFormik.handleSubmit}>
              <ModalBody>
                <div className="mb-3">
                  <Label className="form-label">
                    <span className="text-danger">*</span> Mật khẩu:
                  </Label>
                  <Input
                    type="password"
                    name="password"
                    className={`form-control ${
                      passwordFormik.touched.password &&
                      passwordFormik.errors.password
                        ? "is-invalid"
                        : ""
                    }`}
                    placeholder="Mật khẩu"
                    {...passwordFormik.getFieldProps("password")}
                  />
                  {passwordFormik.touched.password &&
                    passwordFormik.errors.password && (
                      <div className="text-danger">
                        {passwordFormik.errors.password}
                      </div>
                    )}
                </div>
                <div className="mb-3">
                  <Label className="form-label">
                    <span className="text-danger">*</span> Xác nhận mật khẩu:
                  </Label>
                  <Input
                    type="password"
                    name="password_confirmation"
                    className={`form-control ${
                      passwordFormik.touched.password_confirmation &&
                      passwordFormik.errors.password_confirmation
                        ? "is-invalid"
                        : ""
                    }`}
                    placeholder="Xác nhận mật khẩu"
                    {...passwordFormik.getFieldProps("password_confirmation")}
                  />
                  {passwordFormik.touched.password_confirmation &&
                    passwordFormik.errors.password_confirmation && (
                      <div className="text-danger">
                        {passwordFormik.errors.password_confirmation}
                      </div>
                    )}
                </div>
              </ModalBody>
              <div className="modal-footer">
                <Button type="button" color="light" onClick={toggle}>
                  Đóng
                </Button>
                <Button
                  type="submit"
                  color="success"
                  disabled={patchUser.isLoading}
                >
                  {patchUser.isLoading ? "Đang cập nhật..." : "Cập nhật"}
                </Button>
              </div>
            </Form>
          </Modal>
        </Container>
      )}
    </div>
  );
};

export default UpdateAccount;
