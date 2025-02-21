import React, { useState } from "react";
import {
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
import { useFormik } from "formik";
document.title =
  "Thông tin bài viết | Velzon - React Admin & Dashboard Template";

const AddPost = () => {
  const nav = useNavigate();

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

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title={"Thông tin bài viết"} pageTitle="Danh sách" />
        <Row>
          <Col lg={8}>
            <Form>
              <Card>
                <CardBody>
                  <Row>
                    <Col lg={6} md={12}>
                      <div className="mb-3">
                        <Label className="form-label" htmlFor="title">
                          Tiêu đề
                        </Label>
                        <Input type="text" id="title" name="title" required />
                      </div>
                    </Col>
                  </Row>
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="description">
                      Mô tả ngắn
                    </Label>
                    <Input type="text" id="description" name="description" />
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
                      </Col>
                    </Row>
                  </div>
                </CardBody>
              </Card>
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
                    id="image"
                    name="image"
                  />
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
                    id=""
                  />
                  <Label htmlFor="status" className="form-label">
                    Trạng thái
                  </Label>
                </div>
              </CardBody>
            </Card>
          </Col>
          <div className="text-end mb-3">
            <button type="submit" className="btn btn-success w-sm">
              Submit
            </button>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default AddPost;
