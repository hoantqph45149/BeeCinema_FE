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
} from "reactstrap";

// RangeSlider

import BreadCrumb from "../../../Components/Common/BreadCrumb";
// import { Price } from "./BranchCol";

import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import TableContainer from "../../../Components/Common/TableContainer";

const Branch = () => {
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
        <BreadCrumb title="Quản lý chi nhánh" pageTitle="Quản lý chi nhánh" />

        <Row>
          <Col xl={4} lg={5}>
            <Card>
              <CardHeader>
                <div className="d-flex mb-3">
                  <div className="flex-grow-1">
                    <h5 className="fs-16">Thêm mới chi nhánh</h5>
                  </div>
                </div>
              </CardHeader>

              <div className="accordion accordion-flush">
                <div className="card-body">
                  <Label className="form-label">Tên chi nhánh</Label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Nhập tên chi nhánh"
                  />
                </div>
                <div className="card-body border-bottom">
                  <Button color="primary" className="btn-block">
                    Thêm chi nhánh
                  </Button>
                </div>
              </div>
            </Card>
          </Col>

          <Col xl={8} lg={7}>
            <div>
              <Card>
                <div className="card-header border-0">
                  <Row className=" align-items-center">
                    <Col>
                      <div className="d-flex mb-3">
                        <div className="flex-grow-1">
                          <h5 className="fs-16">Danh sách chi nhánh</h5>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="card-body pt-0">
                  <TableContainer
                    columns={columns}
                    data={[
                      {
                        id: 1,
                        name: "Chi nhánh 1",
                        acctive: "Hoa ctive",
                        createdAt: "2022-02-02",
                        updatedAt: "2022-02-02",
                      },
                    ]}
                    isGlobalFilter={true}
                    isAddUserList={false}
                    customPageSize={10}
                    divClass="table-responsive mb-1"
                    tableClass="mb-0 align-middle table-borderless"
                    theadClass="table-light text-muted"
                    SearchPlaceholder="Search Products..."
                  />
                </div>
                <Modal id="showModal" isOpen={modal} toggle={toggle} centered>
                    <ModalHeader className="bg-light p-3" toggle={toggle}>
                      Sửa chi nhánh
                    </ModalHeader>
                    <Form
                      className="tablelist-form"
                      onSubmit={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <ModalBody>
                        <div className="mb-3">
                          <Label htmlFor="id-field" className="form-label">
                            Tên chi nhánh
                          </Label>
                          <Input
                            name="name"
                            id="id-field"
                            className="form-control"
                            placeholder="Tên chi nhánh"
                            type="text"
                          />
                        </div>
                      </ModalBody>
                      <div className="modal-footer">
                        <div className="hstack gap-2 justify-content-end">
                          <button
                            type="button"
                            className="btn btn-light"
                            onClick={() => {
                              setModal(false);
                            }}
                          >
                            Đóng
                          </button>

                          <button type="submit" className="btn btn-success">
                          Sửa
                        </button>
                      </div>
                    </div>
                  </Form>
                </Modal>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Branch;
