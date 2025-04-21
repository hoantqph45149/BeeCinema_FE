import classnames from "classnames";
import React, { useCallback, useMemo, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  Row,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableContainer from "../../../Components/Common/TableContainer";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../Contexts/auth/UseAuth";
import { useFetch } from "../../../Hooks/useCRUD";
import Loader from "../../../Components/Common/Loader";

const Account = () => {
  const { roles, authUser } = useAuthContext();
  const { data, isLoading } = useFetch(
    ["users", authUser.cinema_id],
    `/users${authUser.cinema_id ? `?cinema_id=${authUser.cinema_id}` : ""}`
  );

  const nav = useNavigate();
  const [activeTab, setActiveTab] = useState("1");
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState({});
  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setUser({});
    } else {
      setModal(true);
    }
  }, [modal]);

  const toggleTab = (tab, status) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const filteredData = useMemo(() => {
    if (activeTab === "1") {
      return data?.filter((user) => roles.includes(user.role)) || [];
    } else if (activeTab === "2") {
      return data?.filter((user) => user.role === "member") || [];
    }
    return data || [];
  }, [data, activeTab]);

  const columns = useMemo(
    () => [
      {
        header: "Họ và tên",
        accessorKey: "name",
        enableColumnFilter: false,
      },
      {
        header: "Hình ảnh",
        accessorKey: "avatar",
        enableColumnFilter: false,
        cell: (cell) => {
          return (
            <img
              style={{
                maxWidth: "150px",
              }}
              src={cell.row.original.avatar || "/images/defaultavatar.jpg"}
              alt={cell.row.original.title}
              className="avatar avatar-lg rounded-circle"
            />
          );
        },
      },
      {
        header: "Email",
        accessorKey: "email",
        enableColumnFilter: false,
      },
      {
        header: "Vai trò",
        accessorKey: "role",
        enableColumnFilter: false,
      },
      ...(activeTab === "1"
        ? [
            {
              header: "Cơ sở",
              accessorKey: "cinema_name",
              enableColumnFilter: false,
            },
          ]
        : []),
      {
        header: "Action",
        cell: (cell) => {
          return (
            <ul className="list-inline hstack gap-2 mb-0">
              {authUser.cinema_id
                ? cell.row.original.role === "staff" && (
                    <li className="list-inline-item">
                      <Button
                        color="primary"
                        className="btn-sm"
                        onClick={() => {
                          nav(`/admin/account/${cell.row.original.id}/edit`);
                        }}
                      >
                        <i className="ri-pencil-fill"></i>
                      </Button>
                    </li>
                  )
                : cell.row.original.role !== "admin" &&
                  cell.row.original.role !== "member" && (
                    <li className="list-inline-item">
                      <Button
                        color="primary"
                        className="btn-sm"
                        onClick={() => {
                          nav(`/admin/account/${cell.row.original.id}/edit`);
                        }}
                      >
                        <i className="ri-pencil-fill"></i>
                      </Button>
                    </li>
                  )}

              {cell.row.original.role === "member" && (
                <li className="list-inline-item">
                  <Button
                    color="primary"
                    className="btn-sm"
                    onClick={() => {
                      toggle();
                      setUser(cell.row.original);
                    }}
                  >
                    <i className="ri-eye-line"></i>
                  </Button>
                </li>
              )}
            </ul>
          );
        },
      },
    ],
    [activeTab]
  );

  document.title = "";
  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Danh sách tài khoản" pageTitle="Quản lý" />
        <Row>
          <Col lg={12}>
            <Card id="orderList">
              <CardHeader className="border-0">
                <Row className="align-items-center gy-3">
                  <div className="col-sm">
                    <h5 className="card-title mb-0">Danh sách tài khoản</h5>
                  </div>
                  <div className="col-sm-auto">
                    <div className="d-flex gap-1 flex-wrap">
                      <button
                        type="button"
                        className="btn btn-success add-btn"
                        id="create-btn"
                        onClick={() => {
                          nav("/admin/account/add");
                        }}
                      >
                        <i className="ri-add-line align-bottom me-1"></i>
                        Tạo tài khoản
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
                        Quản trị viên
                      </NavLink>
                    </NavItem>
                    {!authUser.cinema_id && (
                      <NavItem>
                        <NavLink
                          className={classnames(
                            { active: activeTab === "2" },
                            "fw-semibold"
                          )}
                          onClick={() => {
                            toggleTab("2", "Delivered");
                          }}
                          href="#"
                        >
                          Khách hàng
                        </NavLink>
                      </NavItem>
                    )}
                  </Nav>
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <TableContainer
                      columns={columns}
                      data={filteredData}
                      isGlobalFilter={true}
                      isAddUserList={false}
                      customPageSize={8}
                      divClass="table-responsive table-card mb-1"
                      tableClass="align-middle table-nowrap"
                      theadClass="table-light text-muted"
                      SearchPlaceholder="Tìm kiếm tài khoản..."
                    />
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal isOpen={modal} toggle={toggle} centered>
          <ModalHeader className="bg-light p-3" toggle={toggle}>
            Thông Tin Chi Tiết Tai Khoản
          </ModalHeader>
          <form>
            <ModalBody>
              <div className="mb-3 text-center">
                <img
                  src={user?.avatar || "/images/defaultavatar.jpg"}
                  alt="Avatar"
                  className="avatar avatar-sm rounded-circle"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Họ và tên</label>
                <input
                  disabled
                  type="text"
                  className="form-control"
                  value={user?.name || ""}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  disabled
                  type="text"
                  className="form-control"
                  value={user?.email || ""}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Số điện thoại</label>
                <input
                  disabled
                  type="text"
                  className="form-control"
                  value={user?.phone || ""}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Ngày sinh</label>
                <input
                  disabled
                  type="text"
                  className="form-control"
                  value={user?.birthday || ""}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Giới tính</label>
                <input
                  disabled
                  type="text"
                  className="form-control"
                  value={user?.gender || ""}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Địa chỉ</label>
                <textarea
                  disabled
                  className="form-control"
                  rows="3"
                  value={user?.address || ""}
                ></textarea>
              </div>
            </ModalBody>
            <div className="modal-footer">
              <Button type="button" color="light" onClick={toggle}>
                Đóng
              </Button>
            </div>
          </form>
        </Modal>
      </Container>
    </div>
  );
};

export default Account;
