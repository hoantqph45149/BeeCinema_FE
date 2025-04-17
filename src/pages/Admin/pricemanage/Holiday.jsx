import React, { useMemo, useState, useCallback } from "react";
import {
  Card,
  CardBody,
  Col,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import TableContainer from "../../../Components/Common/TableContainer";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useCRUD, useFetch } from "../../../Hooks/useCRUD";
import Loader from "../../../Components/Common/Loader";

document.title = "Quản lý ngày đặc biệt";

const Holiday = () => {
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState(null);

  const { data: dataSpecialDays, isLoading: isLoadingSpecialDays } = useFetch(
    ["special-days"],
    "/special-days"
  );
  const { create: createSpecialDay, patch: patchSpecialDay } = useCRUD([
    "special-days",
  ]);

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setIsEdit(false);
      setSelectedHoliday(null);
    } else {
      setModal(true);
    }
  }, [modal]);

  const validationSchema = Yup.object({
    special_date: Yup.date().required("Vui lòng chọn ngày đặc biệt"),
    name: Yup.string()
      .max(255, "Tên không được vượt quá 255 ký tự")
      .required("Vui lòng nhập tên ngày đặc biệt"),
    type: Yup.string()
      .max(255, "Loại không được vượt quá 255 ký tự")
      .required("Vui lòng nhập loại ngày đặc biệt"),
  });

  const typeOptions = [{ name: "holiday", description: "Ngày lễ" }];

  // Formik hook
  const formik = useFormik({
    initialValues: {
      special_date: selectedHoliday?.special_date
        ? new Date(selectedHoliday.special_date).toISOString().split("T")[0]
        : "",
      name: selectedHoliday?.name || "",
      type: selectedHoliday?.type || "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        if (isEdit) {
          patchSpecialDay.mutate(
            {
              url: `/special-days/${selectedHoliday.id}`,
              data: values,
            },
            {
              onSuccess: (data) => {
                formik.resetForm();
                toggle();
              },
            }
          );
        } else {
          createSpecialDay.mutate(
            { url: "/special-days", data: values },
            {
              onSuccess: (data) => {
                formik.resetForm();
                toggle();
              },
            }
          );
        }
        toggle();
      } catch (error) {
        console.error("Lỗi khi lưu ngày đặc biệt:", error);
      }
    },
  });

  const columnsHoliday = useMemo(
    () => [
      {
        header: "Ngày lễ",
        accessorKey: "special_date",
        enableColumnFilter: false,
        cell: (cell) =>
          new Date(cell.row.original.special_date).toLocaleDateString("vi-VN"),
      },
      {
        header: "Tên",
        accessorKey: "name",
        enableColumnFilter: false,
      },
      {
        header: "Loại",
        accessorKey: "type",
        enableColumnFilter: false,
      },
      {
        header: "Action",
        cell: (cell) => (
          <ul className="list-inline hstack gap-2 mb-0">
            <li className="list-inline-item">
              <Button
                color="primary"
                className="btn-sm"
                onClick={() => {
                  setIsEdit(true);
                  setSelectedHoliday(cell.row.original);
                  setModal(true);
                }}
              >
                <i className="ri-pencil-fill"></i>
              </Button>
            </li>
            <li className="list-inline-item">
              <Button
                color="danger"
                className="btn-sm"
                onClick={() => {
                  // Logic xóa
                }}
              >
                <i className="ri-delete-bin-5-fill"></i>
              </Button>
            </li>
          </ul>
        ),
      },
    ],
    []
  );

  return isLoadingSpecialDays ? (
    <div
      style={{ height: "90vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <Loader />
    </div>
  ) : (
    <Row>
      <Col lg={12}>
        <Card>
          <CardBody>
            <Button
              color="primary"
              className="mb-3"
              onClick={() => {
                setIsEdit(false);
                setModal(true);
              }}
            >
              Thêm ngày đặc biệt
            </Button>
            <TableContainer
              columns={columnsHoliday}
              data={dataSpecialDays || []} // Thay bằng dữ liệu thực từ API
              isGlobalFilter={true}
              isAddUserList={false}
              customPageSize={10}
              divClass="table-responsive mb-1"
              tableClass="mb-0 align-middle table-borderless"
              theadClass="table-light text-muted"
              SearchPlaceholder="Tìm kiếm ngày đặc biệt..."
            />
          </CardBody>
        </Card>
      </Col>
      <Modal isOpen={modal} toggle={toggle} centered>
        <ModalHeader className="bg-light p-3" toggle={toggle}>
          {isEdit ? "Sửa ngày đặc biệt" : "Thêm ngày đặc biệt"}
        </ModalHeader>
        <Form onSubmit={formik.handleSubmit}>
          <ModalBody>
            <FormGroup className="mb-3">
              <Label for="special_date">Ngày đặc biệt</Label>
              <Input
                type="date"
                name="special_date"
                id="special_date"
                invalid={
                  formik.touched.special_date && !!formik.errors.special_date
                }
                {...formik.getFieldProps("special_date")}
              />
              <FormFeedback>{formik.errors.special_date}</FormFeedback>
            </FormGroup>
            <FormGroup className="mb-3">
              <Label for="name">Tên</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Nhập tên ngày đặc biệt"
                invalid={formik.touched.name && !!formik.errors.name}
                {...formik.getFieldProps("name")}
              />
              <FormFeedback>{formik.errors.name}</FormFeedback>
            </FormGroup>
            <FormGroup className="mb-3">
              <Label for="type">Khung giờ</Label>
              <Input
                type="select"
                name="type"
                id="type"
                invalid={formik.touched.type && !!formik.errors.type}
                {...formik.getFieldProps("type")}
              >
                <option value="">---Chọn loại ngày---</option>
                {typeOptions?.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.description}
                  </option>
                ))}
              </Input>
              <FormFeedback>{formik.errors.type}</FormFeedback>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button type="button" color="light" onClick={toggle}>
              Đóng
            </Button>
            <Button
              type="submit"
              color="success"
              disabled={formik.isSubmitting}
            >
              {isEdit ? "Sửa" : "Thêm"}
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </Row>
  );
};

export default Holiday;
