import React from "react";
import { Navigate } from "react-router-dom";

/* Admin routes */
import Overview from "../pages/Admin/overview/index";
import Account from "../pages/Admin/account";

// banner
import SlideShow from "../pages/Admin/slide-show";
import AddSlideShow from "../pages/Admin/slide-show/AddSlideShow";

// branch
import Branch from "../pages/Admin/branch/index";

// cinema
import Cinema from "../pages/Admin/cinema/index";
import AddCinema from "../pages/Admin/cinema/AddCinema";
import UpdateCinema from "../pages/Admin/cinema/UpdateCinema";

// combo
import Combo from "../pages/Admin/combo";

// food
import Food from "../pages/Admin/food";

// movie
import Movie from "../pages/Admin/movie/index";
import AddMovie from "../pages/Admin/movie/AddMovie";
import EditMovie from "../pages/Admin/movie/EditMovie";

// post
import Post from "../pages/Admin/post";
import AddPost from "../pages/Admin/post/AddPost";
import UpdatePost from "../pages/Admin/post/UpdatePost";

// room
import Room from "../pages/Admin/room/index";
import RoomEdit from "../pages/Admin/room/RoomEdit";

// showtime
import Showtime from "../pages/Admin/showtime";
import Updateshowtime from "../pages/Admin/showtime/Updateshowtime";
import Addshowtime from "./../pages/Admin/showtime/Addshowtime";

// ticket
import Ticket from "../pages/Admin/ticket";

// voucher
import AddVoucher from "../pages/Admin/voucher/AddVoucher";
import EditVoucher from "../pages/Admin/voucher/EditVoucher";

// thống kê
import ThongkeDoanhthu from "../pages/Admin/thongke/thongkeDoanhthu";
import ThongkePhim from "../pages/Admin/thongke/thongkePhim";
import ThongkeCombo from "./../pages/Admin/thongke/thongkeCombo";

import Addcombo from "../pages/Admin/combo/Addcombo";
import PriceManage from "./../pages/Admin/pricemanage/price-manage";
import AddAccount from "../pages/Admin/account/AddAccount";

import SeatTemplate from "../pages/Admin/seat-template";
import EditSeatTemplate from "../pages/Admin/seat-template/EditSeatTemplate";
import SeeSeatMap from "../pages/Admin/seat-template/SeeSeatMap";

/* Client routes */

import Login from "../pages/Auth/login";
import Register from "../pages/Auth/register";
import Home from "../pages/Client/Home";
import ShowtimeClient from "../pages/Client/showtime";
import MoviesClient from "../pages/Client/movie";
import ChooseSeat from "../pages/Client/choose-seat/ChooseSeat";

const authProtectedRoutes = [
  // quản lý tài khoản
  { path: "/admin/account", component: <Account /> },

  // quản lý vé
  {
    path: "/admin/ticket",
    component: <Ticket />,
  },

  // quản lý chi nhánh
  { path: "/admin/Branch", component: <Branch /> },

  // quản lý rạp
  { path: "/admin/cinema", component: <Cinema /> },
  { path: "/admin/cinema/add", component: <AddCinema /> },
  { path: "/admin/cinema/:id/update", component: <UpdateCinema /> },

  // quản lý phòng chiếu
  { path: "/admin/room", component: <Room /> },
  { path: "/admin/room/:id/edit", component: <RoomEdit /> },

  // quản lý mẫu sơ đồ ghế
  { path: "/admin/seat-template", component: <SeatTemplate /> },
  { path: "/admin/seat-template/:id/edit", component: <EditSeatTemplate /> },
  {
    path: "/admin/seat-template/:id/see-seat-map",
    component: <SeeSeatMap />,
  },

  // quản lý phim
  { path: "/admin/movie", component: <Movie /> },
  { path: "/admin/movie/add", component: <AddMovie /> },
  { path: "/admin/movie/:id/edit", component: <EditMovie /> },

  // quản lý suất chiếu
  {
    path: "/admin/showtime",
    component: <Showtime />,
  },
  {
    path: "/admin/showtime/add",
    component: <Addshowtime />,
  },
  {
    path: "/admin/showtime/edit",
    component: <Updateshowtime />,
  },

  // quản lý đồ ăn
  { path: "/admin/food", component: <Food /> },

  // quản lý combo
  { path: "/admin/combo", component: <Combo /> },
  { path: "/admin/combo/add", component: <Addcombo /> },

  // quản lý tài khoản
  { path: "/admin/account", component: <Account /> },
  { path: "/admin/account/add", component: <AddAccount /> },

  // quản lý giảm giá
  { path: "/admin/voucher/add", component: <AddVoucher /> },
  { path: "/admin/voucher/edit", component: <EditVoucher /> },

  // quản lý bài viết
  { path: "/admin/post", component: <Post /> },
  { path: "/admin/post/add", component: <AddPost /> },
  { path: "/admin/post/edit", component: <UpdatePost /> },
  // quản lý giá vé
  { path: "/admin/price", component: <PriceManage /> },
  // quản lý banner
  { path: "/admin/slide-show", component: <SlideShow /> },
  { path: "/admin/slide-show/add", component: <AddSlideShow /> },
  // thống kê
  { path: "/admin/thongkeCombo", component: <ThongkeCombo /> },
  { path: "/admin/thongkeDoanhthu", component: <ThongkeDoanhthu /> },
  { path: "/admin/thongkePhim", component: <ThongkePhim /> },
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
  { path: "/admin", component: <Navigate to="/admin/overview" /> },
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
    path: "/showtime",
    component: <ShowtimeClient />,
  },

  {
    path: "/movies",
    component: <MoviesClient />,
  },

  {
    path: "/choose-seat",
    component: <ChooseSeat />,
  },

  {
    path: "/",
    exact: true,
    component: <Navigate to="/" />,
  },

  { path: "*", component: <Navigate to="/" /> },
];

export { authProtectedRoutes, clientRoutes, publicRoutes };
