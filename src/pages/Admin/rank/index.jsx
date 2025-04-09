import dayjs from "dayjs";
import { useFormik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
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
  Row,
} from "reactstrap";
import * as Yup from "yup";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { showConfirm } from "../../../Components/Common/showAlert";
import TableContainer from "../../../Components/Common/TableContainer";
import { useCRUD, useFetch } from "../../../Hooks/useCRUD";

const Rank = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { create, patch, delete: deleteRanks } = useCRUD(["ranks"]);
  const [modal, setModal] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const { data } = useFetch(["ranks"], "/ranks");
  const [rank, setRank] = useState({});
  const [ranks, setRanks] = useState([]);
  useEffect(() => {
    if (data?.data) {
      setRanks(data.data);
    }
  }, [data]);
  const toggleTab = (tab, status) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      // Thực hiện hành động với trạng thái "status" nếu cần.
      console.log(`Tab ${tab} với trạng thái: ${status}`);
    }
  };
  const rankSchema = Yup.object().shape({
    name: Yup.string().required("Tên hiển thị cấp bậc của thành viên"),
    total_spent: Yup.number()
      .required("Tổng số tiền VNĐ chi tiêu để đạt được cấp bậc đó")
      .min(1, "Tổng chi tiêu phải lớn hơn 0"),
    ticket_percentage: Yup.number()
      .required("Tỷ phần trăm(%) điểm tích lũy nhận được khi đặt vé")
      .min(0, "Không thể nhỏ hơn 0")
      .max(100, "Không thể lớn hơn 100"),
    combo_percentage: Yup.number()
      .required("Tỷ lệ phần trăm(%) điểm tích lũy nhận được khi đặt combo")
      .min(0, "Không thể nhỏ hơn 0")
      .max(100, "Không thể lớn hơn 100"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: (rank && rank?.name) || "",
      total_spent: (rank && rank?.total_spent) || 0,
      ticket_percentage: (rank && rank?.ticket_percentage) || "",
      combo_percentage: (rank && rank?.combo_percentage) || "",
    },
    validationSchema: rankSchema,
    onSubmit: (values, { resetForm }) => {
      if (isEdit) {
        // update chi nhánh
        try {
          patch.mutate({
            url: `/ranks/${rank.id}`,
            data: { ...values, is_default: rank.is_default },
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        // Thêm mới chi nhánh
        try {
          create.mutate({
            url: "/ranks",
            data: { ...values, is_default: false },
          });
        } catch (error) {
          console.log(error);
        }
      }
      resetForm();
      setModal(false);
    },
  });
  const handleDeleteRank = (rank) => {
    showConfirm(
      "Bạn có chắc muốn xóa cấp bậc này không? ",
      `Xóa cấp bậc ${rank.name}`,
      () => {
        deleteRanks.mutate(`/ranks/${rank.id}`);
        setRank({});
      }
    );
  };
  const toggle = () => setModal(!modal);
  // Column
  const columns = useMemo(() => [
    {
      header: "#",
      accessorKey: "id",
      enableColumnFilter: false,
      enableSorting: false,
    },
    {
      header: "Cấp bậc",
      accessorKey: "name",
      enableColumnFilter: false,
    },
    {
      header: "Tổng chi tiêu",
      accessorKey: "total_spent",
      enableColumnFilter: false,
    },
    {
      header: "% vé",
      accessorKey: "ticket_percentage",
      enableColumnFilter: false,
    },
    {
      header: "% combo",
      accessorKey: "combo_percentage",
      enableColumnFilter: false,
    },
    {
      header: "Ngày tạo",
      accessorKey: "created_at",
      enableColumnFilter: false,
      cell: (cell) => {
        return dayjs(cell.row.original.created_at).format("DD/MM/YYYY");
      },
    },
    {
      header: "Ngày cập nhật",
      accessorKey: "updated_at",
      enableColumnFilter: false,
      cell: (cell) => {
        return dayjs(cell.row.original.created_at).format("DD/MM/YYYY");
      },
    },
    {
      header: "Action",
      cell: (cell) => {
        return (
          <>
            <ul className="list-inline hstack gap-2 mb-0">
              <li className="list-inline-item">
                <Button
                  color="primary"
                  className="btn-sm "
                  onClick={() => {
                    setRank(cell.row.original);
                    toggle();
                    setIsEdit(true);
                  }}
                >
                  <i className="ri-pencil-fill"></i>
                </Button>
              </li>
              <li className="list-inline-item">
                <Button
                  color="primary"
                  className="btn-sm "
                  onClick={() => {
                    handleDeleteRank(cell.row.original);
                    setRank(cell.row.original);
                  }}
                >
                  <i className="ri-delete-bin-5-fill"></i>
                </Button>
              </li>
            </ul>
          </>
        );
      },
    },
  ]);

  document.title = "";
  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Quản lý cấp bậc thành viên" pageTitle="Danh sách" />
        <Row>
          <Col lg={12}>
            <Card id="orderList">
              <CardHeader className="border-0">
                <Row className="align-items-center gy-3">
                  <div className="col-sm">
                    <h5 className="card-title mb-0">
                      Quản lý danh sách cấp bậc thành viên
                    </h5>
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
                          setRank({});
                          formik.resetForm();
                        }}
                      >
                        <i className="ri-add-line align-bottom me-1"></i>
                        Thêm mới
                      </button>{" "}
                    </div>
                    <div className="col-sm-auto"></div>
                  </div>
                </Row>
              </CardHeader>
              <CardBody className="pt-0">
                <div className="mt-4">
                  <TableContainer
                    columns={columns}
                    data={ranks || []}
                    // isGlobalFilter={true}
                    isAddUserList={false}
                    customPageSize={8}
                    divClass="table-responsive table-card mb-1"
                    tableClass="align-middle table-nowrap"
                    theadClass="table-light text-muted"
                    SearchPlaceholder="Search Rank..."
                  />
                </div>
                <Modal isOpen={modal} toggle={toggle} centered>
                  <ModalHeader className="bg-light p-3" toggle={toggle}>
                    {isEdit ? "Sửa cấp bậc" : "Thêm cấp bậc"}
                  </ModalHeader>
                  <form onSubmit={formik.handleSubmit}>
                    <ModalBody>
                      {/* Tên cấp bậc */}
                      <div className="mb-3">
                        <label className="form-label">Tên cấp bậc</label>
                        <input
                          type="text"
                          className={`form-control ${
                            formik.touched.name && formik.errors.name
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="Nhập tên cấp bậc"
                          {...formik.getFieldProps("name")}
                        />
                        {formik.touched.name && formik.errors.name && (
                          <div className="invalid-feedback">
                            {formik.errors.name}
                          </div>
                        )}
                      </div>

                      {/* Tổng chi tiêu */}
                      <div className="mb-3">
                        <label className="form-label">Tổng chi tiêu</label>
                        <input
                          type="number"
                          disabled={rank.is_default}
                          className={`form-control ${
                            formik.touched.total_spent &&
                            formik.errors.total_spent
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="Nhập tổng chi tiêu"
                          {...formik.getFieldProps("total_spent")}
                        />
                        {formik.touched.total_spent &&
                          formik.errors.total_spent && (
                            <div className="invalid-feedback">
                              {formik.errors.total_spent}
                            </div>
                          )}
                      </div>

                      {/* Phần trăm vé */}
                      <div className="mb-3">
                        <label className="form-label">Phần trăm vé</label>
                        <input
                          type="number"
                          className={`form-control ${
                            formik.touched.ticket_percentage &&
                            formik.errors.ticket_percentage
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="Nhập phần trăm vé"
                          {...formik.getFieldProps("ticket_percentage")}
                        />
                        {formik.touched.ticket_percentage &&
                          formik.errors.ticket_percentage && (
                            <div className="invalid-feedback">
                              {formik.errors.ticket_percentage}
                            </div>
                          )}
                      </div>

                      {/* Phần trăm combo */}
                      <div className="mb-3">
                        <label className="form-label">Phần trăm combo</label>
                        <input
                          type="number"
                          className={`form-control ${
                            formik.touched.combo_percentage &&
                            formik.errors.combo_percentage
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="Nhập phần trăm combo"
                          {...formik.getFieldProps("combo_percentage")}
                        />
                        {formik.touched.combo_percentage &&
                          formik.errors.combo_percentage && (
                            <div className="invalid-feedback">
                              {formik.errors.combo_percentage}
                            </div>
                          )}
                      </div>
                    </ModalBody>

                    <div className="modal-footer">
                      <Button type="button" color="light" onClick={toggle}>
                        Đóng
                      </Button>
                      <Button type="submit" color="success">
                        {isEdit ? "Sửa" : "Thêm"}
                      </Button>
                    </div>
                  </form>
                </Modal>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Rank;
