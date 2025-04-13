import React from "react";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import { Card, CardBody, Col } from "reactstrap";
import { formatLargeNumber } from "./../../../utils/Currency";

const Widgets = ({ data, date }) => {
  const { totalRevenue, ticketsSold, newCustomers, customerRetentionRate } =
    data;
  console.log("date", date);
  const ecomWidgets = [
    {
      id: 1,
      cardColor: "primary",
      label: "Doanh thu",
      badge:
        totalRevenue?.change < 0
          ? "ri-arrow-right-down-line"
          : "ri-arrow-right-up-line",
      badgeClass: totalRevenue?.change < 0 ? "danger" : "success",
      percentage: `${totalRevenue?.change}%`,
      counter: formatLargeNumber(totalRevenue?.value).value,
      suffix: formatLargeNumber(totalRevenue?.value).suffix,
      bgcolor: "success",
      icon: "bx bx-dollar-circle",
      link: "So với tháng trước",
      decimals: 2,
    },
    {
      id: 2,
      cardColor: "secondary",
      label: "Tổng vé",
      badge:
        ticketsSold?.change < 0
          ? "ri-arrow-right-down-line"
          : "ri-arrow-right-up-line",
      badgeClass: ticketsSold?.change < 0 ? "danger" : "success",
      percentage: `${ticketsSold?.change}%`,
      counter: ticketsSold?.value,
      bgcolor: "info",
      icon: "bx bx-shopping-bag",
      decimals: 0,
      link: "So với tháng trước",
      separator: ".",
    },
    {
      id: 3,
      cardColor: "success",
      label: "Khách hàng mới",
      badge:
        newCustomers?.change < 0
          ? "ri-arrow-right-down-line"
          : "ri-arrow-right-up-line",
      badgeClass: newCustomers?.change < 0 ? "danger" : "success",
      percentage: `${newCustomers?.change}%`,
      counter: newCustomers?.value,
      bgcolor: "warning",
      icon: "bx bx-user-circle",
      link: "So với tháng trước",
      separator: ".",
    },
    {
      id: 4,
      cardColor: "info",
      label: "Tỷ lệ khách hàng quay lại",
      badgeClass: "muted",
      counter: customerRetentionRate,
      bgcolor: "primary",
      icon: "bx bx-user-circle",
      prefix: "",
      suffix: "%",
      link: `Trong tháng ${date?.month}-${date?.year}`,
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
                      <CountUp
                        start={0}
                        prefix={item.prefix}
                        suffix={item.suffix}
                        separator={item.separator}
                        end={item.counter}
                        decimals={item.decimals}
                        duration={4}
                      />
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

export default Widgets;
