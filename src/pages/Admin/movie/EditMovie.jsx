import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Input,
  Label,
  Row,
} from "reactstrap";

import Select from "react-select";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import useUploadImage from "../../../Hooks/useUploadImage";
import { useCRUD, useFetch } from "../../../Hooks/useCRUD";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";

const EditMovie = () => {
  const { id } = useParams();
  const { data } = useFetch(["movie"], `/movies/${id}`);
  const nav = useNavigate();
  const { patch: patchMovie } = useCRUD(["movie"]);
  const [movie, setMovie] = useState({});
  const [selectedMulti, setselectedMulti] = useState(null);
  const [action, setAction] = useState(null);
  const { uploadImage, loading: loadingImage } = useUploadImage();
  useEffect(() => {
    if (data) {
      setMovie(data.movie);
      setselectedMulti(
        data.movie.movie_versions.map((item) => ({
          value: item.name,
          label: item.name,
        }))
      );
    }
  }, [data]);
  const SingleOptions = [
    { value: "Phụ Đề", label: "Phụ Đề" },
    { value: "Lồng Tiếng", label: "Lồng Tiếng" },
    { value: "Thuyết Minh", label: "Thuyết Minh" },
  ];

  const handleMulti = (selectedMulti) => {
    setselectedMulti(selectedMulti);
  };

  // Formik initial values
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: (movie && movie?.name) || "",
      director: (movie && movie?.director) || "",
      cast: (movie && movie?.cast) || "",
      release_date:
        (movie.is_publish
          ? movie && movie?.release_date
          : new Date().toISOString().split("T")[0]) || "", // Mặc định là chuỗi rỗng
      end_date: (movie && movie?.end_date) || "",
      duration: (movie && movie?.duration) || "",
      category: (movie && movie?.category) || "",
      rating: (movie && movie?.rating) || "T13",
      versions:
        (selectedMulti && selectedMulti.map((item) => item.value)) || [],
      description: (movie && movie?.description) || "",
      surcharge: (movie && movie?.surcharge) || 0,
      surcharge_desc: (movie && movie?.surcharge_desc) || "",
      is_active: (movie && movie?.is_active) || true,
      is_special: (movie && movie?.is_special) || true,
      is_hot: (movie && movie?.is_hot) || true,
      img_thumbnail: (movie && movie?.img_thumbnail) || "",
      trailer_url: (movie && movie?.trailer_url) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Tên phim không được để trống")
        .max(255, "Tên phim không được vượt quá 255 ký tự"),
      director: Yup.string().required("Đạo diễn không được để trống"),
      cast: Yup.string().required("Diễn viên không được để trống"),
      release_date: Yup.date().required("Ngày khởi chiếu không được để trống"),
      end_date: Yup.date()
        .required("Ngày kết thúc không được để trống")
        .when("release_date", (release_date, schema) => {
          return (
            release_date &&
            schema.min(release_date, "Ngày kết thúc phải sau ngày khởi chiếu")
          );
        }),
      duration: Yup.number()
        .required("Thời lượng không được để trống")
        .positive("Thời lượng phải là số dương")
        .integer("Thời lượng phải là số nguyên"),
      category: Yup.string().required("Danh mục không được để trống"),
      rating: Yup.string().required("Danh mục không được để trống"),
      versions: Yup.array()
        .min(1, "Chọn ít nhất một phiên bản")
        .required("Phiên bản không được để trống"),
      description: Yup.string().required("Mô tả không được để trống"),

      img_thumbnail: Yup.mixed(),
      trailer_url: Yup.string().required("URL trailer không được để trống"),
    }),
    onSubmit: async (values) => {
      try {
        let image = movie.img_thumbnail;
        const movieVersion = selectedMulti.map((item) => item.value);

        if (movie.img_thumbnail !== values.img_thumbnail) {
          image = await uploadImage(values.img_thumbnail);
        }

        const movieData = {
          ...values,
          img_thumbnail: image,
          versions: movieVersion,
          ...(action === "publish" && { action: "publish" }),
        };

        patchMovie.mutate(
          { url: `/movies/${id}`, data: movieData },
          {
            onSuccess: (data) => {
              formik.resetForm();
              if (data?.movie) {
                setMovie(data.movie);
              }
            },
          }
        );
      } catch (error) {
        console.error("Lỗi khi upload ảnh:", error);
      }
    },
  });

  document.title = "Sửa Phim";
  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Quản lý phim" pageTitle="Quản lý" />
        <Form onSubmit={formik.handleSubmit}>
          <Row>
            <Col xl={8} lg={7}>
              <div>
                <Card>
                  <CardHeader>
                    <Row className="align-items-center">
                      <Col>
                        <h5 className="card-title mb-0">Thêm Mới Phim</h5>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col lg={12}>
                        <div className="mb-3">
                          <Label htmlFor="name" className="form-label">
                            Tên phim
                          </Label>
                          <Input
                            type="text"
                            id="name"
                            className={`form-control ${
                              formik.errors.name ? "is-invalid" : ""
                            }`}
                            placeholder="Nhập tên phim"
                            {...formik.getFieldProps("name")}
                          />
                          {formik.touched.name && formik.errors.name && (
                            <div className="text-danger">
                              {formik.errors.name}
                            </div>
                          )}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={4}>
                        <div className="mb-3">
                          <Label htmlFor="director" className="form-label">
                            Đạo diễn
                          </Label>
                          <Input
                            type="text"
                            id="director"
                            className={`form-control ${
                              formik.errors.director ? "is-invalid" : ""
                            }`}
                            placeholder="Nhập đạo diễn"
                            {...formik.getFieldProps("director")}
                          />
                          {formik.touched.director &&
                            formik.errors.director && (
                              <div className="text-danger">
                                {formik.errors.director}
                              </div>
                            )}
                        </div>
                      </Col>
                      <Col lg={8}>
                        <div className="mb-3">
                          <Label htmlFor="cast" className="form-label">
                            Diễn viên
                          </Label>
                          <Input
                            type="text"
                            id="cast"
                            className={`form-control ${
                              formik.errors.cast ? "is-invalid" : ""
                            }`}
                            placeholder="Nhập diễn viên"
                            {...formik.getFieldProps("cast")}
                          />
                          {formik.touched.cast && formik.errors.cast && (
                            <div className="text-danger">
                              {formik.errors.cast}
                            </div>
                          )}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={4}>
                        <div className="mb-3">
                          <Label htmlFor="release_date" className="form-label">
                            Ngày khởi chiếu
                          </Label>
                          <Input
                            disabled={movie.is_publish}
                            type="date"
                            className={`form-control ${
                              formik.errors.release_date ? "is-invalid" : ""
                            }`}
                            id="release_date"
                            {...formik.getFieldProps("release_date")}
                          />
                          {formik.touched.release_date &&
                            formik.errors.release_date && (
                              <div className="text-danger">
                                {formik.errors.release_date}
                              </div>
                            )}
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="mb-3">
                          <Label htmlFor="end_date" className="form-label">
                            Ngày kết thúc
                          </Label>
                          <Input
                            disabled={movie.is_publish}
                            type="date"
                            className={`form-control ${
                              formik.errors.end_date ? "is-invalid" : ""
                            }`}
                            id="end_date"
                            {...formik.getFieldProps("end_date")}
                          />
                          {formik.touched.end_date &&
                            formik.errors.end_date && (
                              <div className="text-danger">
                                {formik.errors.end_date}
                              </div>
                            )}
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="mb-3">
                          <Label htmlFor="duration" className="form-label">
                            Thời lượng{" "}
                          </Label>
                          <Input
                            disabled={movie.is_publish}
                            type="text"
                            className={`form-control ${
                              formik.errors.duration ? "is-invalid" : ""
                            }`}
                            placeholder="Nhập thời lượng phim"
                            id="duration"
                            {...formik.getFieldProps("duration")}
                          />
                          {formik.touched.duration &&
                            formik.errors.duration && (
                              <div className="text-danger">
                                {formik.errors.duration}
                              </div>
                            )}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12} lg={4}>
                        <div className="mb-3">
                          <Label htmlFor="category" className="form-label">
                            Thể loại
                          </Label>
                          <Input
                            type="text"
                            className={`form-control ${
                              formik.errors.category ? "is-invalid" : ""
                            }`}
                            placeholder="Nhập thể loại phim "
                            id="category"
                            {...formik.getFieldProps("category")}
                          />
                          {formik.touched.category &&
                            formik.errors.category && (
                              <div className="text-danger">
                                {formik.errors.category}
                              </div>
                            )}
                        </div>
                      </Col>
                      <Col md={12} lg={8}>
                        <div className="mb-3">
                          <Label htmlFor="rating" className="form-label">
                            Giới hạn độ tuổi{" "}
                          </Label>
                          <select
                            id="rating"
                            className={`form-select mb-3 ${
                              formik.errors.rating ? "is-invalid" : ""
                            }`}
                            aria-label="Default select example"
                            {...formik.getFieldProps("rating")}
                          >
                            <option value="T13">13 tuổi trở lên</option>
                            <option value="T16">16 tuổi trở lên</option>
                            <option value="T18">18 tuổi trở lên</option>
                            <option value="P">
                              Phim được phổ biến đến mọi người
                            </option>
                            <option value="K">
                              Phim được phổ biến đến người dưới 13T, có người
                              bảo hộ
                            </option>
                          </select>
                          {formik.touched.rating && formik.errors.rating && (
                            <div className="text-danger">
                              {formik.errors.rating}
                            </div>
                          )}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12}>
                        <div className="mb-3">
                          <Label htmlFor="versions" className="form-label">
                            Phiên bản
                          </Label>
                          <Select
                            isDisabled={movie.is_publish}
                            name="versions"
                            id="versions"
                            styles={{
                              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                            }}
                            value={selectedMulti}
                            isMulti
                            onChange={(selected) => {
                              handleMulti(selected);
                              formik.setFieldValue("versions", selected);
                            }}
                            options={SingleOptions}
                          />
                          {formik.touched.versions &&
                            formik.errors.versions && (
                              <div className="text-danger">
                                {formik.errors.versions}
                              </div>
                            )}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12}>
                        <div>
                          <Label htmlFor="description" className="form-label">
                            Mô tả
                          </Label>
                          <textarea
                            className={`form-control ${
                              formik.errors.description ? "is-invalid" : ""
                            }`}
                            id="description"
                            rows="5"
                            {...formik.getFieldProps("description")}
                          ></textarea>
                          {formik.touched.description &&
                            formik.errors.description && (
                              <div className="text-danger">
                                {formik.errors.description}
                              </div>
                            )}
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </div>
              <Card>
                <CardHeader>
                  <div className="d-flex mb-3">
                    <div className="flex-grow-1">
                      <h5 className="fs-16">Phụ thu</h5>
                    </div>
                  </div>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col lg={12}>
                      <div className="mb-3">
                        <Label htmlFor="surcharge" className="form-label">
                          Gía Phụ thu
                        </Label>
                        <Input
                          id="surcharge"
                          type="text"
                          className="form-control"
                          placeholder="Nhập giá phụ thu"
                          {...formik.getFieldProps("surcharge")}
                        />
                      </div>
                    </Col>
                    <Col lg={12}>
                      <div>
                        <Label htmlFor="surcharge_desc" className="form-label">
                          Mô tả phụ thu
                        </Label>
                        <textarea
                          className="form-control"
                          id="surcharge_desc"
                          rows="3"
                          {...formik.getFieldProps("surcharge_desc")}
                        ></textarea>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>

            <Col xl={4} lg={5}>
              <Card>
                <CardHeader>
                  <h5 className="fs-16">Thêm mới </h5>
                  <span className="btn btn-primary btn-sm me-2">
                    {movie.is_publish ? "Đã xuất bản" : "Chưa xuất bản"}
                  </span>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col lg={6}>
                      <div className="mt-4 mt-md-0">
                        <div>
                          <div className="form-check form-switch form-check-right mb-2">
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              role="switch"
                              id="is_active"
                              defaultChecked
                              {...formik.getFieldProps("is_active")}
                            />
                            <Label className="form-check-label" for="is_active">
                              Hoạt động:
                            </Label>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mt-4 mt-md-0">
                        <div>
                          <div className="form-check form-switch form-check-right mb-2">
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              role="switch"
                              id="is_hot"
                              defaultChecked
                              {...formik.getFieldProps("is_hot")}
                            />
                            <Label className="form-check-label" for="is_hot">
                              Hot:
                            </Label>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <div className="card-body border-bottom border-light get-end d-flex justify-content-end gap-2">
                      {movie.is_publish ? (
                        <Button
                          onClick={() => nav("/admin/movie")}
                          type="button"
                          color="primary"
                          className="mr-3"
                        >
                          Danh sách phim
                        </Button>
                      ) : (
                        <Button
                          disabled={patchMovie.isLoading || loadingImage}
                          type="submit"
                          color="primary"
                          className="mr-3"
                        >
                          Lưu nháp
                        </Button>
                      )}
                      <Button
                        onClick={() =>
                          movie.is_publish
                            ? setAction("")
                            : setAction("publish")
                        }
                        type="submit"
                        color="primary"
                        disabled={patchMovie.isLoading || loadingImage}
                      >
                        {movie.is_publish ? "Câp nhật" : "Xuất bản"}
                      </Button>
                    </div>
                  </Row>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <div className="accordion accordion-flush">
                    <div className="card-body">
                      <div>
                        <Label htmlFor="img_thumbnail" className="form-label">
                          Hình ảnh:
                        </Label>
                        <Input
                          className="form-control"
                          type="file"
                          id="img_thumbnail"
                          accept="image/png, image/jpeg, image/jpg"
                          onChange={(event) => {
                            formik.setFieldValue(
                              "img_thumbnail",
                              event.currentTarget.files[0]
                            );
                          }}
                        />
                        {formik.touched.img_thumbnail &&
                          formik.errors.img_thumbnail && (
                            <div className="text-danger">
                              {formik.errors.img_thumbnail}
                            </div>
                          )}
                      </div>
                      <div className="mt-3">
                        <img
                          src={movie.img_thumbnail}
                          alt=""
                          style={{ maxWidth: "250px" }}
                        />
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <div className="accordion accordion-flush">
                    <div className="card-body">
                      <Label htmlFor="trailer_url" className="form-label">
                        Code Youtube
                      </Label>
                      <Input
                        id="trailer_url"
                        type="text"
                        className={`form-control ${
                          formik.errors.trailer_url ? "is-invalid" : ""
                        }`}
                        placeholder="Nhập code"
                        {...formik.getFieldProps("trailer_url")}
                      />
                      {formik.touched.trailer_url &&
                        formik.errors.trailer_url && (
                          <div className="text-danger">
                            {formik.errors.trailer_url}
                          </div>
                        )}
                      <div className="mt-3">
                        <iframe
                          style={{
                            width: "100%",
                            height: "200px",
                          }}
                          src={`https://www.youtube.com/embed/${movie.trailer_url}?rel=0&showinfo=0`}
                          allow="autoplay; encrypted-media"
                          title="Video"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};
export default EditMovie;
