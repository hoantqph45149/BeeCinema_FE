import classnames from "classnames";
import React from "react";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { useState } from "react";
import ComboStatistics from "./combo";
import FoodsStatistics from "./food";
const CFStatistics = () => {
  const [activeTab, setActiveTab] = useState("1");
  const toggleTab = (tab, type) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Thống kê combo và đồ ăn" pageTitle="Thống kê" />
        <Card>
          <Nav className="nav-tabs nav-tabs-custom nav-success" role="tablist">
            <NavItem>
              <NavLink
                className={classnames(
                  { active: activeTab === "1" },
                  "fw-semibold"
                )}
                onClick={() => {
                  toggleTab("1", "addMultiple");
                }}
                href="#"
              >
                Thống kê combo
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames(
                  { active: activeTab === "2" },
                  "fw-semibold"
                )}
                onClick={() => {
                  toggleTab("2", "addPerDay");
                }}
                href="#"
              >
                {" "}
                Thống kê đồ ăn
              </NavLink>
            </NavItem>
          </Nav>
          <CardBody>
            {activeTab === "1" && <ComboStatistics />}
            {activeTab === "2" && <FoodsStatistics />}
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default CFStatistics;
