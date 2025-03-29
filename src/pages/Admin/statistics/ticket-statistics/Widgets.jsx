import dayjs from "dayjs";
import React from "react";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import { Card, CardBody, Col } from "reactstrap";
import PropTypes from "prop-types";

const Widgets = ({ data, date }) => {
  const ecomWidgets = [
    {
      id: 1,
      cardColor: "primary",
      label: "Tổng Vé Bán Ra",
      badgeClass: "success",
      counter: data?.totaltickets,
      link: `Từ ${dayjs(date.startDate).format("DD-MM-YYYY")} đến ${dayjs(
        date.endDate
      ).format("DD-MM-YYYY")}`,
      bgcolor: "success",
      icon: "ri-ticket-2-line",
    },
    {
      id: 2,
      cardColor: "secondary",
      label: "Trung Bình Mỗi Ngày",
      badgeClass: "danger",
      counter: data?.avgTicketsPerDay,
      link: `Số vé trung bình mỗi ngày`,
      bgcolor: "info",
      decimals: 2,
      icon: "ri-calendar-2-line",
    },
    {
      id: 3,
      cardColor: "success",
      label: "Giờ Cao Điểm",
      badgeClass: "success",
      counter: dayjs()
        .hour(data?.peakHours?.hour)
        .minute(0)
        .second(0)
        .format("HH:mm"),
      link: `Giờ bán vé nhiều nhất`,
      bgcolor: "warning",
      icon: "ri-time-line",
    },
    {
      id: 4,
      cardColor: "info",
      label: "Tỷ Lệ Lấp Đầy",
      badgeClass: "muted",
      counter: data?.cinemaOccupancy?.occupancy_rate,
      link: `Tỷ lệ ghế đã đặt tại rạp ${data?.cinemaOccupancy?.cinema}`,
      bgcolor: "primary",
      icon: "ri-line-chart-line",
    },
  ];
  return (
    <React.Fragment>
      {ecomWidgets.map((item, key) => (
        <Col xl={3} md={6} key={key}>
          <Card className="card-animate">
            <CardBody>
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                    {item.label}
                  </p>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span
                    className={
                      "avatar-title rounded fs-3 bg-" + item.bgcolor + "-subtle"
                    }
                  >
                    <i className={`text-${item.bgcolor} ${item.icon}`}></i>
                  </span>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-2">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span className="counter-value" data-target="559.25">
                      {typeof item.counter === "number" ? (
                        <CountUp
                          start={0}
                          end={item.counter}
                          decimals={item.decimals || 0}
                          duration={4}
                          separator=","
                          suffix={item.suffix || ""}
                        />
                      ) : (
                        item.counter
                      )}
                    </span>
                  </h4>
                  <Link to="#">{item.link}</Link>
                </div>
                <h5 className={"fs-14 mb-0 text-" + item.badgeClass}>
                  {item.badge ? (
                    <i className={"fs-13 align-middle " + item.badge}></i>
                  ) : null}{" "}
                  {item.percentage}
                </h5>
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
    </React.Fragment>
  );
};
Widgets.propTypes = {
  data: PropTypes.shape({
    totaltickets: PropTypes.number,
    avgTicketsPerDay: PropTypes.number,
    peakHours: PropTypes.shape({
      hour: PropTypes.number,
    }),
    cinemaOccupancy: PropTypes.shape({
      occupancy_rate: PropTypes.number,
      cinema: PropTypes.string,
    }),
  }),
  date: PropTypes.shape({
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
  }),
};

export default Widgets;
