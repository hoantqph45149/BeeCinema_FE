import React, { useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Row,
  Button,
  Table,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";

const PriceManage = () => {
  document.title = "Quản lý giá vé | Velzon - React Admin & Dashboard Template";

  const [prices, setPrices] = useState({
    seatPrices: {
      "Ghế Thường": 50000,
      "Ghế Vip": 75000,
      "Ghế Đôi": 120000,
    },
    roomFees: {
      "2D": 0,
      "3D": 30000,
      IMAX: 50000,
    },
    cinemaFees: {
      "Đồ Sơn": 20000,
      "Lương Khê": 20000,
      "Hải Châu": 10000,
      "Cẩm Lệ": 20000,
      "Sài Gòn": 20000,
      "Gò Vấp": 20000,
      "Hà Đông": 10000,
    },
  });

  const handleChange = (category, key, value) => {
    setPrices((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: Number(value),
      },
    }));
  };

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Quản lý giá vé" pageTitle="Danh sách" />
        <Row>
          <Col lg={6}>
            <Card>
              <CardBody>
                <h5 className="mb-3">Giá vé theo Ghế - Loại phòng</h5>
                <Table bordered>
                  <thead>
                    <tr>
                      <th>GIÁ THEO GHẾ (VNĐ)</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(prices.seatPrices).map(([type, price]) => (
                      <tr key={type}>
                        <td>{type}</td>
                        <td>
                          <Input
                            type="number"
                            value={price}
                            onChange={(e) =>
                              handleChange("seatPrices", type, e.target.value)
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                <Table bordered>
                  <thead>
                    <tr>
                      <th>PHỤ THU THEO LOẠI PHÒNG (VNĐ)</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(prices.roomFees).map(([type, fee]) => (
                      <tr key={type}>
                        <td>{type}</td>
                        <td>
                          <Input
                            type="number"
                            value={fee}
                            onChange={(e) =>
                              handleChange("roomFees", type, e.target.value)
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                <Button color="primary">Cập nhật</Button>
              </CardBody>
            </Card>
          </Col>

          <Col lg={6}>
            <Card>
              <CardBody>
                <h5 className="mb-3">Phụ thu theo rạp</h5>
                <Row className="mb-2">
                  <Col md={8}>
                    <Input type="select">
                      <option>Lọc theo Chi nhánh</option>
                      <option>Hà Nội</option>
                      <option>TP.HCM</option>
                    </Input>
                  </Col>
                  <Col md={4}>
                    <Button color="primary">
                      {" "}
                      <i className="ri-equalizer-fill me-2"></i>Lọc
                    </Button>
                  </Col>
                </Row>

                <Table bordered>
                  <thead>
                    <tr>
                      <th>Tên rạp</th>
                      <th>Giá (VNĐ)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(prices.cinemaFees).map(([cinema, fee]) => (
                      <tr key={cinema}>
                        <td>{cinema}</td>
                        <td>
                          <Input
                            type="number"
                            value={fee}
                            onChange={(e) =>
                              handleChange("cinemaFees", cinema, e.target.value)
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                <Button color="primary">Cập nhật</Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PriceManage;
