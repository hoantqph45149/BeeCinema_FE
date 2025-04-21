import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./../../Contexts/auth/UseAuth";

const Navdata = () => {
  const { hasPermission, role } = useAuthContext();
  const history = useNavigate();
  const [thongke, setThongke] = useState(false);
  const [heThongRap, setHeThongRap] = useState(false);
  const [phimVaXuatChieu, setPhimVaXuatChieu] = useState(false);
  const [dichVuVaUuDai, setDichVuVaUuDai] = useState(false);
  const [noidung, setNoidung] = useState(false);
  const [taikhoan, setTaikhoan] = useState(false);
  const [iscurrentState, setIscurrentState] = useState("Dashboard");

  const updateIconSidebar = (e) => {
    if (e?.target?.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul?.querySelectorAll(".nav-icon.active");
      iconItems?.forEach((item) => {
        item.classList.remove("active");
        const id = item.getAttribute("subitems");
        document.getElementById(id)?.classList.remove("show");
      });
    }
  };

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (iscurrentState !== "Thongke") setThongke(false);
    if (iscurrentState !== "HeThongRap") setHeThongRap(false);
    if (iscurrentState !== "PhimVaXuatChieu") setPhimVaXuatChieu(false);
    if (iscurrentState !== "DichVuVaUuDai") setDichVuVaUuDai(false);
    if (iscurrentState !== "Noidung") setNoidung(false);
    if (iscurrentState !== "Taikhoan") setTaikhoan(false);

    if (iscurrentState === "Widgets") {
      history("/widgets");
      document.body.classList.add("twocolumn-panel");
    }
  }, [history, iscurrentState]);

  const menuItems = [
    {
      label: "Menu",
      isHeader: true,
    },
    {
      id: "tongquan",
      label: "Tổng quan",
      icon: "ri-apps-line",
      link: "/admin/overview",
      click: (e) => {
        e.preventDefault();
        setIscurrentState("Tongquan");
        updateIconSidebar(e);
      },
      isVisible: hasPermission("Danh sách thống kê"), // Quyền xem tổng quan
    },
    {
      id: "thongke",
      label: "Thống kê",
      icon: "ri-dashboard-2-line",
      link: "/#",
      stateVariables: thongke,
      click: (e) => {
        e.preventDefault();
        setThongke(!thongke);
        setIscurrentState("Thongke");
        updateIconSidebar(e);
      },
      isVisible: hasPermission("Danh sách thống kê"),
      subItems: [
        {
          id: 1,
          label: "Thống kê doanh thu",
          link: "/admin/revenue-statistics",
          parentId: "thongke",
          isVisible: hasPermission("Danh sách thống kê"),
        },
        {
          id: 2,
          label: "Thống kê vé",
          link: "/admin/Ticket-statistics",
          parentId: "thongke",
          isVisible: hasPermission("Danh sách thống kê"),
        },
        {
          id: 3,
          label: "Thống kê combo",
          link: "/admin/combo-statistics",
          parentId: "thongke",
          isVisible: hasPermission("Danh sách thống kê"),
        },
      ].filter((item) => item.isVisible),
    },
    {
      id: "hethongrap",
      label: "Hệ thống rạp",
      icon: "ri-apps-2-line",
      link: "/#",
      stateVariables: heThongRap,
      click: (e) => {
        e.preventDefault();
        setHeThongRap(!heThongRap);
        setIscurrentState("HeThongRap");
        updateIconSidebar(e);
      },
      isVisible:
        hasPermission("Danh sách chi nhánh") ||
        hasPermission("Danh sách rạp") ||
        hasPermission("Danh sách phòng chiếu") ||
        hasPermission("Danh sách mẫu sơ đồ ghế"),
      subItems: [
        {
          id: 1,
          label: "Quản lý chi nhánh",
          link: "/admin/branch",
          parentId: "hethongrap",
          isVisible: hasPermission("Danh sách chi nhánh"),
        },
        {
          id: 2,
          label: "Quản lý rạp chiếu",
          link: "/admin/cinema",
          parentId: "hethongrap",
          isVisible: hasPermission("Danh sách rạp"),
        },
        {
          id: 3,
          label: "Quản lý phòng chiếu",
          link: "/admin/room",
          parentId: "hethongrap",
          isVisible: hasPermission("Danh sách phòng chiếu"),
        },
        {
          id: 4,
          label: "Quản lý mẫu sơ đồ ghế",
          link: "/admin/seat-template",
          parentId: "hethongrap",
          isVisible: hasPermission("Danh sách mẫu sơ đồ ghế"),
        },
      ].filter((item) => item.isVisible),
    },
    {
      id: "phimvaxuatchieu",
      label: "Phim và Xuất Chiếu",
      icon: "ri-slideshow-2-fill",
      link: "/#",
      stateVariables: phimVaXuatChieu,
      click: (e) => {
        e.preventDefault();
        setPhimVaXuatChieu(!phimVaXuatChieu);
        setIscurrentState("PhimVaXuatChieu");
        updateIconSidebar(e);
      },
      isVisible:
        hasPermission("Danh sách phim") ||
        hasPermission("Danh sách suất chiếu") ||
        hasPermission("Danh sách hóa đơn"),
      subItems: [
        {
          id: 1,
          label: "Quản lý phim",
          link: "/admin/movie",
          parentId: "phimvaxuatchieu",
          isVisible: hasPermission("Danh sách phim"),
        },
        {
          id: 2,
          label: "Quản lý xuất chiếu",
          link: "/admin/showtime",
          parentId: "phimvaxuatchieu",
          isVisible: hasPermission("Danh sách suất chiếu"),
        },
        {
          id: 3,
          label: "Quản lý hóa đơn",
          link: "/admin/ticket",
          parentId: "phimvaxuatchieu",
          isVisible: hasPermission("Danh sách hóa đơn"),
        },
      ].filter((item) => item.isVisible),
    },
    {
      id: "dichvuvauudai",
      label: "Dịch Vụ và Ưu Đãi",
      icon: "ri-service-line",
      link: "/#",
      stateVariables: dichVuVaUuDai,
      click: (e) => {
        e.preventDefault();
        setDichVuVaUuDai(!dichVuVaUuDai);
        setIscurrentState("DichVuVaUuDai");
        updateIconSidebar(e);
      },
      isVisible:
        hasPermission("Danh sách đồ ăn") ||
        hasPermission("Danh sách combo") ||
        hasPermission("Danh sách vouchers"),
      subItems: [
        {
          id: 1,
          label: "Quản lý đồ ăn",
          link: "/admin/food",
          parentId: "dichvuvauudai",
          isVisible: hasPermission("Danh sách đồ ăn"),
        },
        {
          id: 2,
          label: "Quản lý combo",
          link: "/admin/combo",
          parentId: "dichvuvauudai",
          isVisible: hasPermission("Danh sách combo"),
        },
        {
          id: 3,
          label: "Mã giảm giá",
          link: "/admin/voucher",
          parentId: "dichvuvauudai",
          isVisible: hasPermission("Danh sách vouchers"),
        },
        {
          id: 4,
          label: "Quản lý giá vé",
          link: "/admin/price-management",
          parentId: "dichvuvauudai",
          isVisible: role === "admin",
        },
      ].filter((item) => item.isVisible),
    },
    {
      id: "noidung",
      label: "Nội dung",
      icon: "ri-edit-box-fill",
      link: "/#",
      stateVariables: noidung,
      click: (e) => {
        e.preventDefault();
        setNoidung(!noidung);
        setIscurrentState("Noidung");
        updateIconSidebar(e);
      },
      isVisible:
        hasPermission("Danh sách bài viết") ||
        hasPermission("Danh sách slideshows"),
      subItems: [
        {
          id: 1,
          label: "Quản lý bài viết",
          link: "/admin/post",
          parentId: "noidung",
          isVisible: hasPermission("Danh sách bài viết"),
        },
        {
          id: 2,
          label: "Quản lý Banner",
          link: "/admin/slide-show",
          parentId: "noidung",
          isVisible: hasPermission("Danh sách slideshows"),
        },
      ].filter((item) => item.isVisible),
    },
    {
      id: "taikhoan",
      label: "Tài Khoản",
      icon: "ri-file-user-line",
      link: "/#",
      stateVariables: taikhoan,
      click: (e) => {
        e.preventDefault();
        setTaikhoan(!taikhoan);
        setIscurrentState("Taikhoan");
        updateIconSidebar(e);
      },
      isVisible:
        hasPermission("Danh sách tài khoản") ||
        hasPermission("Danh sách liên hệ") ||
        hasPermission("Thẻ thành viên"),
      subItems: [
        {
          id: 1,
          label: "Quản lý Tài khoản",
          link: "/admin/account",
          parentId: "taikhoan",
          isVisible: hasPermission("Danh sách tài khoản"),
        },
        {
          id: 2,
          label: "Liên hệ",
          link: "/admin/contact",
          parentId: "taikhoan",
          isVisible: hasPermission("Danh sách liên hệ"),
        },
        {
          id: 3,
          label: "Quản lý thẻ thành viên",
          link: "/admin/rank",
          parentId: "taikhoan",
          isVisible: hasPermission("Thẻ thành viên"),
        },
      ].filter((item) => item.isVisible),
    },
    {
      id: "phanquyen",
      label: "Phân quyền",
      icon: "ri-file-shield-2-line",
      link: "/admin/permission",
      click: (e) => {
        e.preventDefault();
        setIscurrentState("Phanquyen");
        updateIconSidebar(e);
      },
      isVisible: role === "admin",
    },
  ].filter((item) => item.isVisible !== false);

  return <React.Fragment>{menuItems}</React.Fragment>;
};

export default Navdata;
