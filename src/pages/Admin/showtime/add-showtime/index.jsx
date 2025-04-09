import classnames from "classnames";
import { Card, CardHeader, Container, Nav, NavItem, NavLink } from "reactstrap";

import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import { useState } from "react";
import AddMultipleShowtimes from "./AddMultipleShowtimes";
import AddShowPerDay from "./AddShowPerDay";

const AddShowtime = () => {
  const [activeTab, setActiveTab] = useState("1");
  const toggleTab = (tab, type) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Thêm mới suất chiếu" pageTitle="Thêm mới" />
        <Card>
          <CardHeader>
            <Nav
              className="nav-tabs nav-tabs-custom nav-success"
              role="tablist"
            >
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
                  <i className="ri-add-line align-bottom me-1"></i> Thêm theo
                  nhiều ngày
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
                  <i className="ri-add-line align-bottom me-1"></i> Thêm theo
                  ngày
                </NavLink>
              </NavItem>
            </Nav>
          </CardHeader>
        </Card>
        {activeTab === "1" && <AddMultipleShowtimes />}
        {activeTab === "2" && <AddShowPerDay />}
      </Container>
    </div>
  );
};

export default AddShowtime;
