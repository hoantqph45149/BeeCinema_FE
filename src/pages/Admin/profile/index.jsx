import React from "react";
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
import { FaUser, FaClock } from "react-icons/fa";

const Profile = () => {
  return (
    <div
      className="page-content"
      style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}
    >
      <Container fluid>
        <div
          className="position-relative"
          style={{ height: "300px", overflow: "hidden" }}
        >
          <img
            src="https://png.pngtree.com/thumb_back/fh260/background/20190220/ourmid/pngtree-summer-ocean-beach-tourism-image_9481.jpg" // Thay bằng đường dẫn ảnh nền
            alt="Cover"
            className=" w-100 h-100"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>

        <Row className="mt-n5 justify-content-center">
          <Col lg={3} className="text-center">
            <Card className="shadow-sm p-3 text-center">
              <div className="mb-3">
                <img
                  src="https://banner2.cleanpng.com/20180331/khw/avibqco8t.webp"
                  alt="Avatar"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <h5 className="mb-0">System Admin</h5>
              <small className="text-muted">Quản trị viên</small>
            </Card>
          </Col>
          <Col lg={8}>
            <Card className="shadow-md">
              <CardBody>
                <div className="d-flex align-items-center gap-3 mb-3">
                  {/* Hồ sơ cá nhân */}
                  <div className="d-flex align-items-center">
                    <FaUser className="me-2" />
                    <span className="fw-bold">Hồ sơ cá nhân</span>
                  </div>

                  {/* Thay đổi mật khẩu */}
                  <div className="d-flex align-items-center">
                    <FaClock className="me-2" />
                    <span className="fw-bold">Thay đổi mật khẩu</span>
                  </div>
                </div>
                <Form>
                  <Row>
                    <Col md={6}>
                      <Label>Họ và tên</Label>
                      <Input type="text" defaultValue="System Admin" disabled />
                    </Col>
                    <Col md={6}>
                      <Label>Giới tính</Label>
                      <Input type="text" defaultValue="Nam" disabled />
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col md={6}>
                      <Label>Ngày sinh</Label>
                      <Input type="text" defaultValue="07/02/2004" disabled />
                    </Col>
                    <Col md={6}>
                      <Label>Số điện thoại</Label>
                      <Input type="text" defaultValue="0332295555" disabled />
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col md={6}>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        defaultValue="admin@fpt.edu.vn"
                        disabled
                      />
                    </Col>
                    <Col md={6}>
                      <Label>Địa chỉ</Label>
                      <Input
                        type="text"
                        defaultValue="Bích Hòa, Thanh Oai, Hà Nội"
                        disabled
                      />
                    </Col>
                  </Row>
                  <div className="text-end mt-4">
                    <Button color="primary">Thay đổi thông tin</Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
