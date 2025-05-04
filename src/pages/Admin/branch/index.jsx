import dayjs from "dayjs";
import { useFormik } from "formik";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  Col,
  Container,
  Input,
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
import Loader from "../../../Components/Common/Loader";
import { useAuthContext } from "../../../Contexts/auth/UseAuth";

const branchSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required("Tên chi nhánh không được để trống")
    .min(6, "Tên chi nhánh phải nhất 3 ký tự"),
});

const Branch = () => {
  const { hasPermission } = useAuthContext();
  const { data, isLoading } = useFetch(["branches"], "/branches");
  const { create, patch, delete: deleteBranch } = useCRUD(["branches"]);
  const [isEdit, setIsEdit] = useState(false);
  const [modal, setModal] = useState(false);
  const [branches, setBranches] = useState([]);
  const [branche, setBranche] = useState({});

  useEffect(() => {
    if (data?.data) {
      setBranches(data.data);
    }
  }, [data?.data]);

  // Formik để quản lý Form
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: (branche && branche?.name) || "",
    },
    validationSchema: branchSchema,
    onSubmit: (values) => {
      if (isEdit) {
        // update chi nhánh
        if (hasPermission("Sửa chi nhánh")) {
          patch.mutate({
            url: `/branches/${branche.id}`,
            data: values,
          });
        }
      } else {
        // Thêm mới chi nhánh
        if (hasPermission("Thêm chi nhánh")) {
          create.mutate({ url: "/branches", data: values });
        }
      }

      formik.resetForm();
      setModal(false);
    },
  });

  // Toggle Modal
  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setBranche({});
    } else {
      setModal(true);
    }
  }, [modal]);

  const handleUpdateActive = (branche) => {
    if (hasPermission("Sửa chi nhánh")) {
      showConfirm(
        "Thay đổi trạng thái",
        "Bạn có chắc muốn thay đổi trạng thái không",
        () => {
          patch.mutate({
            url: `/branches/${branche.id}`,
            data: {
              ...branche,
              is_active: branche.is_active == 1 ? 0 : 1,
            },
          });
        }
      );
    }
    setBranche({});
  };

  const handleDeleteBranche = (branche) => {
    if (hasPermission("Xóa chi nhánh")) {
      showConfirm(
        "Xóa Chi Nhánh",
        `Bạn có chắc muốn xóa chi nhánh ${branche.name} không?`,
        () => {
          deleteBranch.mutate(`/branches/${branche.id}`);
        }
      );
    }
    setBranche({});
  };

  // Cấu hình cột cho bảng
  const columns = useMemo(
    () => [
      {
        header: "Tên chi nhánh",
        accessorKey: "name",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Hoạt động",
        accessorKey: "is_active",
        enableColumnFilter: false,
        cell: (cell) => (
          <div className="form-check form-switch form-check-right">
            <Input
              disabled={!hasPermission("Sửa chi nhánh")}
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckRightDisabled"
              checked={cell.row.original.is_active == 1}
              defaultChecked={cell.row.original.is_active == 1}
              onChange={() => handleUpdateActive(cell.row.original)}
            />
          </div>
        ),
      },
      {
        header: "Ngày tạo",
        accessorKey: "created_at",
        enableColumnFilter: false,
        cell: (cell) =>
          dayjs(cell.row.original.created_at).format("DD/MM/YYYY"),
      },
      {
        header: "Ngày cập nhật",
        accessorKey: "updated_at",
        enableColumnFilter: false,
        cell: (cell) =>
          dayjs(cell.row.original.created_at).format("DD/MM/YYYY"),
      },
      {
        header: "Action",
        cell: (cell) => (
          <ul className="list-inline hstack gap-2 mb-0">
            {hasPermission("Sửa chi nhánh") && (
              <li className="list-inline-item">
                <Button
                  color="primary"
                  className="btn-sm"
                  onClick={() => {
                    toggle();
                    setIsEdit(true);
                    setBranche(cell.row.original);
                  }}
                >
                  <i className="ri-pencil-fill"></i>
                </Button>
              </li>
            )}
            {hasPermission("Xóa chi nhánh") && (
              <li className="list-inline-item">
                <Button
                  color="primary"
                  className="btn-sm"
                  onClick={() => {
                    handleDeleteBranche(cell.row.original);
                    setBranche(cell.row.original);
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

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Quản lý chi nhánh" pageTitle="Quản lý chi nhánh" />
        <Row>
          <Col>
            <Card>
              <CardHeader className="border-0">
                <Row className="align-items-center gy-3">
                  <div className="col-sm">
                    <h5 className="card-title mb-0">Danh sách chi nhánh</h5>
                  </div>
                  <div className="col-sm-auto">
                    <div className="d-flex gap-1 flex-wrap">
                      {hasPermission("Thêm chi nhánh") && (
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
                          Tạo chi nhánh
                        </button>
                      )}
                    </div>
                  </div>
                </Row>
              </CardHeader>
              <div className="card-body pt-0">
                {isLoading ? (
                  <Loader />
                ) : hasPermission("Danh sách chi nhánh") ? (
                  <TableContainer
                    columns={columns}
                    data={branches}
                    isGlobalFilter={true}
                    isAddUserList={false}
                    customPageSize={10}
                    divClass="table-responsive mb-1"
                    tableClass="mb-0 align-middle table-borderless"
                    theadClass="table-light text-muted"
                    SearchPlaceholder="Search Products..."
                  />
                ) : (
                  <p>Bạn không có quyền xem danh sách chi nhánh.</p>
                )}
              </div>
            </Card>
          </Col>
        </Row>

        {/* Modal chỉnh sửa chi nhánh */}
        {(hasPermission("Thêm chi nhánh") ||
          hasPermission("Sửa chi nhánh")) && (
          <Modal isOpen={modal} toggle={toggle} centered>
            <ModalHeader className="bg-light p-3" toggle={toggle}>
              {isEdit ? "Sửa chi nhánh" : "Thêm chi nhánh"}
            </ModalHeader>
            <form onSubmit={formik.handleSubmit}>
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
                    value={formik?.values?.name}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="invalid-feedback">{formik.errors.name}</div>
                  )}
                </div>
              </ModalBody>
              <div className="modal-footer">
                <Button type="button" color="light" onClick={toggle}>
                  Đóng
                </Button>
                <Button
                  disabled={create.isLoading || patch.isLoading}
                  type="submit"
                  color="success"
                >
                  {isEdit ? "Sửa" : "Thêm"}
                </Button>
              </div>
            </form>
          </Modal>
        )}
      </Container>
    </div>
  );
};

export default Branch;
