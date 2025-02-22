import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { useAuthContext } from "../../Contexts/auth/UseAuth";
import { useCRUD } from "../../Hooks/useCRUD";

const ProfileDropdown = () => {
  const { create: logout } = useCRUD(["logout"]);
  const { authUser, setAuthUser } = useAuthContext();
  //Dropdown Toggle
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const toggleProfileDropdown = () => {
    setIsProfileDropdown(!isProfileDropdown);
  };
  const handleLogout = () => {
    logout.mutate(
      {
        url: "/logout",
        data: {},
        shouldShowAlert: false,
      },
      {
        onSuccess: () => {
          localStorage.removeItem("user");
          setAuthUser(null);
          window.location.href = "/login";
        },
        onError: (error) => {
          if (error?.response?.data?.message == "Unauthenticated") {
            localStorage.removeItem("user");
            setAuthUser(null);
            window.location.href = "/login";
          }
        },
      }
    );
  };
  return (
    <React.Fragment>
      <Dropdown
        isOpen={isProfileDropdown}
        toggle={toggleProfileDropdown}
        className="ms-sm-3 header-item topbar-user"
      >
        <DropdownToggle tag="button" type="button" className="btn">
          <span className="d-flex align-items-center">
            <img
              className="rounded-circle header-profile-user"
              src={authUser?.user?.avatar || "/images/defaultavatar.jpg"}
              alt="Header Avatar"
            />
            <span className="text-start ms-xl-2">
              <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                Admin
              </span>
              <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">
                {authUser?.user?.name}
              </span>
            </span>
          </span>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <h6 className="dropdown-header">Welcome Admin</h6>
          <DropdownItem className="p-0">
            <a href="/" className="dropdown-item">
              <i className="mdi mdi-home-circle text-muted fs-16 align-middle me-1"></i>
              <span className="align-middle">Trang chủ</span>
            </a>
          </DropdownItem>
          <DropdownItem className="p-0">
            <Link to="/admin/account" className="dropdown-item">
              <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
              <span className="align-middle">Hồ sơ</span>
            </Link>
          </DropdownItem>

          <div className="dropdown-divider"></div>
          <DropdownItem className="p-0">
            <Link onClick={handleLogout} className="dropdown-item">
              <i className="ri-logout-box-r-line text-muted fs-16 align-middle me-1"></i>
              <span className="align-middle">Đăng Xuất</span>
            </Link>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default ProfileDropdown;
