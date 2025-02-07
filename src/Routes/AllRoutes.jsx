import React from "react";
import { Navigate } from "react-router-dom";

//Dashboard
import DashboardEcommerce from "../pages/Admin/overview/index";

// //Ecommerce Pages
import Branch from "../pages/Admin/branch/index";
import Ticket from "../pages/Admin/ticket";
import Room from "../pages/Admin/room/index";
import Showtime from "../pages/Admin/showtime";
import Cinema from "../pages/Admin/cinema/index";
import Movie from "../pages/Admin/movie/index";
import Overview from "../pages/Admin/overview/index";
import Food from "../pages/Admin/food";
import Combo from "../pages/Admin/combo";
import Account from "../pages/Admin/account";
import Post from "../pages/Admin/post";
import Banner from "../pages/Admin/banner";
import Login from "../pages/Auth/login";
import Register from "../pages/Auth/register";
import Home from "../pages/Client/Home";
import AddCinema from "../pages/Admin/cinema/AddCinema";
import AddPost from "../pages/Admin/post/AddPost";
import UpdatePost from "../pages/Admin/post/UpdatePost";
import AddVoucher from "../pages/Admin/voucher/AddVoucher";
import EditVoucher from "../pages/Admin/voucher/EditVoucher";
const authProtectedRoutes = [
  // quản lý chi nhánh
  { path: "/admin/Branch", component: <Branch /> },

  // quản lý vé
  {
    path: "/admin/ticket",
    component: <Ticket />,
  },

  // quản lý phòng chiếu
  { path: "/admin/room", component: <Room /> },

  // quản lý suất chiếu
  {
    path: "/admin/showtime",
    component: <Showtime />,
  },

  // quản lý rạp
  { path: "/admin/cinema", component: <Cinema /> },
  { path: "/admin/cinema/add", component: <AddCinema /> },

  // quản lý phim
  { path: "/admin/movie", component: <Movie /> },

  // quản lý đồ ăn
  { path: "/admin/food", component: <Food /> },

  // quản lý combo
  { path: "/admin/combo", component: <Combo /> },

  // quản lý tài khoản
  { path: "/admin/account", component: <Account /> },
  // quản lý giảm giá
  { path: "/admin/voucher/add", component: <AddVoucher /> },
  { path: "/admin/voucher/edit", component: <EditVoucher /> },

  // quản lý bài viết
  { path: "/admin/post", component: <Post /> },
  { path: "/admin/post/add", component: <AddPost /> },
  { path: "/admin/post/edit", component: <UpdatePost /> },

  // quản lý banner
  { path: "/admin/banner", component: <Banner /> },

  // trang chủ
  {
    path: "/admin/overview",
    component: <Overview />,
  },
  {
    path: "/admin",
    exact: true,
    component: <Navigate to="/admin/overview" />,
  },
  { path: "*", component: <Navigate to="/admin/overview" /> },
];

const publicRoutes = [
  {
    path: "/login",
    component: <Login />,
  },
  {
    path: "/register",
    component: <Register />,
  },
];

const clientRoutes = [
  {
    path: "/",
    component: <Home />,
  },

  {
    path: "/",
    exact: true,
    component: <Navigate to="/" />,
  },
  { path: "*", component: <Navigate to="/" /> },
];

export { authProtectedRoutes, publicRoutes, clientRoutes };
