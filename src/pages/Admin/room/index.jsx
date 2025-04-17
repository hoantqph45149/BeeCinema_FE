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
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../../Components/Common/Loader";
import { showConfirm } from "../../../Components/Common/showAlert";
import { useAuthContext } from "../../../Contexts/auth/UseAuth";

const Room = () => {
  const { hasPermission, authUser } = useAuthContext();
  const { data, isLoading } = useFetch(["rooms"], "/rooms");
  const { data: cinemas } = useFetch(["cinemas"], "/cinemas");
  const { data: branches } = useFetch(["branches"], "/branches");
  const { data: typeRooms } = useFetch(["typeRooms"], "/type-rooms");
  const { data: seatTemplates } = useFetch(
    ["seatTemplates"],
    "/seat-templates"
  );
  const { data: cinema } = useFetch(
    ["cinemas", authUser?.cinema_id],
    `/cinemas/${authUser?.cinema_id}`,
    {
      enabled: !!authUser?.cinema_id,
    }
  );

  const {
    create: createRoom,
    patch: patchRoom,
    delete: deleteRoom,
  } = useCRUD(["rooms"]);

  const nav = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [modal, setModal] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [roomsPublish, setRoomsPublish] = useState([]);
  const [roomsUnPublish, setRoomsUnPublish] = useState([]);
  const [room, setRoom] = useState({});
  const [rooms, setRooms] = useState([]);
  const [theatersByBranch, setTheatersByBranch] = useState([]);

  const toggleTab = (tab, type) => {
    if (activeTab !== tab && data?.data) {
      setActiveTab(tab);

      const allRooms = data.data;

      // Lọc theo cinema_id nếu có
      const filteredByCinema = authUser?.cinema_id
        ? allRooms.filter((room) => room.cinema_id === authUser.cinema_id)
        : allRooms;

      if (type === "all") {
        setRooms(filteredByCinema);
      } else if (type === "publish") {
        setRooms(filteredByCinema.filter((item) => item.is_publish === true));
      } else {
        setRooms(filteredByCinema.filter((item) => item.is_publish === false));
      }
    }
  };

  useEffect(() => {
    if (data?.data) {
      const allRooms = data.data;

      const filteredRooms = authUser?.cinema_id
        ? allRooms.filter((item) => item.cinema_id === authUser.cinema_id)
        : allRooms;

      const filterRoomsPublish = filteredRooms.filter(
        (item) => item.is_publish === true
      );

      const filterRoomsUnPublish = filteredRooms.filter(
        (item) => item.is_publish === false
      );

      setRoomsPublish(filterRoomsPublish);
      setRoomsUnPublish(filterRoomsUnPublish);
      setRooms(filteredRooms);
    }
  }, [data?.data, authUser?.cinema_id]);

  const toggle = () => {
    if (modal) {
      setModal(false);
      setRoom({});
    } else {
      setModal(true);
    }
  };

  const handleChangeBranch = (idBranche) => {
    const theaters =
      cinemas?.filter((item) => item.branch_id == idBranche) || [];
  };

  const handleUpdateActive = (roomItem) => {
    if (hasPermission("Sửa phòng chiếu")) {
      showConfirm(
        "Thay đổi trạng thái",
        "Bạn có chắc muốn thay đổi trạng thái không?",
        () => {
          patchRoom.mutate({
            url: `/rooms/${roomItem.id}`,
            data: {
              ...roomItem,
              is_active: roomItem.is_active ? false : true,
            },
          });
        }
      );
    }
    setRoom({});
  };

  const handleDeleteRoom = (roomItem) => {
    if (hasPermission("Xóa phòng chiếu")) {
      showConfirm(
        "Xóa Phòng Chiếu",
        `Bạn có chắc muốn xóa phòng chiếu ${roomItem.name} không?`,
        () => {
          deleteRoom.mutate(`/rooms/${roomItem.id}`);
        }
      );
    }
    setRoom({});
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: (room && room?.name) || "",
      branch_id: (room && room?.branch_id) || "",
      cinema_id: (room && room?.cinema_id) || "",
      type_room_id: (room && room?.type_room_id) || "",
      seat_template_id: (room && room?.seat_template_id) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Vui lòng nhập tên phòng chiếu"),
      branch_id: authUser.cinema_id
        ? ""
        : Yup.string().required("Vui lòng chọn chi nhánh"),
      cinema_id: authUser.cinema_id
        ? ""
        : Yup.string().required("Vui lòng chọn rạp chiếu"),
      type_room_id: Yup.string().required("Vui lòng chọn loại phòng chiếu"),
      seat_template_id: Yup.string().required("Vui lòng chọn mẫu sơ đồ ghế"),
    }),
    onSubmit: (values) => {
      if (isEdit && hasPermission("Sửa phòng chiếu")) {
        if (authUser.cinema_id) {
          values.cinema_id = cinema.id;
          values.branch_id = cinema.branch_id;
        }
        patchRoom.mutate(
          { url: `/rooms/${room.id}`, data: values },
          {
            onSuccess: (data) => {
              if (!data.room.is_publish) {
                nav(`/admin/room/${data.room.id}/edit`);
              }
              setModal(false);
            },
          }
        );
      } else if (hasPermission("Thêm phòng chiếu")) {
        createRoom.mutate(
          { url: "/rooms", data: values },
          {
            onSuccess: (data) => {
              nav(`/admin/room/${data.room.id}/edit`);
            },
          }
        );
        setModal(false);
      }
      formik.resetForm();
    },
  });

  // Column
  const columns = useMemo(
    () => [
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
        cell: (cell) => (
          <div className="flex-grow-1">
            <h5 className="fs-14 mb-1">{cell.getValue()}</h5>
            <Link
              to={`/admin/room/${cell.row.original.id}/edit`}
              className="text-info mb-0"
            >
              Xem sơ đồ ghế
              <span className="fw-medium"> {cell.row.original.category}</span>
            </Link>
          </div>
        ),
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
          return <span>{`${seat} / ${cell.row.original.totalSeats}`} Ghế</span>;
        },
      },
      {
        header: "Trạng thái",
        accessorKey: "is_publish",
        enableColumnFilter: false,
        cell: (cell) =>
          cell.getValue() ? (
            <span className="badge text-uppercase bg-success text-white">
              Đã xuất bản
            </span>
          ) : (
            <span className="badge text-uppercase bg-danger text-white">
              Chưa xuất bản
            </span>
          ),
      },
      {
        header: "Hoạt động",
        accessorKey: "is_active",
        enableColumnFilter: false,
        cell: (cell) =>
          hasPermission("Sửa phòng chiếu") ? (
            <div className="form-check form-switch form-check-right">
              <Input
                disabled={!cell.row.original.is_publish}
                className="form-check-input"
                type="checkbox"
                role="switch"
                id={`is_active_${cell.row.original.id}`}
                checked={cell.row.original.is_active}
                defaultChecked={cell.row.original.is_active}
                onChange={() => handleUpdateActive(cell.row.original)}
              />
            </div>
          ) : null,
      },
      {
        header: "Action",
        cell: (cell) => (
          <ul className="list-inline hstack gap-2 mb-0">
            {hasPermission("Sửa phòng chiếu") && (
              <li className="list-inline-item">
                <Button
                  color="primary"
                  className="btn-sm"
                  onClick={() => {
                    toggle();
                    setIsEdit(true);
                    setRoom(cell.row.original);
                    handleChangeBranch(cell.row.original.branch_id);
                  }}
                >
                  <i className="ri-pencil-fill"></i>
                </Button>
              </li>
            )}
            {hasPermission("Xóa phòng chiếu") && (
              <li className="list-inline-item">
                <Button
                  disabled={cell.row.original.is_publish}
                  color="primary"
                  className="btn-sm"
                  onClick={() => {
                    handleDeleteRoom(cell.row.original);
                  }}
                >
                  <i className="ri-delete-bin-5-fill"></i>
                </Button>
              </li>
            )}
          </ul>
        ),
      },
    ],
    [hasPermission]
  );

  document.title = "Quản lý phòng chiếu | Admin Dashboard";

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Danh sách phòng chiếu" pageTitle="Quản lý" />
        <Row>
          <Col lg={12}>
            <Card id="roomList">
              <CardHeader className="border-0">
                <Row className="align-items-center gy-3">
                  <div className="col-sm">
                    <h5 className="card-title mb-0">Danh sách phòng chiếu</h5>
                  </div>
                  <div className="col-sm-auto">
                    {hasPermission("Thêm phòng chiếu") && (
                      <button
                        type="button"
                        className="btn btn-success add-btn"
                        id="create-btn"
                        onClick={() => {
                          setIsEdit(false);
                          toggle();
                        }}
                      >
                        <i className="ri-add-line align-bottom me-1"></i> Tạo
                        phòng chiếu
                      </button>
                    )}
                  </div>
                </Row>
              </CardHeader>
              <CardBody className="pt-0">
                {hasPermission("Danh sách phòng chiếu") ? (
                  <>
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
                          {rooms?.length > 0 && (
                            <span className="badge bg-success align-middle ms-1">
                              {rooms.length}
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
                    {isLoading ? (
                      <Loader />
                    ) : (
                      <TableContainer
                        columns={columns}
                        data={rooms || []}
                        isGlobalFilter={true}
                        isAddUserList={false}
                        customPageSize={8}
                        divClass="table-responsive table-card mb-1"
                        tableClass="align-middle table-nowrap"
                        theadClass="table-light text-muted"
                        SearchPlaceholder="Tìm kiếm phòng chiếu..."
                      />
                    )}
                  </>
                ) : (
                  <p>Bạn không có quyền xem danh sách phòng chiếu.</p>
                )}
                {(hasPermission("Thêm phòng chiếu") ||
                  hasPermission("Sửa phòng chiếu")) && (
                  <Modal id="showModal" isOpen={modal} toggle={toggle} centered>
                    <ModalHeader toggle={toggle} className="bg-light">
                      {isEdit ? "Sửa phòng chiếu" : "Thêm phòng chiếu"}
                    </ModalHeader>
                    <Form onSubmit={formik.handleSubmit}>
                      <ModalBody>
                        <div className="mb-3">
                          <Label className="form-label">Tên phòng chiếu</Label>
                          <Input
                            type="text"
                            className={`form-control ${
                              formik.touched.name && formik.errors.name
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="Nhập tên phòng chiếu"
                            {...formik.getFieldProps("name")}
                          />
                          {formik.touched.name && formik.errors.name && (
                            <div className="invalid-feedback">
                              {formik.errors.name}
                            </div>
                          )}
                        </div>
                        {!authUser?.cinema_id && (
                          <Row>
                            <Col lg={6}>
                              <div className="mb-3">
                                <Label className="form-label">Chi nhánh</Label>
                                <select
                                  disabled={isEdit && room.is_publish}
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
                                  <option value="">
                                    --- Chọn chi nhánh ---
                                  </option>
                                  {branches?.data?.map((item) => (
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
                                <Label className="form-label">Rạp chiếu</Label>
                                <select
                                  disabled={isEdit && room.is_publish}
                                  className={`form-select ${
                                    formik.touched.cinema_id &&
                                    formik.errors.cinema_id
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  {...formik.getFieldProps("cinema_id")}
                                >
                                  <option value="">
                                    --- Chọn rạp chiếu ---
                                  </option>
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
                        )}
                        <Row>
                          <Col lg={6}>
                            <div className="mb-3">
                              <Label className="form-label">
                                Loại phòng chiếu
                              </Label>
                              <select
                                disabled={isEdit && room.is_publish}
                                className={`form-select ${
                                  formik.touched.type_room_id &&
                                  formik.errors.type_room_id
                                    ? "is-invalid"
                                    : ""
                                }`}
                                {...formik.getFieldProps("type_room_id")}
                              >
                                <option value="">
                                  --- Chọn loại phòng chiếu ---
                                </option>
                                {typeRooms?.data?.map((item) => (
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
                              <Label className="form-label">
                                Mẫu sơ đồ ghế
                              </Label>
                              <select
                                disabled={isEdit && room.is_publish}
                                className={`form-select ${
                                  formik.touched.seat_template_id &&
                                  formik.errors.seat_template_id
                                    ? "is-invalid"
                                    : ""
                                }`}
                                {...formik.getFieldProps("seat_template_id")}
                              >
                                <option value="">
                                  --- Chọn mẫu sơ đồ ghế ---
                                </option>
                                {seatTemplates?.data?.map((item) => (
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
                      </ModalBody>
                      <div className="modal-footer">
                        <Button type="button" color="light" onClick={toggle}>
                          Đóng
                        </Button>
                        <Button
                          type="submit"
                          color="success"
                          disabled={createRoom.isLoading || patchRoom.isLoading}
                        >
                          {isEdit ? "Sửa" : "Thêm"}
                        </Button>
                      </div>
                    </Form>
                  </Modal>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Room;
