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
import BreadCrumb from "../../../Components/Common/BreadCrumb";

const AddAdminAccount = () => {
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
            <Form onSubmit={(e) => e.preventDefault()}>
              <Card>
                <CardBody>
                  <Row>
                    <Col lg={12} className="text-center mb-4">
                      <div className="avatar-upload">
                        <div className="avatar-preview">
                          <img
                            src="https://via.placeholder.com/100"
                            alt="Avatar"
                            className="rounded-circle"
                          />
                        </div>
                        <Input
                          type="file"
                          className="d-none"
                          id="upload-avatar"
                        />
                        <Label
                          htmlFor="upload-avatar"
                          className="btn btn-light btn-sm"
                        >
                          <i className="fas fa-camera"></i>
                        </Label>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={4} md={12}>
                      <div className="mb-3">
                        <Label className="form-label">
                          <span className="text-danger">*</span> Họ và tên:
                        </Label>
                        <Input type="text" placeholder="Họ và tên" />
                      </div>
                    </Col>
                    <Col lg={4} md={12}>
                      <div className="mb-3">
                        <Label className="form-label">
                          <span className="text-danger">*</span> Email:
                        </Label>
                        <Input type="email" placeholder="user123@gmail.com" />
                      </div>
                    </Col>
                    <Col lg={4} md={12}>
                      <div className="mb-3">
                        <Label className="form-label">
                          <span className="text-danger">*</span> Số điện thoại:
                        </Label>
                        <Input type="text" placeholder="0965263725" />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={6}>
                      <div className="mb-3">
                        <Label className="form-label">
                          <span className="text-danger">*</span> Mật khẩu:
                        </Label>
                        <Input type="password" placeholder="Mật khẩu" />
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
                          placeholder="Xác nhận mật khẩu"
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={3}>
                      <div className="mb-3">
                        <Label className="form-label">Ngày sinh:</Label>
                        <Input type="date" />
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
                        <Input type="text" placeholder="Vai trò" />
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
                        <Input
                          type="textarea"
                          placeholder="Tòa FPT, Trịnh Văn Bô, Nam Từ Liêm, Hà Nội"
                        />
                      </div>
                    </Col>
                  </Row>
                  <div className="d-flex justify-content-between">
                    <Button color="secondary">Trở về</Button>
                    <Button color="primary" type="submit">
                      Thêm mới
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
