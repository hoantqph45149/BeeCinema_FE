import React, { useEffect, useMemo, useState } from "react";
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
import { useFormik } from "formik";
import * as Yup from "yup";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { showConfirm } from "../../../Components/Common/showAlert";
import TableContainer from "../../../Components/Common/TableContainer";
import { useCRUD, useFetch } from "../../../Hooks/useCRUD";
import useUploadImage from "../../../Hooks/useUploadImage";
import Loader from "../../../Components/Common/Loader";
import { formatVND } from "./../../../utils/Currency";
import { useAuthContext } from "../../../Contexts/auth/UseAuth";

const Food = () => {
  const { hasPermission } = useAuthContext();
  const { data, isLoading } = useFetch(["foods"], "/foods");
  const { create, patch, delete: deleteFood } = useCRUD(["foods"]);
  const { uploadImage, imageUrl, loading: imageLoading } = useUploadImage();
  const [foods, setFoods] = useState([]);
  const [food, setFood] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [modal, setModal] = useState(false);

  // Định nghĩa Schema để validate dữ liệu nhập vào
  const foodSchema = Yup.object().shape({
    name: Yup.string()
      .required("Tên đồ ăn không được để trống")
      .min(3, "Tên đồ ăn tối thiểu 3 ký tự"),
    type: Yup.string().required("Loại đồ ăn không được để trống"),
    price: Yup.number()
      .required("Giá đồ ăn không được để trống")
      .min(0, "Giá nhỏ nhất là 0"),
    description: Yup.string().required("Mô tả không được để trống"),
    img_thumbnail: isEdit
      ? Yup.mixed()
      : Yup.mixed()
          .required("Vui lòng chọn ảnh")
          .test(
            "fileFormat",
            "Chỉ chấp nhận file JPG, JPEG, PNG",
            (value) =>
              value &&
              ["image/jpg", "image/jpeg", "image/png"].includes(value.type)
          )
          .test(
            "fileSize",
            "Dung lượng ảnh không được quá 2MB",
            (value) => value && value.size <= 2 * 1024 * 1024
          ),
    is_active: Yup.boolean(),
  });

  useEffect(() => {
    if (data?.data) {
      setFoods(data.data);
    }
  }, [data]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: (food && food?.name) || "",
      type: (food && food?.type) || "",
      price: (food && food?.price) || "",
      description: (food && food?.description) || "",
      img_thumbnail: (food && food?.img_thumbnail) || "",
      is_active: (food && food?.is_active) || true, // Mặc định true cho thêm mới
    },
    validationSchema: foodSchema,
    onSubmit: (values, { resetForm }) => {
      if (isEdit && hasPermission("Sửa đồ ăn")) {
        // Cập nhật đồ ăn
        patch.mutate({
          url: `/foods/${food.id}`,
          data: {
            ...values,
            img_thumbnail: imageUrl || values.img_thumbnail, // Giữ ảnh cũ nếu không upload mới
          },
        });
      } else if (hasPermission("Thêm đồ ăn")) {
        // Thêm mới đồ ăn
        create.mutate({
          url: "/foods",
          data: {
            ...values,
            img_thumbnail: imageUrl,
          },
        });
      }
      resetForm();
      setFood({});
      setModal(false);
    },
  });

  const toggle = () => {
    if (modal) {
      setModal(false);
      setFood({});
    } else {
      setModal(true);
    }
  };

  const handleUpdateActive = (foodItem) => {
    if (hasPermission("Sửa đồ ăn")) {
      showConfirm(
        "Thay đổi trạng thái",
        "Bạn có chắc muốn thay đổi trạng thái không?",
        () => {
          patch.mutate({
            url: `/foods/${foodItem.id}`,
            data: {
              ...foodItem,
              is_active: foodItem.is_active ? 0 : 1,
            },
          });
        }
      );
    }
    setFood({});
  };

  const handleDeleteFood = (foodItem) => {
    if (hasPermission("Xóa đồ ăn")) {
      showConfirm(
        "Xóa Đồ Ăn",
        `Bạn có chắc muốn xóa ${foodItem.name} không?`,
        () => {
          deleteFood.mutate(`/foods/${foodItem.id}`);
        }
      );
    }
    setFood({});
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImage(file);
      formik.setFieldValue("img_thumbnail", file);
    }
  };

  // Cột của Table
  const columns = useMemo(
    () => [
      {
        header: "#",
        accessorKey: "id",
        enableColumnFilter: false,
      },
      {
        header: "Tên đồ ăn",
        accessorKey: "name",
        enableColumnFilter: false,
      },
      {
        header: "Loại đồ ăn",
        accessorKey: "type",
        enableColumnFilter: false,
      },
      {
        header: "Hình ảnh",
        accessorKey: "img_thumbnail",
        enableColumnFilter: false,
        cell: (cell) =>
          cell.row.original.img_thumbnail ? (
            <div className="avatar-sm bg-light rounded p-1">
              <img
                src={cell.row.original.img_thumbnail}
                alt=""
                className="img-fluid d-block"
              />
            </div>
          ) : (
            <span>Không có hình ảnh</span>
          ),
      },
      {
        header: "Giá",
        accessorKey: "price",
        enableColumnFilter: false,
        cell: (cell) => formatVND(Number(cell.row.original.price)),
      },
      {
        header: "Hoạt động",
        accessorKey: "is_active",
        enableColumnFilter: false,
        cell: (cell) => (
          <div className="form-check form-switch form-check-right">
            <Input
              disabled={!hasPermission("Sửa đồ ăn")}
              className="form-check-input"
              type="checkbox"
              role="switch"
              id={`is_active_${cell.row.original.id}`}
              defaultChecked={cell.row.original.is_active}
              onChange={() => handleUpdateActive(cell.row.original)}
            />
          </div>
        ),
      },
      {
        header: "Action",
        cell: (cell) => (
          <ul className="list-inline hstack gap-2 mb-0">
            {hasPermission("Sửa đồ ăn") && (
              <li className="list-inline-item">
                <Button
                  color="primary"
                  className="btn-sm"
                  onClick={() => {
                    setFood(cell.row.original);
                    toggle();
                    setIsEdit(true);
                  }}
                >
                  <i className="ri-pencil-fill"></i>
                </Button>
              </li>
            )}
            {hasPermission("Xóa đồ ăn") && (
              <li className="list-inline-item">
                <Button
                  color="primary"
                  className="btn-sm"
                  onClick={() => {
                    handleDeleteFood(cell.row.original);
                    setFood(cell.row.original);
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

  document.title = "Quản lý đồ ăn | Admin Dashboard";

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Quản lý đồ ăn" pageTitle="Quản lý" />
        <Row>
          <Col lg={12}>
            <Card id="foodList">
              <CardHeader className="border-0">
                <Row className="g-4 align-items-center">
                  <div className="col-sm">
                    <h5 className="card-title mb-0">Danh sách đồ ăn</h5>
                  </div>
                  <div className="col-sm-auto">
                    {hasPermission("Thêm đồ ăn") && (
                      <button
                        type="button"
                        className="btn btn-success add-btn"
                        id="create-btn"
                        onClick={() => {
                          setIsEdit(false);
                          toggle();
                        }}
                      >
                        <i className="ri-add-line align-bottom me-1"></i> Thêm
                        đồ ăn
                      </button>
                    )}
                  </div>
                </Row>
              </CardHeader>
              <div className="card-body pt-0">
                {isLoading ? (
                  <Loader />
                ) : hasPermission("Danh sách đồ ăn") ? (
                  <TableContainer
                    columns={columns}
                    data={foods || []}
                    isGlobalFilter={true}
                    isAddUserList={false}
                    customPageSize={8}
                    className="custom-header-css"
                    SearchPlaceholder="Tìm kiếm đồ ăn..."
                  />
                ) : (
                  <p>Bạn không có quyền xem danh sách đồ ăn.</p>
                )}
              </div>
            </Card>
          </Col>
        </Row>

        {(hasPermission("Thêm đồ ăn") || hasPermission("Sửa đồ ăn")) && (
          <Modal isOpen={modal} toggle={toggle} centered>
            <ModalHeader className="bg-light p-3" toggle={toggle}>
              {isEdit ? "Cập nhật đồ ăn" : "Thêm đồ ăn"}
            </ModalHeader>
            <Form onSubmit={formik.handleSubmit}>
              <ModalBody>
                <div className="mb-3">
                  <Label className="form-label" htmlFor="name">
                    Tên đồ ăn
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${
                      formik.touched.name && formik.errors.name
                        ? "is-invalid"
                        : ""
                    }`}
                    id="name"
                    placeholder="Nhập tên đồ ăn"
                    {...formik.getFieldProps("name")}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="text-danger">{formik.errors.name}</div>
                  )}
                </div>
                <div className="mb-3">
                  <Label htmlFor="type" className="form-label">
                    Loại đồ ăn
                  </Label>
                  <select
                    id="type"
                    className={`form-select ${
                      formik.touched.type && formik.errors.type
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("type")}
                  >
                    <option value="">--- Chọn loại đồ ăn ---</option>
                    <option value="Đồ Uống">Đồ Uống</option>
                    <option value="Đồ Ăn">Đồ Ăn</option>
                    <option value="Khác">Khác</option>
                  </select>
                  {formik.touched.type && formik.errors.type && (
                    <div className="text-danger">{formik.errors.type}</div>
                  )}
                </div>
                <div className="mb-3">
                  <Label className="form-label" htmlFor="price">
                    Giá
                  </Label>
                  <Input
                    type="number"
                    className={`form-control ${
                      formik.touched.price && formik.errors.price
                        ? "is-invalid"
                        : ""
                    }`}
                    id="price"
                    placeholder="Nhập giá đồ ăn"
                    {...formik.getFieldProps("price")}
                  />
                  {formik.touched.price && formik.errors.price && (
                    <div className="text-danger">{formik.errors.price}</div>
                  )}
                </div>
                <div className="mb-3">
                  <Label className="form-label" htmlFor="img_thumbnail">
                    Hình ảnh
                  </Label>
                  <Input
                    type="file"
                    className={`form-control ${
                      formik.touched.img_thumbnail &&
                      formik.errors.img_thumbnail
                        ? "is-invalid"
                        : ""
                    }`}
                    id="img_thumbnail"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={handleUpload}
                  />
                  {formik.touched.img_thumbnail &&
                    formik.errors.img_thumbnail && (
                      <div className="text-danger">
                        {formik.errors.img_thumbnail}
                      </div>
                    )}
                  {imageUrl && (
                    <div className="mt-2">
                      <img
                        src={imageUrl}
                        alt="Preview"
                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                      />
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <Label htmlFor="description" className="form-label">
                    Mô tả
                  </Label>
                  <textarea
                    id="description"
                    className={`form-control ${
                      formik.touched.description && formik.errors.description
                        ? "is-invalid"
                        : ""
                    }`}
                    placeholder="Nhập mô tả"
                    rows="3"
                    {...formik.getFieldProps("description")}
                  />
                  {formik.touched.description && formik.errors.description && (
                    <div className="text-danger">
                      {formik.errors.description}
                    </div>
                  )}
                </div>
                <div className="mb-3 form-check form-switch form-switch-primary">
                  <Label htmlFor="is_active" className="form-label">
                    Trạng thái
                  </Label>
                  <Input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="is_active"
                    {...formik.getFieldProps("is_active")}
                    checked={formik.values.is_active}
                  />
                </div>
              </ModalBody>
              <div className="modal-footer">
                <Button type="button" color="light" onClick={toggle}>
                  Đóng
                </Button>
                <Button
                  type="submit"
                  color="success"
                  disabled={imageLoading || formik.isSubmitting}
                >
                  {isEdit ? "Sửa" : "Thêm"}
                </Button>
              </div>
            </Form>
          </Modal>
        )}
      </Container>
    </div>
  );
};

export default Food;
