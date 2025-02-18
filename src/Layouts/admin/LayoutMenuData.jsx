import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
  const history = useNavigate();
  //state data
  const [thongke, setThongke] = useState(false);
  const [heThongRap, setHeThongRap] = useState(false);
  const [phimVaXuatChieu, setPhimVaXuatChieu] = useState(false);
  const [dichVuVaUuDai, setDichVuVaUuDai] = useState(false);
  const [noidung, setNoidung] = useState(false);
  const [taikhoan, setTaikhoan] = useState(false);

  // Authentication
  const [isSignIn, setIsSignIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [isPasswordCreate, setIsPasswordCreate] = useState(false);
  const [isLockScreen, setIsLockScreen] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);
  const [isVerification, setIsVerification] = useState(false);
  const [isError, setIsError] = useState(false);

  const [iscurrentState, setIscurrentState] = useState("Dashboard");

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("subitems");
        if (document.getElementById(id))
          document.getElementById(id).classList.remove("show");
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (iscurrentState !== "Thongke") {
      setThongke(false);
    }
    if (iscurrentState !== "HeThongRap") {
      setHeThongRap(false);
    }
    if (iscurrentState !== "PhimVaXuatChieu") {
      setPhimVaXuatChieu(false);
    }
    if (iscurrentState !== "DichVuVaUuDai") {
      setDichVuVaUuDai(false);
    }
    if (iscurrentState !== "Noidung") {
      setNoidung(false);
    }
    if (iscurrentState !== "Taikhoan") {
      setTaikhoan(false);
    }

    if (iscurrentState === "Widgets") {
      history("/widgets");
      document.body.classList.add("twocolumn-panel");
    }
  }, [
    history,
    iscurrentState,
    thongke,
    heThongRap,
    phimVaXuatChieu,
    dichVuVaUuDai,
    noidung,
    taikhoan,
  ]);

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
      click: function (e) {
        e.preventDefault();
        setIscurrentState("Tongquan");
        updateIconSidebar(e);
      },
    },
    {
      id: "thongke",
      label: "Thống kê",
      icon: "ri-dashboard-2-line",
      link: "/#",
      stateVariables: thongke,
      click: function (e) {
        e.preventDefault();
        setThongke(!thongke);
        setIscurrentState("Thongke");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: 1,
          label: "Thống kê doanh thu ",
          link: "/admin/thongkeDoanhthu",
          parentId: "thongke",
        },

        {
          id: 2,
          label: "Thống kê phim",
          link: "/admin/thongkePhim",
          parentId: "thongke",
        },
        {
          id: 3,
          label: "Thống kê combo",
          link: "/admin/thongkeCombo",
          parentId: "thongke",
        },
        {
          id: 3,
          label: "Thống kê hóa đơn",
          link: "/#",
          parentId: "thongke",
        },
      ],
    },
    {
      id: "hethongrap",
      label: "Hệ thống rạp",
      icon: "ri-apps-2-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setHeThongRap(!heThongRap);
        setIscurrentState("HeThongRap");
        updateIconSidebar(e);
      },
      stateVariables: heThongRap,
      subItems: [
        {
          id: 1,
          label: "Quản lý chi nhánh",
          link: "/admin/branch",
          parentId: "dichvuvauudai",
        },

        {
          id: 2,
          label: "Quản lý rạp chiếu",
          link: "/admin/cinema",
          parentId: "dichvuvauudai",
        },

        {
          id: 3,
          label: "Quản lý phòng chiếu",
          link: "/admin/room",
          parentId: "dichvuvauudai",
        },

        {
          id: 3,
          label: "Quản lý mẫu sơ đồ ghế",
          link: "/admin/seat-template",
          parentId: "dichvuvauudai",
        },
      ],
    },
    {
      id: "phimvaxuatchieu",
      label: "Phim và Xuất Chiếu",
      icon: "ri-slideshow-2-fill",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setPhimVaXuatChieu(!phimVaXuatChieu);
        setIscurrentState("PhimVaXuatChieu");
        updateIconSidebar(e);
      },
      stateVariables: phimVaXuatChieu,
      subItems: [
        {
          id: 1,
          label: "Quản lý phim",
          link: "/admin/movie",
          parentId: "dichvuvauudai",
        },
        {
          id: 2,
          label: "Quản lý xuất chiếu",
          link: "/admin/showtime",
          parentId: "dichvuvauudai",
        },
        {
          id: 3,
          label: "Quản lý hóa đơn",
          link: "/admin/ticket",
          parentId: "dichvuvauudai",
        },
      ],
    },
    {
      id: "dichvuvauudai",
      label: "Dịch Vụ và ƯU ĐÃI",
      icon: "ri-service-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setDichVuVaUuDai(!dichVuVaUuDai);
        setIscurrentState("DichVuVaUuDai");
        updateIconSidebar(e);
      },
      stateVariables: dichVuVaUuDai,
      subItems: [
        {
          id: 1,
          label: "Quản lý đồ ăn",
          link: "/admin/food",
          parentId: "dichvuvauudai",
        },
        {
          id: 2,
          label: "Quản lý combo",
          link: "/admin/combo",
          parentId: "dichvuvauudai",
        },
        {
          id: 3,
          label: "Mã giảm giá",
          link: "/admin/voucher",
          parentId: "dichvuvauudai",
        },
        {
          id: 3,
          label: "Quản lý giá vé",
          link: "/admin/price",
          parentId: "dichvuvauudai",
        },
      ],
    },
    {
      id: "noidung",
      label: "Nội dung",
      icon: "ri-edit-box-fill",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setNoidung(!noidung);
        setIscurrentState("Noidung");
        updateIconSidebar(e);
      },
      stateVariables: noidung,
      subItems: [
        {
          id: 1,
          label: "Quản lý bài viết",
          link: "/admin/post",
          parentId: "noidung",
        },
        {
          id: 2,
          label: "Quản lý Banner",
          link: "/admin/slide-show",
          parentId: "noidung",
        },
      ],
    },
    {
      id: "taikhoan",
      label: "Tài Khoản",
      icon: "ri-file-user-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setTaikhoan(!taikhoan);
        setIscurrentState("Taikhoan");
        updateIconSidebar(e);
      },
      stateVariables: taikhoan,
      subItems: [
        {
          id: 1,
          label: "Quản lý Tài khoản",
          link: "/admin/account",
          parentId: "taikhoan",
        },
        {
          id: 2,
          label: "Liên hệ",
          link: "/#",
          parentId: "taikhoan",
        },
      ],
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
