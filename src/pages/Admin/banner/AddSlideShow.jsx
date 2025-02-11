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
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { FaTrash } from "react-icons/fa";

const AddSlideShow = () => {
  document.title = "Thêm SlideShow | Velzon - React Admin & Dashboard Template";

  const [images, setImages] = useState(["", "", ""]);

  const handleAddImage = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = URL.createObjectURL(file);
      setImages(newImages);
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages[index] = "";
    setImages(newImages);
  };

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Thêm Slide Show" pageTitle="Danh sách" />

        <Row>
          <Col lg={8}>
            <Card>
              <CardBody>
                <h5 className="mb-3">Chọn ảnh</h5>
                <div className="mb-3">
                  <Button
                    color="primary"
                    onClick={() => setImages([...images, ""])}
                  >
                    Thêm ảnh
                  </Button>
                </div>
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="d-flex align-items-center mb-3 border p-2 rounded"
                  >
                    <img
                      src={img || ""}
                      alt=""
                      className="me-2"
                      style={{ width: "50px", height: "50px" }}
                    />
                    <Input
                      type="file"
                      className="form-control me-2"
                      onChange={(e) => handleAddImage(e, index)}
                    />
                    <Button
                      color="danger"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                ))}
              </CardBody>
            </Card>
          </Col>

          <Col lg={4}>
            <Card>
              <CardBody>
                <Label htmlFor="description" className="form-label">
                  Mô tả
                </Label>
                <textarea
                  className="form-control"
                  id="description"
                  rows="5"
                ></textarea>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <div className="mb-3">
          <Button color="primary">Thêm mới</Button>
        </div>
      </Container>
    </div>
  );
};

export default AddSlideShow;
