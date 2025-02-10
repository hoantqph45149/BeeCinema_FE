import React, { useMemo } from "react";
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

// RangeSlider
import { ToastContainer } from "react-toastify";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableContainer from "../../../Components/Common/TableContainer";

const Updateshowtime = () => {
  const columns = useMemo(() => [
    {
      header: "Thời gian",
      accessorKey: "customer",
      enableColumnFilter: false,
    },
    {
      header: "Phòng",
      accessorKey: "customer",
      enableColumnFilter: false,
    },
  ]);
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
                      <div className="d-flex mb-3">
                        <div className="flex-grow-1">
                          <h5 className="fs-16">Thêm thông tin suất chiếu</h5>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="card-body">
                  <Form>
                    <Row>
                      <Col lg={8}>
                        <div className="mb-3">
                          <Label className="form-label">Tên phim: </Label>
                          <select
                            className="form-select mb-3"
                            aria-label="Default select example"
                          >
                            <option defaultValue="1">Nụ hôn thần chết </option>
                            <option defaultValue="2">Cơn mưa bạc tỷ </option>
                            <option defaultValue="3">Tokuda</option>
                          </select>
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="mb-3">
                          <Label className="form-label">Phiên bản phim </Label>
                          <select
                            className="form-select mb-3"
                            aria-label="Default select example"
                          >
                            <option defaultValue="1">Vietsub </option>
                            <option defaultValue="2">Thuyết minh </option>
                            <option defaultValue="3">Phụ đề</option>
                          </select>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={4}>
                        <div className="mb-3">
                          <Label className="form-label">Tên chi nhánh</Label>
                          <select
                            className="form-select mb-3"
                            aria-label="Default select example"
                          >
                            <option defaultValue="1">Hà Nội </option>
                            <option defaultValue="2">Thuyết minh </option>
                            <option defaultValue="3">Phụ đề</option>
                          </select>
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="mb-3">
                          <Label className="form-label">Tên rạp </Label>
                          <select
                            className="form-select mb-3"
                            aria-label="Default select example"
                          >
                            <option defaultValue="1">Hà Nội </option>
                            <option defaultValue="2">Thuyết minh </option>
                            <option defaultValue="3">Phụ đề</option>
                          </select>
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="mb-3">
                          <Label className="form-label">Tên phòng </Label>
                          <select
                            className="form-select mb-3"
                            aria-label="Default select example"
                          >
                            <option defaultValue="1">1 </option>
                            <option defaultValue="2">2 </option>
                            <option defaultValue="3">3</option>
                          </select>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={4}>
                        <div>
                          <Label
                            htmlFor="exampleInputdate"
                            className="form-label"
                          >
                            Ngày khởi chiếu
                          </Label>
                          <Input
                            type="date"
                            className="form-control"
                            id="exampleInputdate"
                          />
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="mb-3">
                          <Label
                            htmlFor="exampleInputtime"
                            className="form-label"
                          >
                            Giờ chiếu:
                          </Label>
                          <Input
                            type="time"
                            className="form-control"
                            id="exampleInputtime"
                          />
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="mb-3">
                          <Label
                            htmlFor="exampleInputtime"
                            className="form-label"
                          >
                            Giờ kết thúc:
                          </Label>
                          <Input
                            type="time"
                            className="form-control"
                            id="exampleInputtime"
                          />
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </Card>
            </div>
            <Card>
              <div className="card-body">
                <Button color="primary">Xuất bản</Button>
              </div>
            </Card>
          </Col>

          <Col xl={4} lg={5}>
            <Card>
              <CardBody>
                <div className="d-flex">
                  <div className="flex-grow-1">
                    <Row className="justify-content-center ">
                      <Col>
                        <div className="mt-4 mt-md-0">
                          <div>
                            <div className="form-check form-switch form-check-right">
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
                      </Col>
                    </Row>
                  </div>
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <TableContainer
                  columns={columns}
                  data={[]}
                  isAddUserList={false}
                  customPageSize={8}
                  className="custom-header-css"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Updateshowtime;
