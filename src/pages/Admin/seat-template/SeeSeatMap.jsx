import React, { useEffect, useState } from "react";
import { useCRUD, useFetch } from "../../../Hooks/useCRUD";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  Label,
  Row,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import Loader from "../../../Components/Common/Loader";
import { useAuthContext } from "../../../Contexts/auth/UseAuth";
import { showAlert } from "../../../Components/Common/showAlert";

const SeeSeatMap = () => {
  const { hasPermission } = useAuthContext();
  const { id } = useParams();
  const { data: seatTemplate, isLoading } = useFetch(
    ["seatTemplate", { id }],
    `/seat-templates/${id}`
  );
  const { patch: patchSeatTemplate } = useCRUD(["seatTemplate"]);
  const [matrix, setMatrix] = useState({});
  const [seatsByRow, setSeatsByRow] = useState([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (seatTemplate) {
      setMatrix(seatTemplate.matrix_id || {});
      setSeatsByRow(seatTemplate.seat_map || []);
      setIsActive(seatTemplate.is_active || false);
    }
  }, [seatTemplate]);

  const handleSubmit = () => {
    if (hasPermission("Sửa mẫu sơ đồ ghế")) {
      patchSeatTemplate.mutate(
        {
          url: `/seat-templates/${seatTemplate.id}`,
          data: { ...seatTemplate, is_active: isActive },
        },
        {
          onSuccess: () => {
            showAlert(
              "Thành công",
              "Cập nhật trạng thái thành công.",
              "success"
            );
          },
          onError: () => {
            showAlert("Lỗi", "Cập nhật trạng thái thất bại.", "error");
          },
        }
      );
    } else {
      showAlert("Lỗi", "Bạn không có quyền cập nhật trạng thái.", "error");
    }
  };

  document.title = "Xem sơ đồ ghế | Admin Dashboard";

  if (isLoading) {
    return <Loader />;
  }

  if (!hasPermission("Danh sách mẫu sơ đồ ghế")) {
    return (
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Xem sơ đồ ghế" pageTitle="Quản lý" />
          <p>Bạn không có quyền xem sơ đồ ghế.</p>
        </Container>
      </div>
    );
  }

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Xem sơ đồ ghế" pageTitle="Quản lý" />
        <Row>
          <Col lg={9}>
            <Card>
              <CardBody>
                <div className="container py-4">
                  <div className="row">
                    <div className="col-lg-12">
                      <h2 className="h5 fw-semibold mb-3">Sơ đồ ghế</h2>
                      <div className="table-responsive">
                        <table className="mx-auto table text-center">
                          <thead>
                            <tr>
                              <th colSpan={matrix?.max_col || 1}>
                                <img
                                  src="/images/screen.png"
                                  alt="Màn hình"
                                  className="img-fluid"
                                />
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {seatsByRow.map((rowData) => {
                              let hideNextSeat = false;
                              return (
                                <tr key={rowData.row}>
                                  {Array.from(
                                    { length: matrix?.max_col || 0 },
                                    (_, i) => i + 1
                                  ).map((x) => {
                                    const seat = rowData.seats.find(
                                      (seat) => seat.coordinates_x == x
                                    );
                                    if (hideNextSeat) {
                                      hideNextSeat = false;
                                      return null;
                                    }
                                    if (rowData?.type === "double") {
                                      hideNextSeat = true;
                                    }
                                    return (
                                      <td
                                        colSpan={
                                          rowData?.type === "double" ? 2 : 1
                                        }
                                        key={x}
                                        className={`border-0 p-2 cursor-pointer align-middle ${
                                          rowData?.type === "double"
                                            ? "px-1"
                                            : ""
                                        }`}
                                      >
                                        {seat ? (
                                          <div className="position-relative d-flex justify-content-center align-items-center w-100">
                                            <img
                                              src={`/svg/seat-${rowData.type}.svg`}
                                              alt={`${seat.id} - ${seat.name}`}
                                              className="img-fluid w-100"
                                            />
                                            <span
                                              style={{
                                                top: "40%",
                                                wordSpacing: "1.2em",
                                                fontSize: "10px",
                                              }}
                                              className="position-absolute start-50 translate-middle"
                                            >
                                              {seat.name}
                                            </span>
                                          </div>
                                        ) : null}
                                      </td>
                                    );
                                  })}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg={3}>
            <Card>
              <CardHeader>
                <h5 className="card-title mb-0">Thông tin</h5>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={12}>
                    <Label>Trạng thái:</Label>
                    <span className="text-muted">
                      {" "}
                      {seatTemplate?.is_publish
                        ? "Đã xuất bản"
                        : "Chưa xuất bản"}
                    </span>
                  </Col>
                  {hasPermission("Sửa mẫu sơ đồ ghế") && (
                    <Col md={12}>
                      <div className="form-check form-switch form-check-right">
                        <Label>Hoạt động:</Label>
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id={`is_active_${id}`}
                          checked={isActive}
                          onChange={(e) => setIsActive(e.target.checked)}
                        />
                      </div>
                    </Col>
                  )}
                </Row>
                <Row className="gap-3 mt-3">
                  <Col lg={12} className="flex-grow-1">
                    <Link to="/admin/seat-template" className="btn btn-primary">
                      Danh sách
                    </Link>
                  </Col>
                  {hasPermission("Sửa mẫu sơ đồ ghế") && (
                    <Col lg={12} className="flex-grow-1">
                      <Button
                        onClick={handleSubmit}
                        color="primary"
                        className="btn w-sm"
                      >
                        Cập nhật
                      </Button>
                    </Col>
                  )}
                </Row>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <h5 className="card-title mb-0">Chú thích</h5>
              </CardHeader>
              <CardBody>
                <Row className="gap-3">
                  <Col md={12}>
                    <div className="d-flex align-items-center gap-3">
                      <span className="fw-semibold">Ghế thường:</span>
                      <img
                        src="/svg/seat-regular.svg"
                        alt="Ghế thường"
                        style={{ width: "30px", height: "40px" }}
                      />
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="d-flex align-items-center gap-3">
                      <span className="fw-semibold">Ghế VIP:</span>
                      <img
                        src="/svg/seat-vip.svg"
                        alt="Ghế VIP"
                        style={{ width: "30px", height: "40px" }}
                      />
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="d-flex align-items-center gap-3">
                      <span className="fw-semibold">Ghế đôi:</span>
                      <img
                        src="/svg/seat-double.svg"
                        alt="Ghế đôi"
                        style={{ width: "50px", height: "40px" }}
                      />
                    </div>
                  </Col>
                  {seatTemplate?.total_seats > 0 && (
                    <Col md={12}>
                      <div className="d-flex align-items-center gap-3">
                        <span className="fw-semibold">Tổng số ghế:</span>
                        <span className="fw-bold">
                          {seatTemplate?.total_seats}
                        </span>
                      </div>
                    </Col>
                  )}
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SeeSeatMap;
