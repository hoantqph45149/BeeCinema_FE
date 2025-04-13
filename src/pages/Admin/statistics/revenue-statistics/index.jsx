import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
} from "reactstrap";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import ProportionPayment from "./ProportionPayment";
import RevenueCinema from "./RevenueCinema";
import RevenueMovie from "./RevenueMovie";
import TrendChart from "./TrendChart";
import Widgets from "./Widgets";
import { useFetch } from "../../../../Hooks/useCRUD";
import Loader from "../../../../Components/Common/Loader";
import dayjs from "dayjs";
import { useAuthContext } from "../../../../Contexts/auth/UseAuth";

const RevenueStatistics = () => {
  const { authUser } = useAuthContext();

  const { data: cinemas } = useFetch(
    ["cinemas", authUser?.cinema_id],
    `/cinemas`,
    {
      enabled: !authUser?.cinema_id,
    }
  );

  const getDefaultDates = () => ({
    startDate: dayjs().subtract(1, "month").format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
    cinema_id: authUser?.cinema_id || "",
  });

  const [dates, setDates] = useState(getDefaultDates());

  const [filterDates, setFilterDates] = useState(getDefaultDates());

  const { data, isLoading } = useFetch(
    ["revenue-by-total", filterDates],
    `/revenue-by-total?start_date=${filterDates.startDate}&end_date=${filterDates.endDate}&cinema_id=${filterDates.cinema_id}`
  );

  const handleChange = (e) => {
    setDates({
      ...dates,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilter = () => {
    setFilterDates(dates);
  };

  // Dữ liệu cho Widgets
  const WidgetsData = {
    totalRevenue: data?.totalRevenue,
    cinemaRevenue: data?.revenueByCinema[0],
    movieRevenue: data?.revenueByMovie[0],
    paymentMethod: data?.paymentMethods[0],
  };

  return (
    <React.Fragment>
      <div className="page-content">
        {isLoading ? (
          <div className="vh-100 d-flex justify-content-center align-items-center">
            <Loader />
          </div>
        ) : (
          <Container fluid>
            <BreadCrumb title="Thống kê doanh thu" pageTitle="Thống kê" />
            <Row>
              <Col>
                <Card>
                  <CardHeader>
                    <h4 className="card-title mb-2 fw-bold">
                      Chọn khoảng thời gian
                    </h4>
                    <Row className="align-items-end">
                      <Col md={4} lg={3}>
                        <Label className="form-label">Ngày bắt đầu</Label>
                        <Input
                          type="date"
                          className="form-control"
                          name="startDate"
                          value={dates.startDate}
                          onChange={handleChange}
                        />
                      </Col>
                      <Col md={4} lg={3}>
                        <Label className="form-label">Ngày kết thúc</Label>
                        <Input
                          type="date"
                          className="form-control"
                          name="endDate"
                          value={dates.endDate}
                          onChange={handleChange}
                        />
                      </Col>
                      {!authUser?.cinema_id && (
                        <Col md={4} lg={3}>
                          <Label htmlFor="cinema_id" className="form-label">
                            Rạp chiếu
                          </Label>
                          <select
                            name="cinema_id"
                            id="cinema_id"
                            className="form-select"
                            value={dates.cinema_id}
                            onChange={handleChange}
                          >
                            <option value="">--- Tất cả ---</option>
                            {cinemas?.map((cinema) => (
                              <option key={cinema.id} value={cinema.id}>
                                {cinema.name}
                              </option>
                            ))}
                          </select>
                        </Col>
                      )}
                      <Col lg={2} md={4} sm={6} xs={12}>
                        <Button color="primary" onClick={handleFilter}>
                          Lọc
                        </Button>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Row className="mt-3">
                      <Widgets data={WidgetsData} date={filterDates} />
                    </Row>
                    <Row className="mt-3">
                      <Col lg={6}>
                        <Card>
                          <CardHeader>
                            <h4 className="card-title mb-0 fs-4 fw-bold">
                              Doanh thu theo rạp
                            </h4>
                          </CardHeader>
                          <CardBody>
                            <RevenueCinema
                              data={data?.revenueByCinema}
                              dataColors='["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]'
                            />
                          </CardBody>
                        </Card>
                      </Col>
                      <Col lg={6}>
                        <Card>
                          <CardHeader>
                            <h4 className="card-title mb-0 fs-4 fw-bold">
                              Doanh thu theo phim
                            </h4>
                          </CardHeader>
                          <CardBody>
                            <RevenueMovie
                              data={data?.revenueByMovie}
                              dataColors='["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]'
                            />
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col lg={6}>
                        <Card>
                          <CardHeader>
                            <h4 className="card-title mb-0 fs-4 fw-bold">
                              Phương thức thanh toán
                            </h4>
                            <p className="card-title-desc">
                              Tỷ lệ sử dụng các phương thức thanh toán
                            </p>
                          </CardHeader>
                          <CardBody>
                            <ProportionPayment
                              data={data?.paymentMethods}
                              dataColors='["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]'
                            />
                          </CardBody>
                        </Card>
                      </Col>
                      <Col lg={6}>
                        <Card>
                          <CardHeader>
                            <h4 className="card-title mb-0 fs-4 fw-bold">
                              Xu hướng doanh thu theo tháng
                            </h4>
                            <p className="card-title-desc">
                              Biểu đồ doanh thu theo thời gian
                            </p>
                          </CardHeader>
                          <CardBody>
                            <TrendChart
                              data={data?.monthlyTrend}
                              dataColors='["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]'
                            />
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        )}
      </div>
    </React.Fragment>
  );
};

export default RevenueStatistics;
