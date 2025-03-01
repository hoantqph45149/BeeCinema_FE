import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  Label,
  Row,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useCRUD, useFetch } from "../../../Hooks/useCRUD";
import useUploadImage from "../../../Hooks/useUploadImage";

document.title =
  "Thông tin bài viết | Velzon - React Admin & Dashboard Template";

const AddPost = () => {
  const nav = useNavigate();

  const { data: posts } = useFetch(["posts"], "/posts");
  const { create: createPost } = useCRUD(["posts"]);
  const [selectedMulti, setselectedMulti] = useState(null);
  const [action, setAction] = useState(null);
  const { uploadImage } = useUploadImage();

  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: [
        [
          { bold: true },
          { italic: true },
          { underline: true },
          { strike: true },
        ],
        [{ align: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, false] }],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        [{ link: true }, { image: true }, { video: true }],
        ["clean"],
      ],
    },
  });
  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        const html = quill.root.innerHTML.trim(); // Lấy nội dung HTML
        formik.setFieldValue("content", html);
      });
    }
  }, [quill]);

  const formik = useFormik({
    initialValues: {
      title: "",

      description: "",
      content: "",
      img_post: "",
      is_active: true,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Tiêu đề không được để trống"),
      description: Yup.string().required("Mô tả là bắt buộc"),
      content: Yup.string()
        .trim()
        .required("Nội dung không được để trống")
        .min(10, "Nội dung phải có ít nhất 10 ký tự"),
      img_post: Yup.mixed()
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
    }),
    onSubmit: async (values) => {
      try {
        const imageUrl = await uploadImage(values.img_post);

        console.log({ ...values, img_post: imageUrl });

        createPost.mutate(
          { url: "/posts", data: { ...values, img_post: imageUrl } },
          {
            onSuccess: () => {
              nav("/admin/post");
            },
          }
        );
      } catch (error) {
        console.error("Lỗi khi upload ảnh:", error);
      }
    },
  });

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title={"Thông tin bài viết"} pageTitle="Danh sách" />
        <Row>
          <Col lg={8}>
            <Form onSubmit={formik.handleSubmit}>
              <Card>
                <CardBody>
                  <Row>
                    <Col lg={6} md={12}>
                      <div className="mb-3">
                        <Label className="form-label" htmlFor="title">
                          Tiêu đề
                        </Label>
                        <Input
                          type="text"
                          id="title"
                          name="title"
                          className={`form-control ${
                            formik.touched.title && formik.errors.title
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="Nhập tiêu đề"
                          value={formik.values.title || ""}
                          onChange={formik.handleChange}
                        />

                        {formik.touched.title && formik.errors.title && (
                          <div className="text-danger">
                            {formik.errors.title}
                          </div>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="description">
                      Mô tả ngắn
                    </Label>
                    <Input
                      type="text"
                      id="description"
                      name="description"
                      className={`form-control ${
                        formik.touched.description && formik.errors.description
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Nhập mô tả"
                      value={formik.values.description || ""}
                      onChange={formik.handleChange}
                    />

                    {formik.touched.description &&
                      formik.errors.description && (
                        <div className="text-danger">
                          {formik.errors.description}
                        </div>
                      )}
                  </div>
                  <div className="mb-3">
                    <Label className="form-label">Nội dung</Label>
                    <Row className="mt-2">
                      <Col lg={12}>
                        <Card>
                          <CardBody>
                            <div style={{ height: 300 }}>
                              <div ref={quillRef} />
                            </div>
                          </CardBody>
                        </Card>
                        {formik.touched.content && formik.errors.content && (
                          <div className="text-danger mt-1">
                            {formik.errors.content}
                          </div>
                        )}
                      </Col>
                    </Row>
                  </div>
                </CardBody>
              </Card>
              <div className="text-end mb-3">
                <Button color="primary" type="submit" className="btn w-sm">
                  Submit
                </Button>
              </div>
            </Form>
          </Col>

          <Col lg={4}>
            <Card>
              <CardBody>
                <div>
                  <Label htmlFor="image" className="form-label">
                    Ảnh đại diện
                  </Label>
                  <Input
                    className="form-control"
                    type="file"
                    id="img_post"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={(event) => {
                      formik.setFieldValue(
                        "img_post",
                        event.currentTarget.files[0] || ""
                      );
                    }}
                  />
                  {formik.touched.img_post && formik.errors.img_post && (
                    <div className="text-danger">{formik.errors.img_post}</div>
                  )}
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <div className="mb-3 form-check form-switch form-switch-secondary">
                  <Input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="is_active"
                    name="is_active"
                    checked={formik.values.is_active ?? true}
                    onChange={formik.handleChange}
                  />

                  <Label className="form-label" for="is_active">
                    Trạng thái
                  </Label>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddPost;
