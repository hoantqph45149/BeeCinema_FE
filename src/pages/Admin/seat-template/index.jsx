import classnames from "classnames";
import { useFormik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  Row,
} from "reactstrap";
import * as Yup from "yup";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableContainer from "../../../Components/Common/TableContainer";
import { useCRUD, useFetch } from "../../../Hooks/useCRUD";
import { showConfirm } from "../../../Components/Common/showAlert";
import { Link, useNavigate } from "react-router-dom";

const SeatTemplate = () => {
  const { data: matrixs } = useFetch(["matrixs"], "/getAll-matrix");
  const { data: dataSeatTemplates } = useFetch(
    ["seat-templates"],
    "/seat-templates"
  );

  const {
    create: createSeatTemplate,
    patch: patchSeatTemplate,
    delete: deleteSeatTemplate,
  } = useCRUD(["seat-templates"]);
  const nav = useNavigate();
  const [seatTemplates, setSeatTemplates] = useState([]);
  const [seatTemplate, setSeatTemplate] = useState({});
  const [seatTemplatePublish, setSeatTemplatePublish] = useState([]);
  const [seatTemplateUnPublish, setSeatTemplateUnPublish] = useState([]);
  const [matrix, setMatrix] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [modal, setModal] = useState(false);
  const [activeTab, setActiveTab] = useState("1");

  useEffect(() => {
    if (dataSeatTemplates?.data) {
      const filterseatTemplatePublish = dataSeatTemplates?.data.filter(
        (item) => item.is_publish == 1
      );
      const filterseatTemplateUnPublish = dataSeatTemplates?.data.filter(
        (item) => item.is_publish == 0
      );
      setSeatTemplatePublish(filterseatTemplatePublish);
      setSeatTemplateUnPublish(filterseatTemplateUnPublish);
      setSeatTemplates(dataSeatTemplates.data);
    }
  }, [dataSeatTemplates]);

  useEffect(() => {
    if (matrix) {
      formik.setValues({
        ...formik.values,
        row_regular: matrix.row_default.regular,
        row_vip: matrix.row_default.vip,
        row_double: matrix.row_default.double,
      });
    }
  }, [matrix]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: (seatTemplate && seatTemplate.name) || "",
      matrix_id: (seatTemplate && seatTemplate.matrix_id?.id) || "",
      row_regular: (seatTemplate && seatTemplate.row_regular) || 0,
      row_vip: (seatTemplate && seatTemplate.row_vip) || 0,
      row_double: (seatTemplate && seatTemplate.row_double) || 0,
      description: (seatTemplate && seatTemplate.description) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Vui lòng nhập tên mẫu ghế")
        .min(6, "Tên tối thiểu 6 ký tự"),
      matrix_id: Yup.string().required("Vui lòng chọn mẫu ghế"),
      row_regular: Yup.number().min(0, "Không thể nhỏ hơn 0"),
      row_vip: Yup.number().min(0, "Không thể nhỏ hơn 0"),
      row_double: Yup.number().min(0, "Không thể nhỏ hơn 0"),
      description: Yup.string().required("Vui lòng nhập mô tả"),
    }),
    validate: (values) => {
      let errors = {};
      const total = values.row_regular + values.row_vip + values.row_double;
      if (matrix && total > matrix.max_row) {
        errors.row_regular =
          "Tổng hàng ghế không được vượt quá " + matrix.max_row;
        errors.row_vip = "Tổng hàng ghế không được vượt quá " + matrix.max_row;
        errors.row_double =
          "Tổng hàng ghế không được vượt quá " + matrix.max_row;
      } else if (matrix && total < matrix.max_row) {
        errors.row_regular = "Tổng hàng ghế không được dưới " + matrix.max_row;
        errors.row_vip = "Tổng hàng ghế không được dưới " + matrix.max_row;
        errors.row_double = "Tổng hàng ghế không được dưới " + matrix.max_row;
      } else if (total === 0) {
        errors.row_regular = "Vui lòng nhập số hàng ghế";
        errors.row_vip = "Vui lòng nhập số hàng ghế";
        errors.row_double = "Vui lòng nhập số hàng ghế";
      }
      return errors;
    },
    onSubmit: (values) => {
      if (isEdit) {
        patchSeatTemplate.mutate(
          {
            url: `/seat-templates/${seatTemplate.id}`,
            data: values,
          },
          {
            onSuccess: (data) => {
              nav(`/admin/seat-template/${data.seatTemplate.id}/edit`);
            },
          }
        );
        setSeatTemplate({});
      } else {
        createSeatTemplate.mutate(
          {
            url: "/seat-templates",
            data: {
              ...values,
              is_publish: 0,
              is_active: 0,
            },
          },
          {
            onSuccess: (data) => {
              nav(`/admin/seat-template/${data.seatTemplate.id}/edit`);
            },
          }
        );
      }
      setModal(false);
      formik.resetForm();
    },
  });

  const handleChangeMatrix = (e) => {
    const selectedMatrix = matrixs.find(
      (item) => item.id.toString() === e.target.value
    );
    setMatrix(selectedMatrix);
  };

  const handleUpdateActive = (seatTemplate) => {
    showConfirm(
      "Thay đổi trạng thái",
      "Bạn có chắc muốn thay đổi trạng thái không",
      () => {
        patchSeatTemplate.mutate({
          url: `/seat-templates/${seatTemplate.id}`,
          data: {
            ...seatTemplate,
            is_active: seatTemplate.is_active === true ? 0 : 1,
          },
        });
      }
    );
    setSeatTemplate({});
  };

  const handleDeleteSeatTemplate = (seatTemplate) => {
    showConfirm(
      "Xóa Chi Nhánh",
      `Bạn có chắc muốn xóa chi nhánh ${seatTemplate.name} không?`,
      () => {
        deleteSeatTemplate.mutate(`/seat-templates/${seatTemplate?.id}`);
      }
    );
    setSeatTemplate({});
  };

  const toggleTab = (tab, type) => {
    if (activeTab !== tab) {
      setActiveTab(tab);

      let filteredSeatTemplates = dataSeatTemplates.data;
      if (type === "all") {
        setSeatTemplates(dataSeatTemplates.data);
      } else if (type === "publish") {
        filteredSeatTemplates = dataSeatTemplates.data.filter(
          (item) => item.is_publish == true
        );
        setSeatTemplates(filteredSeatTemplates);
      } else {
        filteredSeatTemplates = dataSeatTemplates.data.filter(
          (item) => item.is_publish == false
        );
        setSeatTemplates(filteredSeatTemplates);
      }
    }
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
      header: "Tên Mẫu",
      accessorKey: "name",
      enableColumnFilter: false,
      cell: (cell) => (
        <>
          <div className="flex-grow-1">
            <h5 className="fs-14 mb-1">{cell.getValue()}</h5>
            <Link
              to={`/admin/seat-template/${cell.row.original.id}/edit`}
              className="text-info mb-0"
            >
              Xem sơ đồ ghế
              <span className="fw-medium"> {cell.row.original.category}</span>
            </Link>
          </div>
        </>
      ),
    },
    {
      header: "Mô Tả",
      accessorKey: "description",
      enableColumnFilter: false,
    },
    {
      header: "Ma Trận Ghế",
      accessorKey: "matrix_id.name",
      enableColumnFilter: false,
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
                onChange={() => handleUpdateActive(cell.row.original)}
              />
            </div>
          </>
        );
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
                    toggle();
                    setIsEdit(true);
                    setSeatTemplate(cell.row.original);
                  }}
                >
                  <i className="ri-pencil-fill"></i>
                </Button>
              </li>
              <li className="list-inline-item">
                <Button
                  disabled={cell.row.original.is_publish}
                  color="primary"
                  className="btn-sm "
                  onClick={() => {
                    handleDeleteSeatTemplate(cell.row.original);
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
        <BreadCrumb title="Danh sách Mẫu Sơ Đồ Ghế" pageTitle="Quản lý" />
        <Row>
          <Col lg={12}>
            <Card id="orderList">
              <CardHeader className="border-0">
                <Row className="align-items-center gy-3">
                  <div className="col-sm">
                    <h5 className="card-title mb-0">Danh sách Mẫu Sơ Đồ Ghế</h5>
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
                        Tạo Mẫu Sơ Đồ Ghế
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
                        {dataSeatTemplates?.data.length > 0 && (
                          <span className="badge bg-success align-middle ms-1">
                            {dataSeatTemplates?.data.length}
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
                        {seatTemplatePublish.length > 0 && (
                          <span className="badge bg-success align-middle ms-1">
                            {seatTemplatePublish.length}
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
                          toggleTab("3", "draft");
                        }}
                        href="#"
                      >
                        Bản nháp
                        {seatTemplateUnPublish.length > 0 && (
                          <span className="badge bg-danger align-middle ms-1">
                            {seatTemplateUnPublish.length}
                          </span>
                        )}
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TableContainer
                    columns={columns}
                    data={seatTemplates}
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
                    {isEdit ? "Sửa Mẫu Sơ Đồ Ghế" : "Thêm Mẫu Sơ Đồ Ghế"}
                  </ModalHeader>
                  <form onSubmit={formik.handleSubmit}>
                    <ModalBody>
                      <div className="mb-3">
                        <Label className="form-label" htmlFor="name">
                          Tên Mẫu Sơ Đồ Ghế
                        </Label>
                        <Input
                          type="text"
                          className={`form-control ${
                            formik.touched.name && formik.errors.name
                              ? "is-invalid"
                              : ""
                          }`}
                          id="name"
                          placeholder="Nhập tên mẫu sơ đồ ghế"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          {...formik.getFieldProps("name")}
                        />
                        {formik.errors.name && (
                          <div className="invalid-feedback">
                            {formik.errors.name}
                          </div>
                        )}
                      </div>

                      <div className="mb-3">
                        <Label htmlFor="matrix_id" className="form-label">
                          Ma Trận Ghế
                        </Label>
                        <select
                          disabled={isEdit && seatTemplate?.is_publish == 1}
                          id="matrix_id"
                          className={`form-select mb-3 ${
                            formik.touched.matrix_id && formik.errors.matrix_id
                              ? "is-invalid"
                              : ""
                          }`}
                          onChange={(e) => {
                            handleChangeMatrix(e);
                            formik.setFieldValue("matrix_id", e.target.value);
                          }}
                          value={formik.values.matrix_id}
                        >
                          <option value="">Chọn ma trận</option>
                          {matrixs?.map((item) => (
                            <option key={item.id} value={item.id}>
                              {`${item.name} - ${item.description}`}
                            </option>
                          ))}
                        </select>
                        {formik.errors.matrix_id && (
                          <div className="invalid-feedback">
                            {formik.errors.matrix_id}
                          </div>
                        )}
                      </div>

                      <Row>
                        {["row_regular", "row_vip", "row_double"].map(
                          (type, index) => (
                            <Col lg={4} key={index}>
                              <div className="mb-3">
                                <Label className="form-label" htmlFor={type}>
                                  {type === "row_regular"
                                    ? "Hàng Ghế Thường"
                                    : type === "row_vip"
                                    ? "Hàng Ghế VIP"
                                    : "Hàng Ghế Đôi"}
                                </Label>
                                <Input
                                  disabled={
                                    isEdit && seatTemplate?.is_publish == 1
                                  }
                                  type="number"
                                  className={`form-control ${
                                    formik.errors[type] && "is-invalid"
                                  }`}
                                  id={type}
                                  min="0"
                                  value={formik.values[type]}
                                  onChange={formik.handleChange}
                                />
                                {formik.errors[type] && (
                                  <div className="invalid-feedback">
                                    {formik.errors[type]}
                                  </div>
                                )}
                              </div>
                            </Col>
                          )
                        )}
                      </Row>
                      <div className="mb-3">
                        <Label htmlFor="description" className="form-label">
                          Mô tả
                        </Label>
                        <textarea
                          id="description"
                          className={`form-control ${
                            formik.touched.description &&
                            formik.errors.description
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="Nhập mô tả"
                          rows="3"
                          value={formik.values.description}
                          onChange={formik.handleChange}
                          {...formik.getFieldProps("description")}
                        />
                        {formik.errors.description && (
                          <div className="invalid-feedback">
                            {formik.errors.description}
                          </div>
                        )}
                      </div>
                      <div className="modal-footer">
                        <Button type="button" color="light" onClick={toggle}>
                          Đóng
                        </Button>
                        <Button type="submit" color="success">
                          {isEdit ? "Sửa" : "Thêm "}
                        </Button>
                      </div>
                    </ModalBody>
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

export default SeatTemplate;
