import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Input,
  Label,
  Row,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableContainer from "../../../Components/Common/TableContainer";

const Ticket = () => {
  // Column
  const columns = useMemo(() => [
    {
      header: "Mã vé",
      accessorKey: "id",
      enableColumnFilter: false,
      enableSorting: false,
    },
    {
      header: "Thông tin người dùng",
      accessorKey: "customer",
      enableColumnFilter: false,
    },
    {
      header: "Hình ảnh",
      accessorKey: "email",
      enableColumnFilter: false,
    },
    {
      header: "Thông tin vé",
      accessorKey: "phone",
      enableColumnFilter: false,
    },

    {
      header: "Action",
      cell: (cellProps) => {
        return (
          <ul className="list-inline hstack gap-2 mb-0">
            <li className="list-inline-item edit" title="Edit">
              <Link
                to="#"
                className="text-primary d-inline-block edit-item-btn"
              >
                <i className="ri-pencil-fill fs-16"></i>
              </Link>
            </li>
            <li className="list-inline-item" title="Remove">
              <Link
                to="#"
                className="text-danger d-inline-block remove-item-btn"
              >
                <i className="ri-delete-bin-5-fill fs-16"></i>
              </Link>
            </li>
          </ul>
        );
      },
    },
  ]);

  document.title = "Quản lý vé";
  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Quản lý vé" pageTitle="Quản lý" />
        <Row>
          <Col lg={12}>
            <Card id="orderList">
              <CardHeader className="border-0">
                <Row className="align-items-center gy-3">
                  <Form>
                    <Row className="g-3">
                      <Col lg={4} xl={2} md={6} sm={12}>
                        <div>
                          <Label className="form-label " for="address">
                            Chi nhánh
                          </Label>
                          <select id="address" className="form-select">
                            <option>Hà Nội</option>
                            <option defaultValue="1">Hải Phòng</option>
                            <option defaultValue="2">Thái Bình</option>
                            <option defaultValue="3">
                              Thành Phố Hồ Chí Minh
                            </option>
                          </select>
                        </div>
                      </Col>
                      <Col lg={4} xl={2} md={6} sm={12}>
                        <div>
                          <Label className="form-label " for="rap">
                            Rạp
                          </Label>
                          <select id="rap" className="form-select">
                            <option>Hà Nội</option>
                            <option defaultValue="1">Hải Phòng</option>
                            <option defaultValue="2">Thái Bình</option>
                            <option defaultValue="3">
                              Thành Phố Hồ Chí Minh
                            </option>
                          </select>
                        </div>
                      </Col>
                      <Col lg={4} xl={2} md={6} sm={12}>
                        <div>
                          <Label className="form-label " for="phim">
                            Phim
                          </Label>
                          <select id="phim" className="form-select">
                            <option>Hà Nội</option>
                            <option defaultValue="1">Hải Phòng</option>
                            <option defaultValue="2">Thái Bình</option>
                            <option defaultValue="3">
                              Thành Phố Hồ Chí Minh
                            </option>
                          </select>
                        </div>
                      </Col>
                      <Col lg={4} xl={2} md={6}>
                        <div>
                          <Label
                            htmlFor="exampleInputdate"
                            className="form-label"
                          >
                            Ngày
                          </Label>
                          <Input
                            type="date"
                            className="form-control"
                            id="exampleInputdate"
                          />
                        </div>
                      </Col>
                      <Col lg={4} xl={2} md={6} sm={12}>
                        <div>
                          <Label className="form-label" for="trangthai">
                            Trạng thái
                          </Label>
                          <select id="trangthai" className="form-select">
                            <option>Hà Nội</option>
                            <option defaultValue="1">Hải Phòng</option>
                            <option defaultValue="2">Thái Bình</option>
                            <option defaultValue="3">
                              Thành Phố Hồ Chí Minh
                            </option>
                          </select>
                        </div>
                      </Col>
                      <Col lg={2} md={12} sm={12}>
                        <div>
                          <Label className="form-label">&nbsp;</Label>
                          <Button
                            type="button"
                            color="primary"
                            className="btn w-100"
                          >
                            {" "}
                            <i className="ri-equalizer-fill me-1 align-bottom"></i>
                            Filters
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </Row>
              </CardHeader>
              <CardBody className="pt-0">
                <TableContainer
                  columns={columns}
                  data={[]}
                  isGlobalFilter={true}
                  isAddUserList={false}
                  customPageSize={8}
                  divClass="table-responsive table-card mb-1"
                  tableClass="align-middle table-nowrap"
                  theadClass="table-light text-muted"
                  SearchPlaceholder="Search for order ID, customer, order status or something..."
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Ticket;
