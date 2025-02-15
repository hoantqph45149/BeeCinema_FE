import React, { useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
  Form,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { useFormik } from "formik";
import * as Yup from "yup";
import { showAlert } from "../../../Components/Common/showAlert";
import useUploadImage from "../../../Hooks/useUploadImage";
import { useCRUD } from "../../../Hooks/useCRUD";
import { useNavigate } from "react-router-dom";

const AddSlideShow = () => {
  document.title = "Thêm SlideShow";
  const { create: createBanner } = useCRUD(["banners"]);
  const { uploadImage } = useUploadImage();
  const nav = useNavigate();
  const [images, setImages] = useState(["", "", ""]);
  const [files, setFiles] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      is_active: true,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Tiêu đề không được để trống"),
      description: Yup.string().required("Mô tả không được để trống"),
    }),
    onSubmit: async (values) => {
      if (files.length < 3) {
        showAlert("Thất Bại", "Vui lòng chọn ít nhất 3 ảnh", "error");
        return;
      }

      try {
        // Chờ tất cả ảnh upload và lấy danh sách URL
        const uploadedImages = await Promise.all(
          files.map(async (file) => {
            return await uploadImage(file); // Trả về URL của ảnh sau khi upload
          })
        );

        createBanner.mutate(
          {
            url: "/banners",
            data: {
              ...values,
              images: uploadedImages, // Lấy danh sách ảnh đúng
            },
          },
          {
            onSuccess: () => {
              nav("/admin/slide-show");
            },
          }
        );
      } catch (error) {
        showAlert("Thất Bại", "Lỗi khi tải ảnh lên", "error");
      }
    },
  });

  const handleAddImage = (event, index) => {
    const file = event.target.files?.[0];
    if (file) {
      setFiles((prevFiles) => [...prevFiles, file]);
      const newImages = [...images];
      newImages[index] = URL.createObjectURL(file);
      setImages(newImages);
    }
  };

  const handleRemoveImage = (index) => {
    setImages((images) => images.filter((_, i) => i !== index));
    setFiles((files) => files.filter((_, i) => i !== index));
  };

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Thêm Slide Show" pageTitle="Danh sách" />
        <Form onSubmit={formik.handleSubmit}>
          <Row>
            <Col lg={8}>
              <Card>
                <CardBody>
                  <div className="mb-3">
                    <Label htmlFor="name" className="form-label">
                      Tiêu đề
                    </Label>
                    <Input
                      id="name"
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
                  <div className="mb-3 d-flex align-items-center gap-3">
                    <h5 className="card-title mb-0">Chọn ảnh</h5>
                    <div>
                      <Button
                        color="primary"
                        onClick={() => setImages([...images, ""])}
                      >
                        Thêm ảnh
                      </Button>
                    </div>
                  </div>
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className="d-flex align-items-center mb-3 border p-2 rounded"
                    >
                      <img
                        src={img || ""}
                        alt={`banner-${index}`}
                        className="me-2"
                        style={{ width: "150px", height: "75px" }}
                      />
                      <Input
                        type="file"
                        className="form-control me-2"
                        onChange={(e) => handleAddImage(e, index)}
                      />
                      {images.length > 3 && (
                        <Button
                          color="danger"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <i className="ri-delete-bin-5-fill"></i>
                        </Button>
                      )}
                    </div>
                  ))}
                </CardBody>
              </Card>
            </Col>

            <Col lg={4}>
              <Card>
                <CardBody>
                  <div className="mb-3">
                    <div className="mt-4 mt-md-0">
                      <div>
                        <div className="form-check form-switch form-check-right mb-2">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="is_active"
                            name="is_active"
                            checked={formik.values.is_active}
                            {...formik.getFieldProps("is_active")}
                          />
                          <Label className="form-check-label" for="is_active">
                            Hoạt động:
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <Label htmlFor="description" className="form-label">
                      Mô tả
                    </Label>
                    <textarea
                      className={`form-control ${
                        formik.touched.description && formik.errors.description
                          ? "is-invalid"
                          : ""
                      }`}
                      id="description"
                      rows={5}
                      {...formik.getFieldProps("description")}
                    ></textarea>
                    {formik.touched.description && formik.errors.description ? (
                      <div className="invalid-feedback">
                        {formik.errors.description}
                      </div>
                    ) : null}
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <div className="mb-3">
            <Button type="submit" color="primary">
              Thêm mới
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default AddSlideShow;
