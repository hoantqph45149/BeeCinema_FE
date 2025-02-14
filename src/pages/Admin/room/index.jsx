import classnames from "classnames";
import React, { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  Row,
  Button,
  Input,
  Form,
} from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableContainer from "../../../Components/Common/TableContainer";
import { useCRUD, useFetch } from "../../../Hooks/useCRUD";

const Room = () => {
  const { data } = useFetch(["rooms"], "/rooms");
  const { data: cinemas } = useFetch(["cinemas"], "/cinemas");
  const { data: branches } = useFetch(["branches"], "/branches");
  const { data: typeRooms } = useFetch(["typeRooms"], "/type-rooms");
  const { data: seatTemplates } = useFetch(
    ["seatTemplates"],
    "/seat-templates"
  );
  const { create: createRoom, patch: patchRoom } = useCRUD(["rooms"]);
  const [isEdit, setIsEdit] = useState(false);
  const [modal, setModal] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [roomsPublish, setRoomsPublish] = useState([]);
  const [roomsUnPublish, setRoomsUnPublish] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [theatersByBranch, setTheatersByBranch] = useState([]);

  const toggleTab = (tab, type) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      let filterRooms = data.data;
      if (type === "all") {
        setRooms(data.data);
      } else if (type === "publish") {
        filterRooms = data.data.filter((item) => item.is_publish === true);
        console.log(filterRooms);
        setRooms(filterRooms);
      } else {
        filterRooms = data.data.filter((item) => item.is_publish === false);
        setRooms(filterRooms);
      }
    }
  };

  useEffect(() => {
    if (data?.data) {
      const filterRoomsPublish = data?.data.filter(
        (item) => item.is_publish === true
      );
      const filterRoomsUnPublish = data?.data.filter(
        (item) => item.is_publish === false
      );
      setRoomsPublish(filterRoomsPublish);
      setRoomsUnPublish(filterRoomsUnPublish);
      setRooms(data.data);
    }
  }, [data?.data]);

  const toggle = () => setModal(!modal);

  const handleChangeBranch = (idBranche) => {
    const theaters = cinemas.filter((item) => item.branch_id == idBranche);
    console.log(theaters);
    setTheatersByBranch(theaters);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      branch_id: "",
      cinema_id: "",
      type_room_id: "",
      seat_template_id: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Vui lòng nhập tên chi nhánh"),
      branch_id: Yup.string().required("Vui lòng chọn chi nhánh"),
      cinema_id: Yup.string().required("Vui lòng chọn rạp chiếu"),
      type_room_id: Yup.string().required("Vui lòng chọn loại phòng chiếu"),
      seat_template_id: Yup.string().required("Vui lòng chọn mẫu sơ đồ ghế"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
      } else {
        createRoom.mutate({ url: "/rooms", data: values });
        setModal(false);
      }
    },
  });

  // Column
  const columns = useMemo(() => [
    {
      header: "#",
      accessorKey: "id",
      enableColumnFilter: false,
      enableSorting: false,
    },
    {
      header: "Phòng chiếu",
      accessorKey: "name",
      enableColumnFilter: false,
    },
    {
      header: "Rạp chiếu",
      accessorKey: "cinema.name",
      enableColumnFilter: false,
    },
    {
      header: "Loại Phòng",
      accessorKey: "type_room.name",
      enableColumnFilter: false,
    },
    {
      header: "Sức chứa",
      accessorKey: "totalSeats",
      enableColumnFilter: false,
      cell: (cell) => {
        const seat = cell.getValue() - cell.row.original.brokenSeats;
        return (
          <>
            <span> {`${seat} / ${cell.row.original.totalSeats}`} Ghế</span>
          </>
        );
      },
    },
    {
      header: "Trạng thái",
      accessorKey: "is_publish",
      enableColumnFilter: false,
      cell: (cell) => {
        switch (cell.getValue()) {
          case true:
            return (
              <span className="badge text-uppercase bg-success text-white">
                Đã xuất Bản
              </span>
            );
          case false:
            return (
              <span className="badge text-uppercase bg-danger text-white">
                Chưa Xuất Bản
              </span>
            );
        }
      },
    },
    {
      header: "Hoạt động",
      accessorKey: "is_active",
      enableColumnFilter: false,
      cell: (cell) => {
        // console.log(cell);
        return (
          <>
            <div className="form-check form-switch form-check-right">
              <Input
                disabled={!cell.row.original.is_publish}
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckRightDisabled"
                defaultChecked={cell.row.original.is_active}
                // onChange={() => handleUpdateActive(cell.row.original)}
              />
            </div>
          </>
        );
      },
    },
  ]);

  document.title = "";
  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Danh sách phòng chiếu" pageTitle="Quản lý" />
        <Row>
          <Col lg={12}>
            <Card id="orderList">
              <CardHeader className="border-0">
                <Row className="align-items-center gy-3">
                  <div className="col-sm">
                    <h5 className="card-title mb-0">Danh sách phòng chiếu</h5>
                  </div>
                  <div className="col-sm-auto">
                    <div className="d-flex gap-1 flex-wrap">
                      <button
                        type="button"
                        className="btn btn-success add-btn"
                        id="create-btn"
                        onClick={() => {
                          setIsEdit(false);
                          toggle();
                        }}
                      >
                        <i className="ri-add-line align-bottom me-1"></i>
                        Tạo phòng chiếu
                      </button>{" "}
                    </div>
                  </div>
                </Row>
              </CardHeader>
              <CardBody className="pt-0">
                <div>
                  <Nav
                    className="nav-tabs nav-tabs-custom nav-success"
                    role="tablist"
                  >
                    <NavItem>
                      <NavLink
                        className={classnames(
                          { active: activeTab === "1" },
                          "fw-semibold"
                        )}
                        onClick={() => {
                          toggleTab("1", "all");
                        }}
                        href="#"
                      >
                        <i className="ri-store-2-fill me-1 align-bottom"></i>{" "}
                        Tất cả
                        {data?.data.length > 0 && (
                          <span className="badge bg-success align-middle ms-1">
                            {data?.data.length}
                          </span>
                        )}
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames(
                          { active: activeTab === "2" },
                          "fw-semibold"
                        )}
                        onClick={() => {
                          toggleTab("2", "publish");
                        }}
                        href="#"
                      >
                        {" "}
                        <i className="ri-checkbox-circle-line me-1 align-bottom"></i>{" "}
                        Đã xuất bản
                        {roomsPublish.length > 0 && (
                          <span className="badge bg-success align-middle ms-1">
                            {roomsPublish.length}
                          </span>
                        )}
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames(
                          { active: activeTab === "3" },
                          "fw-semibold"
                        )}
                        onClick={() => {
                          toggleTab("3", "unPublish");
                        }}
                        href="#"
                      >
                        Bản nháp
                        {roomsUnPublish.length > 0 && (
                          <span className="badge bg-danger align-middle ms-1">
                            {roomsUnPublish.length}
                          </span>
                        )}
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TableContainer
                    columns={columns}
                    data={rooms}
                    isGlobalFilter={true}
                    isAddUserList={false}
                    customPageSize={8}
                    divClass="table-responsive table-card mb-1"
                    tableClass="align-middle table-nowrap"
                    theadClass="table-light text-muted"
                    SearchPlaceholder="Search for order ID, customer, order status or something..."
                  />
                </div>
                <Modal id="showModal" isOpen={modal} toggle={toggle} centered>
                  <ModalHeader toggle={toggle} className="bg-light">
                    {isEdit ? "Sửa phòng chiếu" : "Thêm phòng chiếu"}
                  </ModalHeader>
                  <Form onSubmit={formik.handleSubmit}>
                    <ModalBody>
                      <div className="mb-3">
                        <label className="form-label">Tên chi nhánh</label>
                        <input
                          type="text"
                          className={`form-control ${
                            formik.touched.name && formik.errors.name
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="Nhập tên chi nhánh"
                          {...formik.getFieldProps("name")}
                        />
                        {formik.touched.name && formik.errors.name && (
                          <div className="invalid-feedback">
                            {formik.errors.name}
                          </div>
                        )}
                      </div>
                      <Row>
                        <Col lg={6}>
                          <div className="mb-3">
                            <Label className="form-label">Chi Nhánh</Label>
                            <select
                              className={`form-select ${
                                formik.touched.branch_id &&
                                formik.errors.branch_id
                                  ? "is-invalid"
                                  : ""
                              }`}
                              {...formik.getFieldProps("branch_id")}
                              onChange={(e) => {
                                formik.handleChange(e);
                                handleChangeBranch(e.target.value);
                              }}
                            >
                              <option value="">--- Chọn Chi Nhánh ---</option>
                              {branches?.data.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                            {formik.touched.branch_id &&
                              formik.errors.branch_id && (
                                <div className="invalid-feedback">
                                  {formik.errors.branch_id}
                                </div>
                              )}
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                            <Label className="form-label">Rạp Chiếu</Label>
                            <select
                              className={`form-select ${
                                formik.touched.cinema_id &&
                                formik.errors.cinema_id
                                  ? "is-invalid"
                                  : ""
                              }`}
                              {...formik.getFieldProps("cinema_id")}
                            >
                              <option value="">--- Chọn Rạp Chiếu ---</option>
                              {theatersByBranch?.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                            {formik.touched.cinema_id &&
                              formik.errors.cinema_id && (
                                <div className="invalid-feedback">
                                  {formik.errors.cinema_id}
                                </div>
                              )}
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={6}>
                          <div className="mb-3">
                            <Label className="form-label">
                              Loại Phòng Chiếu
                            </Label>
                            <select
                              className={`form-select ${
                                formik.touched.type_room_id &&
                                formik.errors.type_room_id
                                  ? "is-invalid"
                                  : ""
                              }`}
                              {...formik.getFieldProps("type_room_id")}
                            >
                              <option value="">Chọn Loại Phòng Chiếu</option>
                              {typeRooms?.data.data.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                            {formik.touched.type_room_id &&
                              formik.errors.type_room_id && (
                                <div className="invalid-feedback">
                                  {formik.errors.type_room_id}
                                </div>
                              )}
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                            <Label className="form-label">Mẫu Sơ Đồ Ghế</Label>
                            <select
                              className={`form-select ${
                                formik.touched.seat_template_id &&
                                formik.errors.seat_template_id
                                  ? "is-invalid"
                                  : ""
                              }`}
                              {...formik.getFieldProps("seat_template_id")}
                            >
                              <option value="">Chọn Mẫu Sơ Đồ Ghế</option>
                              {seatTemplates?.data.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                            {formik.touched.seat_template_id &&
                              formik.errors.seat_template_id && (
                                <div className="invalid-feedback">
                                  {formik.errors.seat_template_id}
                                </div>
                              )}
                          </div>
                        </Col>
                      </Row>
                      <div className="modal-footer">
                        <Button type="button" color="light" onClick={toggle}>
                          Đóng
                        </Button>
                        <Button type="submit" color="success">
                          {isEdit ? "Sửa" : "Thêm "}
                        </Button>
                      </div>
                    </ModalBody>
                  </Form>
                </Modal>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Room;
