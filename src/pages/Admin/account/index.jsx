import classnames from "classnames";
import React, { useMemo, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Modal,
  Nav,
  NavItem,
  NavLink,
  Row,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableContainer from "../../../Components/Common/TableContainer";

import { useCRUD, useFetch } from "../../../Hooks/useCRUD";
import { showConfirm } from "./../../../Components/Common/showAlert";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { data } = useFetch(["users"], "/users");
  const nav = useNavigate();
  const { delete: deleteUser } = useCRUD();
  const [modal, setModal] = useState(false);
  const [activeTab, setActiveTab] = useState("1");

  const toggleTab = (tab, status) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      // Thực hiện hành động với trạng thái "status" nếu cần.
      console.log(`Tab ${tab} với trạng thái: ${status}`);
    }
  };

  const handleDeleteUsers = (user) => {
    showConfirm(
      "Xóa Tài Khoản",
      `Bạn có chắc muốn xóa tài khoản ${user.name} không?`,
      () => {
        deleteUser.mutate(`/users/${user.id}`);
      }
    );
  };
  const toggle = () => setModal(!modal);
  // Column
  const filteredData = useMemo(() => {
    if (activeTab === "1") {
      return data?.filter((user) => user.role === "admin") || [];
    } else if (activeTab === "2") {
      return data?.filter((user) => user.role === "member") || [];
    }
    return data || [];
  }, [data, activeTab]);
  const columns = useMemo(() => [
    {
      header: "#",
      accessorKey: "id",
      enableColumnFilter: false,
      enableSorting: false,
    },
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
            src={cell.row.original.avatar}
            alt={cell.row.original.title}
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
    {
      header: "Cơ sở",
      accessorKey: "amount",
      enableColumnFilter: false,
    },
    {
      header: "Action",
      cell: (cell) => {
        return (
          <ul className="list-inline hstack gap-2 mb-0">
            {cell.row.original.role !== "admin" && (
              <li className="list-inline-item">
                <Button
                  color="primary"
                  className="btn-sm "
                  onClick={() => {
                    nav(`/admin/account/${cell.row.original.id}/edit`);
                  }}
                >
                  <i className="ri-pencil-fill"></i>
                </Button>
              </li>
            )}
            <li className="list-inline-item">
              <Button
                color="primary"
                className="btn-sm "
                onClick={() => {
                  handleDeleteUsers(cell.row.original);
                }}
              >
                <i className="ri-delete-bin-5-fill"></i>
              </Button>
            </li>
          </ul>
        );
      },
    },
  ]);

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
                  </Nav>
                  <TableContainer
                    columns={columns}
                    data={filteredData} // Sử dụng danh sách đã lọc
                    isGlobalFilter={true}
                    isAddUserList={false}
                    customPageSize={8}
                    divClass="table-responsive table-card mb-1"
                    tableClass="align-middle table-nowrap"
                    theadClass="table-light text-muted"
                    SearchPlaceholder="Tìm kiếm tài khoản..."
                  />
                </div>
                <Modal
                  id="showModal"
                  isOpen={modal}
                  toggle={toggle}
                  centered
                ></Modal>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Account;
