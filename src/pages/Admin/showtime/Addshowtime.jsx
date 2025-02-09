import React, { useMemo, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  Col,
  Container,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";

// RangeSlider
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import TableContainer from "../../../Components/Common/TableContainer";

const Addshowtime = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const columns = useMemo(() => [
    {
      header: "#",
      accessorKey: "id",
      enableColumnFilter: false,
      enableSorting: false,
    },
    {
      header: "Tên chi nhánh",
      accessorKey: "name",
      enableColumnFilter: false,
      enableSorting: true,
    },
    {
      header: "Hoạt động",
      accessorKey: "acctive",
      enableColumnFilter: false,
    },
    {
      header: "Ngày tạo",
      accessorKey: "createdAt",
      enableColumnFilter: false,
    },
    {
      header: "Ngày cập nhật",
      accessorKey: "updatedAt",
      enableColumnFilter: false,
    },
    {
      header: "Action",
      cell: (cell) => {
        return (
          <>
            <Link
              className="action-icon"
              onClick={() => {
                setIsEdit(true);
                toggle();
              }}
            >
              <i className="ri-pencil-fill"></i>
            </Link>
          </>
        );
      },
    },
  ]);
  document.title = "";

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
                          <Label className="form-label">Tên phim</Label>
                          <Input
                            type="text"
                            className="form-control"
                            placeholder="Nhập tên phim"
                          />
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
                          <Label className="form-label">Têm chi nhánh</Label>
                          <Input
                            type="text"
                            className="form-control"
                            placeholder="Nhập chi nhánh"
                          />
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
                      <Col lg={8}>
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
                        <div>
                          <Button color="primary" className="mt-4">
                            <i className="ri-time-fill me-2">Thêm giờ chiếu</i>
                          </Button>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={4}>
                        <div className="mb-3">
                          <Label
                            htmlFor="exampleInputtime"
                            className="form-label"
                          >
                            Input Time
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
                            Input Time
                          </Label>
                          <Input
                            type="time"
                            className="form-control"
                            id="exampleInputtime"
                          />
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div>
                          <Button color="primary" className="mt-4">
                            <i className="ri-fill me-2 ">Xóa</i>
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <div className="d-flex mb-3">
                  <div className="flex-grow-1">
                    <div className="card-body border-bottom border-light d-flex justify-content-start">
                      <Button color="primary" className="mr-3">
                        Lưu nháp
                      </Button>
                      <Button color="primary">Xuất bản</Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Col>

          <Col xl={4} lg={5}>
            <Card>
              <CardHeader>
                <div className="d-flex mb-3">
                  <div className="flex-grow-1">
                    <h5 className="fs-16">Suất chiếu đang có </h5>
                  </div>
                </div>
              </CardHeader>
            </Card>
            <Card>
              <div className="table-responsive">
                <Table className="table-bordered align-middle table-nowrap mb-0">
                  <thead>
                    <tr>
                      <th scope="col">Thời gian</th>
                      <th scope="col">Phòng</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="fw-medium">01</td>
                      <td>Implement new UX</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Addshowtime;
