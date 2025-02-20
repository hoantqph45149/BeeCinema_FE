import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  Col,
  Container,
  Form,
  Input,
  Label,
  Row,
} from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { useCRUD, useFetch } from "../../../Hooks/useCRUD";
import { showAlert } from "../../../Components/Common/showAlert";
import useUploadImage from "../../../Hooks/useUploadImage";

document.title = "";
const AddCombo = () => {
  const { data: foodsData } = useFetch(["foods"], "/foods");
  const { create: createCombo } = useCRUD(["combos"]);
  const { uploadImage } = useUploadImage();

  const nav = useNavigate();
  const [foods, setFoods] = useState([
    { id: "", quantity: 1 },
    { id: "", quantity: 1 },
  ]);

  const handleDeleteFood = (index) => {
    const newFoods = [...foods];
    newFoods.splice(index, 1);
    setFoods(newFoods);
  };
  const handleAddFood = () => {
    setFoods([...foods, { id: "", quantity: "" }]);
  };

  const countDown = (index) => {
    setFoods((prevFoods) =>
      prevFoods.map((food, i) =>
        i === index
          ? { ...food, quantity: Math.max(food.quantity - 1, 1) }
          : food
      )
    );
  };

  const countUP = (index) => {
    setFoods((prevFoods) =>
      prevFoods.map((food, i) =>
        i === index ? { ...food, quantity: food.quantity + 1 } : food
      )
    );
  };

  const handleChangeFood = (value, index) => {
    setFoods((prevFoods) =>
      prevFoods.map((food, i) => (i === index ? { ...food, id: value } : food))
    );
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      discount_price: "",
      description: "",
      img_thumbnail: null,
      is_active: true,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Tên combo không được để trống"),
      price: Yup.number()
        .typeError("Giá phải là số")
        .positive("Giá phải lớn hơn 0")
        .required("Giá gốc không được để trống"),
      discount_price: Yup.number()
        .typeError("Giá phải là số")
        .min(0, "Giá bán phải lớn hơn hoặc bằng 0")
        .max(Yup.ref("price"), "Giá bán phải nhỏ hơn giá gốc")
        .required("Giá bán không được để trống"),
      description: Yup.string().required("Mô tả không được để trống"),
      img_thumbnail: Yup.mixed().required("Vui lòng chọn hình ảnh"),
    }),
    onSubmit: async (values) => {
      const checkFoods = foods.every((food) => food.id !== "");
      if (!checkFoods) {
        showAlert(" Thất Bại", "Vui lòng chọn tối thiểu 2 đồ ăn", "warning");
        return;
      }
      const image = await uploadImage(values.img_thumbnail);

      createCombo.mutate(
        {
          url: "/combos",
          data: {
            ...values,
            combo_foods: foods,
            img_thumbnail: image,
          },
        },
        {
          onSuccess: () => {
            formik.resetForm();
            nav("/admin/combos");
          },
        }
      );
    },
  });

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Thêm mới suất chiếu" pageTitle="Thêm mới" />
        <Form onSubmit={formik.handleSubmit}>
          <Row>
            <Col lg={7} xl={8}>
              <div>
                <Card>
                  <div className="card-header border-0">
                    <Row className="align-items-center">
                      <Col>
                        <div className="d-flex flex-column mb-3">
                          <div className="flex-grow-1">
                            <h5 className="fs-16">Thêm thông tin combo</h5>
                          </div>
                          <Button
                            onClick={handleAddFood}
                            type="button"
                            color="success"
                            className="mt-3 align-self-end"
                          >
                            <i className="ri-add-line align-bottom me-1"></i>{" "}
                            Thêm đồ ăn
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="card-body">
                    {foods.map((food, index) => (
                      <Row key={index} className="mb-3">
                        <h5 className="fw-semibold"> Đồ ăn {index + 1} </h5>
                        <Col lg={12} xl={6}>
                          <div className="mb-3">
                            <select
                              id="branches"
                              name="branches"
                              className={`form-select mb-3`}
                              aria-label="Default select example"
                              value={food.id}
                              onChange={(e) =>
                                handleChangeFood(e.target.value, index)
                              }
                            >
                              <option value="">--- Chọn đồ ăn ---</option>
                              {foodsData?.data
                                .filter(
                                  (item) =>
                                    !foods.some(
                                      (f) => f.id == item.id && f.id !== food.id
                                    )
                                )
                                .map((item) => (
                                  <option key={item.id} value={item.id}>
                                    {item.name}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </Col>
                        <Col lg={12} xl={6}>
                          <Row>
                            <Col sm={6}>
                              <div className="mb-3">
                                <div>
                                  <div className="input-step full-width d-flex gap-1">
                                    <button
                                      type="button"
                                      className="btn btn-primary minus material-shadow"
                                      onClick={() => countDown(index)}
                                    >
                                      –
                                    </button>
                                    <Input
                                      type="number"
                                      className="text-center product-quantity"
                                      value={food.quantity}
                                      min="0"
                                      max="100"
                                      readOnly
                                    />
                                    <button
                                      type="button"
                                      className="btn btn-primary minus "
                                      onClick={() => countUP(index)}
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            {foods.length > 2 && (
                              <Col sm={6}>
                                <div className="mb-3">
                                  <div>
                                    <Button
                                      onClick={() => handleDeleteFood(index)}
                                      color="danger"
                                    >
                                      <i className="ri-delete-bin-5-fill"></i>
                                    </Button>
                                  </div>
                                </div>
                              </Col>
                            )}
                          </Row>
                        </Col>
                      </Row>
                    ))}

                    <Row>
                      <Col lg={4}>
                        <div className="mb-3">
                          <Label htmlFor="name" className="form-label">
                            Tên Combo
                          </Label>
                          <Input
                            type="text"
                            id="name"
                            className={`form-control ${
                              formik.errors.name && formik.touched.name
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="Đồ ăn"
                            {...formik.getFieldProps("name")}
                          />
                          {formik.touched.name && formik.errors.name && (
                            <div className="text-danger">
                              {formik.errors.name}
                            </div>
                          )}
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="mb-3">
                          <Label htmlFor="price" className="form-label">
                            Giá gốc
                          </Label>
                          <Input
                            type="number"
                            className={`form-control ${
                              formik.errors.price && formik.touched.price
                                ? "is-invalid"
                                : ""
                            }`}
                            id="price"
                            placeholder="0"
                            {...formik.getFieldProps("price")}
                          />
                          {formik.touched.price && formik.errors.price && (
                            <div className="text-danger">
                              {formik.errors.price}
                            </div>
                          )}
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="mb-3">
                          <Label
                            htmlFor="discount_price"
                            className="form-label"
                          >
                            Giá bán{" "}
                          </Label>
                          <Input
                            type="number"
                            id="discount_price"
                            className={`form-control ${
                              formik.errors.discount_price &&
                              formik.touched.discount_price
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="0"
                            {...formik.getFieldProps("discount_price")}
                          />
                          {formik.touched.discount_price &&
                            formik.errors.discount_price && (
                              <div className="text-danger">
                                {formik.errors.discount_price}
                              </div>
                            )}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12}>
                        <div>
                          <Label htmlFor="description" className="form-label">
                            Mô tả ngắn
                          </Label>
                          <textarea
                            className={`form-control ${
                              formik.errors.description &&
                              formik.touched.description
                                ? "is-invalid"
                                : ""
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
                  </div>
                </Card>
              </div>
            </Col>

            <Col lg={5} xl={4}>
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
                    </div>
                  </div>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <div className="mt-4 mt-md-0">
                    <div className="form-check form-switch form-check-right mb-2">
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="is_active"
                        checked={formik.values.is_active}
                        onChange={(e) =>
                          formik.setFieldValue("is_active", e.target.checked)
                        }
                      />
                      <Label className="form-check-label" htmlFor="is_active">
                        Hoạt động:
                      </Label>
                    </div>
                    <div className="d-flex mb-3">
                      <div className="flex-grow-1">
                        <div className="card-body d-flex justify-content-end gap-2">
                          <Button
                            onClick={() => nav("/admin/combo")}
                            color="primary"
                            className="mr-3"
                          >
                            Danh sách
                          </Button>
                          <Button type="submit" color="primary">
                            Thêm mới
                          </Button>
                        </div>
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
export default AddCombo;
