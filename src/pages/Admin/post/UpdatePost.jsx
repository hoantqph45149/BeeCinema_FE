import { useFormik } from "formik";
import "quill/dist/quill.snow.css";
import { useEffect } from "react";
import { useQuill } from "react-quilljs";
import { useNavigate, useParams } from "react-router-dom";
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
import * as Yup from "yup";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { useCRUD, useFetch } from "../../../Hooks/useCRUD";
import useUploadImage from "../../../Hooks/useUploadImage";

const UpdatePost = () => {
  document.title =
    "Thông tin bài viết | Velzon - React Admin & Dashboard Template";

  const { id } = useParams();
  const nav = useNavigate();
  const { data: post } = useFetch(["posts", id], `/posts/${id}`);
  const { patch: patchPost } = useCRUD(["post", id]);
  const { uploadImage, loading: loadingImage } = useUploadImage();

  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: [
        ["bold", "italic", "underline", "strike"],
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

  // Validation schema cho Formik
  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Tiêu đề không được để trống")
      .min(5, "Tiêu đề tối thiểu 5 ký tự")
      .max(255, "Tiêu đề tối đa 255 ký tự"),
    description: Yup.string().required("Mô tả là bắt buộc"),
    content: Yup.string()
      .required("Nội dung không được để trống")
      .min(10, "Nội dung phải có ít nhất 10 ký tự"),
    img_post: Yup.mixed().required("Vui lòng chọn ảnh"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      content: "",
      img_post: "",
      is_active: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      let image = post.img_post;
      if (values.img_post !== post.img_post) {
        image = await uploadImage(values.img_post);
      }

      patchPost.mutate({
        url: `/posts/${id}`,
        data: {
          ...values,

          img_post: image,
        },
      });
      nav("/admin/post");
    },
  });

  // Đồng bộ dữ liệu bài viết khi API trả về dữ liệu
  useEffect(() => {
    if (post) {
      formik.setValues({
        title: post.title || "",
        description: post.description || "",
        content: post.content || "",
        img_post: post.img_post || "",
        is_active: post.is_active || false,
      });

      if (quill) {
        quill.clipboard.dangerouslyPasteHTML(post.content || "");
      }
    }
  }, [post, quill]);

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Thông tin bài viết" pageTitle="Danh sách" />
        <Row>
          <Col lg={8}>
            <Form onSubmit={formik.handleSubmit}>
              <Card>
                <CardBody>
                  <Row>
                    <Col lg={6} md={12}>
                      <div className="mb-3">
                        <Label htmlFor="title">Tiêu đề</Label>
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
                          value={formik.values.title}
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
                    <Label htmlFor="description">Mô tả ngắn</Label>
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
                      value={formik.values.description}
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
                    <Label>Nội dung</Label>
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
                <Button
                  disabled={patchPost.isLoading || loadingImage}
                  color="primary"
                  type="submit"
                  className="btn w-sm"
                >
                  Submit
                </Button>
              </div>
            </Form>
          </Col>

          <Col lg={4}>
            <Card>
              <CardBody>
                <div>
                  <Label htmlFor="img_post">Ảnh đại diện</Label>
                  <Input
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
                  <div className="mt-3">
                    <img
                      style={{ maxWidth: "200px", height: "100%" }}
                      src={post?.img_post}
                      alt={`image-${post?.title}`}
                    />
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <div className="form-check form-switch">
                  <Input
                    type="checkbox"
                    id="is_active"
                    checked={formik.values.is_active}
                    onChange={(e) =>
                      formik.setFieldValue("is_active", e.target.checked)
                    }
                  />
                  <Label htmlFor="is_active">Trạng thái</Label>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UpdatePost;
