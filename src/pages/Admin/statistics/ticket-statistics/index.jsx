import dayjs from "dayjs";
import React, { useState } from "react";
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
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import Loader from "../../../../Components/Common/Loader";
import { useFetch } from "../../../../Hooks/useCRUD";
import PeakHoursChart from "./PeakHoursChart";
import TheaterOccupancyRate from "./TheaterOccupancyRate";
import TicketSalesTrends from "./TicketSalesTrends";
import TicketsByType from "./TicketsByType";
import TopBestSellingMovies from "./TopBest-SellingMovies";
import Widgets from "./Widgets";
import { useAuthContext } from "./../../../../Contexts/auth/UseAuth";

const TicketStatistics = () => {
  const { authUser } = useAuthContext();

  const getDefaultDates = () => ({
    startDate: dayjs().subtract(1, "month").format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
    cinema_id: authUser?.cinema_id || "",
  });

  const [dates, setDates] = useState(getDefaultDates());

  const [filterDates, setFilterDates] = useState(getDefaultDates());

  const { data: cinemas } = useFetch(
    ["cinemas", authUser?.cinema_id],
    `/cinemas`,
    {
      enabled: !authUser?.cinema_id,
    }
  );

  const { data, isLoading } = useFetch(
    ["revenue-ticket-statistics", filterDates],
    `/revenue-ticket-statistics?start_date=${filterDates.startDate}&end_date=${filterDates.endDate}&cinema_id=${filterDates.cinema_id}`
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

  const WidgetsData = {
    totaltickets: data?.totaltickets,
    avgTicketsPerDay: data?.avgTicketsPerDay,
    peakHours: data?.peakHours[0],
    cinemaOccupancy: data?.cinemaOccupancy[0],
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
                      <Col xl={6}>
                        <Card>
                          <CardHeader>
                            <h4 className="card-title fs-4 fw-bold mb-0">
                              Xu Hướng Bán Vé
                            </h4>
                            <p className="text-muted">
                              Số lượng vé bán ra (
                              {dayjs(filterDates.startDate).format(
                                "DD/MM/YYYY"
                              )}{" "}
                              -{dayjs(filterDates.endDate).format("DD/MM/YYYY")}
                              )
                            </p>
                          </CardHeader>
                          <CardBody>
                            <div>
                              <TicketSalesTrends
                                data={data?.ticketSalesTrend}
                                dataColors='["--vz-primary"]'
                              />
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col xl={6}>
                        <Card>
                          <CardHeader>
                            <h4 className="card-title fs-4 fw-bold mb-0">
                              Top Phim Bán Chạy
                            </h4>
                            <p className="text-muted">
                              Số lượng vé bán ra theo phim
                            </p>
                          </CardHeader>

                          <CardBody>
                            <TopBestSellingMovies
                              data={data?.topMoviesByTickets}
                              dataColors='["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]'
                            />
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col xl={6}>
                        <Card>
                          <CardHeader>
                            <h4 className="card-title fs-4 fw-bold mb-0">
                              Phân Loại Vé
                            </h4>
                            <p className="text-muted">Phân bổ theo loại vé</p>
                          </CardHeader>
                          <CardBody>
                            <TicketsByType
                              data={data?.ticketsByType}
                              dataColors='["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]'
                            />
                          </CardBody>
                        </Card>
                      </Col>
                      <Col xl={6}>
                        <Card>
                          <CardHeader>
                            <h4 className="card-title fs-4 fw-bold mb-0">
                              Giờ Cao Điểm
                            </h4>
                            <p className="text-muted">
                              Số lượng vé bán ra theo giờ
                            </p>
                          </CardHeader>

                          <CardBody>
                            <PeakHoursChart
                              data={data?.peakHours}
                              dataColors='["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-dark", "--vz-info"]'
                            />
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col lg={12}>
                        <Card>
                          <CardHeader>
                            <h4 className="card-title fs-4 fw-bold mb-0">
                              Tỷ Lệ Lấp Đầy Rạp
                            </h4>
                            <p className="text-muted">
                              Tỷ lệ ghế đã đặt trên tổng số ghế
                            </p>
                          </CardHeader>
                          <CardBody>
                            <TheaterOccupancyRate
                              data={data?.cinemaOccupancy}
                              dataColors='["--vz-info", "--vz-primary"]'
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

export default TicketStatistics;
