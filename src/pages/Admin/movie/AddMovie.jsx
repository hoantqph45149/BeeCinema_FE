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

const AddMovie = () => {
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
        <BreadCrumb title="Quản lý phim" pageTitle="Thêm mới" />

        <Row>
          <Col xl={8} lg={7}>
            <div>
              <Card>
                <div className="card-header border-0">
                  <Row className="align-items-center">
                    <Col>
                      <div className="d-flex mb-3">
                        <div className="flex-grow-1">
                          <h5 className="fs-16">Quản lý phim</h5>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="card-body">
                  <Form>
                    <Row>
                      <Col lg={12}>
                        <div className="mb-3">
                          <Label className="form-label">Tên phim</Label>
                          <Input
                            type="text"
                            className="form-control"
                            placeholder="Nhập tên phim"
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={4}>
                        <div className="mb-3">
                          <Label className="form-label">Đạo diễn</Label>
                          <Input
                            type="text"
                            className="form-control"
                            placeholder="Nhập đạo diễn"
                          />
                        </div>
                      </Col>
                      <Col lg={8}>
                        <div className="mb-3">
                          <Label className="form-label">Diễn viên</Label>
                          <Input
                            type="text"
                            className="form-control"
                            placeholder="Nhập diễn viên"
                          />
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
                        <div>
                          <Label
                            htmlFor="exampleInputdate"
                            className="form-label"
                          >
                            Ngày kết thúc
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
                          <Label className="form-label">Thời lượng </Label>
                          <Input
                            type="text"
                            className="form-control"
                            placeholder="Nhập thời lượng phim "
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={4}>
                        <div className="mb-3">
                          <Label className="form-label">Thể loại </Label>
                          <Input
                            type="text"
                            className="form-control"
                            placeholder="Nhập thể loại phim "
                          />
                        </div>
                      </Col>
                      <Col lg={8}>
                        <div className="mb-3">
                          <Label className="form-label">
                            Giới hạn độ tuổi{" "}
                          </Label>
                          <select
                            className="form-select mb-3"
                            aria-label="Default select example"
                          >
                            <option defaultValue="1">16 tuổi trở lên </option>
                            <option defaultValue="2">18 tuổi trở lên</option>
                            <option defaultValue="3">K giới hạn</option>
                          </select>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12}>
                        <div className="mb-3">
                          <Label className="form-label">Phiên bản </Label>
                          <select
                            className="form-select mb-3"
                            aria-label="Default select example"
                          >
                            <option defaultValue="1">Phụ đề </option>
                            <option defaultValue="2">Vietsub</option>
                            <option defaultValue="3">Thuyết minh</option>
                          </select>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12}>
                        <div>
                          <Label
                            htmlFor="exampleFormControlTextarea5"
                            className="form-label"
                          >
                            Mô tả
                          </Label>
                          <textarea
                            className="form-control"
                            id="exampleFormControlTextarea5"
                            rows="7"
                          ></textarea>
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
                    <h5 className="fs-16">Phụ thu</h5>
                  </div>
                </div>
                <Row>
                  <div className="table-responsive">
                    <Table className="table-bordered border-secondary table-nowrap align-middle mb-0">
                      <thead>
                        <tr>
                          <th scope="col">Giá vé thu thêm</th>
                          <th scope="col">Lý do thu thêm</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <Col lg={12}>
                              <div className="mb-3">
                                <Input
                                  type="text"
                                  className="form-control"
                                  placeholder="Nhập thể loại phim "
                                />
                              </div>
                            </Col>
                          </td>
                          <td>
                            <Col lg={12}>
                              <div>
                                <textarea
                                  className="form-control"
                                  id="exampleFormControlTextarea5"
                                  rows="3"
                                ></textarea>
                              </div>
                            </Col>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </Row>
              </CardHeader>
            </Card>
            <div className="card-body border-bottom border-light get-end d-flex justify-content-end">
              <Button color="primary" className="mr-3">
                Lưu nháp
              </Button>
              <Button color="primary">Xuất bản</Button>
            </div>
          </Col>

          <Col xl={4} lg={5}>
            <Card>
              <CardHeader>
                <div className="d-flex mb-3">
                  <div className="flex-grow-1">
                    <h5 className="fs-16">Thêm mới </h5>
                  </div>
                </div>
              </CardHeader>
              <Row>
                <Col>
                  <div className="mt-4 mt-md-0">
                    <div>
                      <div className="form-check form-switch form-check-right mb-2">
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
              <Row>
                <Col>
                  <div className="mt-4 mt-md-0">
                    <div>
                      <div className="form-check form-switch form-check-right mb-2">
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
                          Nổi bật:
                        </Label>
                      </div>
                    </div>
                  </div>
                </Col>
                <div className="card-body border-bottom border-light get-end d-flex justify-content-end">
                  <Button color="primary" className="mr-3">
                    Lưu nháp
                  </Button>
                  <Button color="primary">Xuất bản</Button>
                </div>
              </Row>
            </Card>
            <Card>
              <CardHeader>
                <div className="accordion accordion-flush">
                  <div className="card-body">
                    <div>
                      <Label htmlFor="formFile" className="form-label">
                        Hình ảnh:
                      </Label>
                      <Input
                        className="form-control"
                        type="file"
                        id="formFile"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="accordion accordion-flush">
                  <div className="card-body">
                    <Label className="form-label">Code Youtube</Label>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Nhập code"
                    />
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default AddMovie;
