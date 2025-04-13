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

const UpdateAccount = () => {
  const { roles } = useAuthContext();
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

  const { patch: patchUser } = useCRUD(["users", id]);
  const [modal, setModal] = useState(false);

  const toggle = useCallback(() => {
    setModal(!modal);
  }, [modal]);

  const passwordValidationSchema = Yup.object({
    password: Yup.string().required("Mật khẩu không được để trống"),
    password_confirmation: Yup.string()
      .required("Xác nhận mật khẩu không được để trống")
      .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không khớp"),
  });

  const validationSchema = Yup.object({
    name: Yup.string().required("Tên không được để trống"),
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email không được để trống"),
    phone: Yup.string()
      .required("Số điện thoại không được để trống")
      .matches(/^[0-9]+$/, "Số điện thoại phải là số")
      .min(10, "Số điện thoại phải có ít nhất 10 ký tự"),
    birthday: Yup.date().required("Ngày sinh không được để trống"),
    role: Yup.string().required("Vai trò không được để trống"),
    gender: Yup.string().required("Giới tính không được để trống"),
    cinema_id: Yup.string().required("Rạp không được để trống"),
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
      cinema_id: "",
    },
    validationSchema,
    onSubmit: (values) => {
      patchUser.mutate(
        {
          url: `/users/${id}`,
          data: values,
        },
        {
          onSuccess: () => {
            nav("/admin/account");
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
      patchUser.mutate(
        {
          url: `/users/${id}/password`,
          data: values,
        },
        {
          onSuccess: () => {
            toggle();
          },
        }
      );
    },
  });

  useEffect(() => {
    if (user) {
      formik.setValues({
        avatar: user.avatar || "",
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        birthday: user.birthday || "",
        role: user.role || "",
        address: user.address || "",
        gender: user.gender || "",
        cinema_id: user.cinema_id || "",
      });
    }
  }, [user]);

  document.title = "Cập nhật tài khoản quản trị viên";

  return (
    <div className="page-content">
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
                          <span className="text-danger">*</span> Số điện thoại:
                        </Label>
                        <Input
                          type="text"
                          name="phone"
                          className={`form-control ${
                            formik.touched.phone && formik.errors.phone
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="0912345648"
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
                        <Label className="form-label">Ngày sinh:</Label>
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
                        <Label className="form-label">Vai trò:</Label>
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
                            .filter((item) => item !== "admin")
                            .map((item) => (
                              <option key={item} value={item}>
                                {item}
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
                    <Col lg={3}>
                      <div className="mb-3">
                        <Label className="form-label">Tại:</Label>
                        <Input
                          type="select"
                          name="cinema_id"
                          className={`form-control ${
                            formik.touched.cinema_id && formik.errors.cinema_id
                              ? "is-invalid"
                              : ""
                          }`}
                          {...formik.getFieldProps("cinema_id")}
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
                    Đổi mật khẩu ?
                  </Link>
                  <div className="d-flex justify-content-between mt-3">
                    <Button
                      color="secondary"
                      onClick={() => nav("/admin/account")}
                    >
                      Trở về
                    </Button>
                    <Button
                      color="primary"
                      type="submit"
                      disabled={patchUser.isLoading}
                    >
                      {patchUser.isLoading ? "Đang cập nhật..." : "Cập nhật"}
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
                <Label className="form-label">Mật khẩu:</Label>
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
                <Label className="form-label">Xác nhận mật khẩu:</Label>
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
    </div>
  );
};

export default UpdateAccount;
