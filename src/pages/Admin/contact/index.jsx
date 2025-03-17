import classnames from "classnames";
import React, { useMemo, useState } from "react";
import {
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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCRUD, useFetch } from "../../../Hooks/useCRUD";
import { useEffect } from "react";

const ContactAdmin = () => {
  const [isEdit, setIsEdit] = useState(false);
  const {
    create,
    put,
    get: getRanks,
    patch,
    delete: deleteRanks,
  } = useCRUD(["contacts"]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [modal, setModal] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const { data } = useFetch(["contact"], "/contact");
  const [contact, setContact] = useState([]);
  const [contacts, setContacts] = useState([]);
  // console.log(data);
  useEffect(() => {
    if (data?.data) {
      setContacts(data.data);
    }
  }, [data]);

  const toggleTab = (tab, status) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      console.log(`Tab ${tab} với trạng thái: ${status}`);
    }
  };
  const handleStatusChange = (e, id) => {
    const newStatus = e.target.value;
    try {
      patch.mutate({
        url: `/contact/${id}`,
        data: { status: newStatus },
      });
      setContacts((prevContacts) =>
        prevContacts.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
      );
      if (selectedContact && selectedContact.id === id) {
        setSelectedContact((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggle = (contact = null) => {
    setSelectedContact(contact);
    setModal(!modal);
  };
  // Column
  const columns = useMemo(() => [
    {
      header: "#",
      accessorKey: "id",
      enableColumnFilter: false,
      enableSorting: false,
    },
    {
      header: "Thông tin liên hệ",
      accessorKey: "name",
      enableColumnFilter: false,
      cell: ({ row }) => {
        const contact = row.original;
        return (
          <div>
            <p>
              <strong>Tên:</strong> {contact.name}
            </p>
            <p>
              <strong>Email:</strong> {contact.email}
            </p>
            <p>
              <strong>SĐT:</strong> {contact.phone}
            </p>
          </div>
        );
      },
    },
    {
      header: "Tiêu đề",
      accessorKey: "message",
      enableColumnFilter: false,
    },
    {
      header: "Ngày tạo",
      accessorKey: "created_at",
      enableColumnFilter: false,
      cell: ({ getValue }) => {
        if (!getValue()) return "-";
        const date = new Date(getValue());
        const formattedDate = date.toLocaleDateString("vi-VN"); // Format ngày
        const formattedTime = date.toLocaleTimeString("vi-VN"); // Format giờ

        return (
          <div>
            {formattedDate} <br /> {formattedTime}
          </div>
        );
      },
    },
    {
      header: "Trạng thái",
      accessorKey: "status",
      enableColumnFilter: false,
      cell: ({ row }) => {
        const contact = row.original;
        return (
          <select
            value={contact.status}
            onChange={(e) => handleStatusChange(e, contact.id)}
            className="form-select"
          >
            <option value="Chưa xử lý">Chưa xử lý</option>
            <option value="Đã xử lý">Đã xử lý</option>
            <option value="Không xử lý">Không xử lý</option>
          </select>
        );
      },
    },
    {
      header: "Action",
      accessorKey: "paymentStatus",
      enableColumnFilter: false,
      cell: ({ row }) => {
        return (
          <button
            onClick={() => toggle(row.original)}
            className="btn btn-light btn-sm"
          >
            <i className="ri-eye-line"></i>
          </button>
        );
      },
    },
  ]);

  document.title = "";
  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Danh sách liên hệ" pageTitle="Quản lý" />
        <Row>
          <Col lg={12}>
            <Card id="orderList">
              <CardHeader className="border-0">
                <Row className="align-items-center gy-3">
                  <div className="col-sm">
                    <h5 className="card-title mb-0">
                      Danh sách tài khoản liên hệ
                    </h5>
                  </div>
                  <div className="col-sm-auto">
                    {/* <div className="d-flex gap-1 flex-wrap">
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
                            Tạo tài khoản
                          </button>{" "}
                        </div> */}
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
                      ></NavLink>
                    </NavItem>
                  </Nav>
                  <TableContainer
                    columns={columns}
                    data={contacts || []}
                    isGlobalFilter={true}
                    isAddUserList={false}
                    customPageSize={8}
                    divClass="table-responsive table-card mb-1"
                    tableClass="table align-middle table-bordered"
                    theadClass="table-light text-muted"
                    SearchPlaceholder="Search for order ID, customer, order status or something..."
                  />
                  <Modal
                    id="showModal"
                    isOpen={modal}
                    toggle={() => toggle(null)}
                    centered
                  >
                    <div className="modal-header">
                      <h5 className="modal-title">Chi tiết liên hệ</h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => toggle(null)}
                      ></button>
                    </div>
                    <div className="modal-body">
                      {selectedContact ? (
                        <>
                          <p>
                            <strong>ID:</strong> {selectedContact.id}
                          </p>
                          <p>
                            <strong>Tên:</strong> {selectedContact.name}
                          </p>
                          <p>
                            <strong>Email:</strong> {selectedContact.email}
                          </p>
                          <p>
                            <strong>SĐT:</strong> {selectedContact.phone}
                          </p>
                          <p>
                            <strong>Tiêu đề:</strong> {selectedContact.message}
                          </p>
                          {/* Hiển thị ngày và giờ rõ ràng */}
                          <p>
                            <strong>Ngày tạo:</strong>{" "}
                            {new Date(
                              selectedContact.created_at
                            ).toLocaleDateString("vi-VN")}
                          </p>
                          <p>
                            <strong>Giờ tạo:</strong>{" "}
                            {new Date(
                              selectedContact.created_at
                            ).toLocaleTimeString("vi-VN")}
                          </p>
                          <p>
                            <strong>Ngày cập nhât:</strong>{" "}
                            {new Date(
                              selectedContact.updated_at
                            ).toLocaleDateString("vi-VN")}
                          </p>
                          <p>
                            <strong>Giờ cập nhật:</strong>{" "}
                            {new Date(
                              selectedContact.updated_at
                            ).toLocaleTimeString("vi-VN")}
                          </p>
                          <p>
                            <strong>Trạng thái:</strong>
                            {selectedContact.status}
                          </p>
                        </>
                      ) : (
                        <p>Không có dữ liệu</p>
                      )}
                    </div>
                  </Modal>
                </div>
                <ToastContainer closeButton={false} limit={1} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactAdmin;
