import { Navigate } from "react-router-dom";

/* Admin routes */

// account
import Account from "../pages/Admin/account/index";
import UpdateAccount from "../pages/Admin/account/UpdateAccount";

import Overview from "../pages/Admin/overview/index";
import Rank from "../pages/Admin/rank";
// banner
import AddSlideShow from "../pages/Admin/slide-show/AddSlideShow";
import SlideShow from "../pages/Admin/slide-show/index";

// branch
import Branch from "../pages/Admin/branch/index";

// cinema
import AddCinema from "../pages/Admin/cinema/AddCinema";
import Cinema from "../pages/Admin/cinema/index";
import UpdateCinema from "../pages/Admin/cinema/UpdateCinema";

// combo
import AddCombo from "../pages/Admin/combo/AddCombo";
import EditCombo from "../pages/Admin/combo/EditCombo";
import Combo from "../pages/Admin/combo/index";

// food
import Food from "../pages/Admin/food/index";

// movie
import AddMovie from "../pages/Admin/movie/AddMovie";
import EditMovie from "../pages/Admin/movie/EditMovie";
import Movie from "../pages/Admin/movie/index";

// post
import AddPost from "../pages/Admin/post/AddPost";
import Post from "../pages/Admin/post/index";
import UpdatePost from "../pages/Admin/post/UpdatePost";

// room
import Room from "../pages/Admin/room/index";
import RoomEdit from "../pages/Admin/room/RoomEdit";

// showtime
import AddShowtime from "../pages/Admin/showtime/add-showtime/index";
import Showtime from "../pages/Admin/showtime/index";
import ShowtimeDetail from "../pages/Admin/showtime/ShowtimeDetail";
import Updateshowtime from "../pages/Admin/showtime/UpdateShowtime";
import ShowtimePreview from "../pages/Admin/showtime-preview";

// ticket
import Ticket from "../pages/Admin/ticket/index";
import TicketDetail from "../pages/Admin/ticket/TicketDetail";

// voucher
import AddVoucher from "../pages/Admin/voucher/AddVoucher";
import EditVoucher from "../pages/Admin/voucher/EditVoucher";
import Voucher from "../pages/Admin/voucher/index";

// thống kê
import ComboStatistics from "../pages/Admin/statistics/cfstatistics";
import RevenueStatistics from "../pages/Admin/statistics/revenue-statistics";
import TicketStatistics from "../pages/Admin/statistics/ticket-statistics";
// quản lý giá
import AddAccount from "../pages/Admin/account/AddAccount";

// quản lý sơ đồ ghế
import EditSeatTemplate from "../pages/Admin/seat-template/EditSeatTemplate";
import SeatTemplate from "../pages/Admin/seat-template/index";
import SeeSeatMap from "../pages/Admin/seat-template/SeeSeatMap";

// contact
import ContactAdmin from "../pages/Admin/contact";

// phân quyền

import Permision from "../pages/Admin/permistion";
import AddPermistion from "../pages/Admin/permistion/AddPermistion";
import UpdatePermiston from "../pages/Admin/permistion/UpdatePermiston";

// Đường dẫn dành cho phía client
import GoogleCallback from "../pages/Auth/google/GoogleCallback";
import Login from "../pages/Auth/login/index";
import Register from "../pages/Auth/register/index";
import Checkout from "../pages/Client/checkout/index";
import ChooseSeat from "../pages/Client/choose-seat/index";
import Contact from "../pages/Client/contact/index";
import Home from "../pages/Client/Home/index";
import Introduce from "../pages/Client/introduce/index";
import MoviesClient from "../pages/Client/movie/index";
import MovieDetails from "../pages/Client/movie/MovieDetail";
import News from "../pages/Client/News/index";
import NewsDetail from "../pages/Client/News/NewDetail";
import ProfileClient from "../pages/Client/profile/index";
import ShowtimeClient from "../pages/Client/showtime/index";
import Thanks from "../pages/Client/Thanks/index";
import TheaterInformation from "../pages/Client/theater-information/index";
import FormForgotPassword from "../pages/Auth/form-forgot-password";
import PriceTicket from "../pages/Client/price-ticket";
import PriceManage from "../pages/Admin/pricemanage";

const publicRoutesNonAuthLayout = [
  {
    path: "/login",
    component: <Login />,
  },
  {
    path: "/register",
    component: <Register />,
  },
  {
    path: "/change-password",
    component: <FormForgotPassword />,
  },
  {
    path: "/google/callback",
    component: <GoogleCallback />,
  },
];

const publicRoutes = [
  {
    path: "/",
    component: <Home />,
  },
  {
    path: "/introduce",
    component: <Introduce />,
  },

  {
    path: "/showtime",
    component: <ShowtimeClient />,
  },
  {
    path: "/news",
    component: <News />,
  },
  {
    path: "/news/:id",
    component: <NewsDetail />,
  },
  {
    path: "/contact",
    component: <Contact />,
  },
  {
    path: "/price-ticket",
    component: <PriceTicket />,
  },

  {
    path: "/theaterinformation",
    component: <TheaterInformation />,
  },

  {
    path: "/movies",
    component: <MoviesClient />,
  },

  {
    path: "/movies/:id/detail",
    component: <MovieDetails />,
  },

  {
    path: "/",
    exact: true,
    component: <Navigate to="/" />,
  },

  { path: "*", component: <Navigate to="/" /> },
];

const authProtectedRoutes = [
  // Quản lý vé
  {
    path: "/admin/ticket",
    component: <Ticket />,
    permission: "Danh sách hóa đơn",
  },
  {
    path: "/admin/ticket/detail/:code",
    component: <TicketDetail />,
    permission: "Xem chi tiết hóa đơn",
  },

  // Quản lý chi nhánh
  {
    path: "/admin/Branch",
    component: <Branch />,
    permission: "Danh sách chi nhánh",
  },

  // Quản lý rạp
  {
    path: "/admin/cinema",
    component: <Cinema />,
    permission: "Danh sách rạp",
  },
  {
    path: "/admin/cinema/add",
    component: <AddCinema />,
    permission: "Thêm rạp",
  },
  {
    path: "/admin/cinema/:id/update",
    component: <UpdateCinema />,
    permission: "Sửa rạp",
  },

  // Quản lý phòng chiếu
  {
    path: "/admin/room",
    component: <Room />,
    permission: "Danh sách phòng chiếu",
  },
  {
    path: "/admin/room/:id/edit",
    component: <RoomEdit />,
    permission: "Sửa phòng chiếu",
  },

  // Quản lý mẫu sơ đồ ghế
  {
    path: "/admin/seat-template",
    component: <SeatTemplate />,
    permission: "Danh sách mẫu sơ đồ ghế",
  },
  {
    path: "/admin/seat-template/:id/edit",
    component: <EditSeatTemplate />,
    permission: "Sửa mẫu sơ đồ ghế",
  },
  {
    path: "/admin/seat-template/:id/see-seat-map",
    component: <SeeSeatMap />,
    permission: "Danh sách mẫu sơ đồ ghế", // Giả định xem sơ đồ ghế cần quyền danh sách
  },

  // Quản lý phim
  {
    path: "/admin/movie",
    component: <Movie />,
    permission: "Danh sách phim",
  },
  {
    path: "/admin/movie/add",
    component: <AddMovie />,
    permission: "Thêm phim",
  },
  {
    path: "/admin/movie/:id/edit",
    component: <EditMovie />,
    permission: "Sửa phim",
  },

  // Quản lý suất chiếu
  {
    path: "/admin/showtime",
    component: <Showtime />,
    permission: "Danh sách suất chiếu",
  },
  {
    path: "/admin/showtime/add",
    component: <AddShowtime />,
    permission: "Thêm suất chiếu",
  },
  {
    path: "/admin/showtime/preview",
    component: <ShowtimePreview />,
    permission: "Danh sách suất chiếu", // Giả định preview cần quyền danh sách
  },
  {
    path: "/admin/showtime/:id/edit",
    component: <Updateshowtime />,
    permission: "Sửa suất chiếu",
  },
  {
    path: "/admin/showtime/:id/detail",
    component: <ShowtimeDetail />,
    permission: "Xem chi tiết suất chiếu",
  },

  // Quản lý đồ ăn
  {
    path: "/admin/food",
    component: <Food />,
    permission: "Danh sách đồ ăn",
  },

  // Quản lý combo
  {
    path: "/admin/combo",
    component: <Combo />,
    permission: "Danh sách combo",
  },
  {
    path: "/admin/combo/add",
    component: <AddCombo />,
    permission: "Thêm combo",
  },
  {
    path: "/admin/combo/:id/edit",
    component: <EditCombo />,
    permission: "Sửa combo",
  },

  // Quản lý tài khoản
  {
    path: "/admin/account",
    component: <Account />,
    permission: "Danh sách tài khoản",
  },
  {
    path: "/admin/account/add",
    component: <AddAccount />,
    permission: "Thêm tài khoản",
  },
  {
    path: "/admin/account/:id/edit",
    component: <UpdateAccount />,
    permission: "Sửa tài khoản",
  },

  // Quản lý liên hệ
  {
    path: "/admin/contact",
    component: <ContactAdmin />,
    permission: "Danh sách liên hệ",
  },

  // Quản lý giảm giá
  {
    path: "/admin/voucher",
    component: <Voucher />,
    permission: "Danh sách vouchers",
  },
  {
    path: "/admin/voucher/add",
    component: <AddVoucher />,
    permission: "Thêm vouchers",
  },
  {
    path: "/admin/voucher/:id/edit",
    component: <EditVoucher />,
    permission: "Sửa vouchers",
  },

  // Quản lý bài viết
  {
    path: "/admin/post",
    component: <Post />,
    permission: "Danh sách bài viết",
  },
  {
    path: "/admin/post/add",
    component: <AddPost />,
    permission: "Thêm bài viết",
  },
  {
    path: "/admin/post/:id/edit",
    component: <UpdatePost />,
    permission: "Sửa bài viết",
  },

  // Quản lý giá vé
  {
    path: "/admin/price-management",
    component: <PriceManage />,
    permission: "Danh sách giá",
  },

  // Quản lý banner
  {
    path: "/admin/slide-show",
    component: <SlideShow />,
    permission: "Danh sách slideshows",
  },
  {
    path: "/admin/slide-show/add",
    component: <AddSlideShow />,
    permission: "Thêm slideshows",
  },

  // Quản lý cấp bậc (rank)
  {
    path: "/admin/rank",
    component: <Rank />,
    permission: "Thẻ thành viên",
  },

  // Quản lý phân quyền

  {
    path: "/admin/permission",
    component: <Permision />,
    permission: null,
  },
  {
    path: "/admin/add/permission",
    component: <AddPermistion />,
    permission: null,
  },
  {
    path: "/admin/update/permissions/:id",
    component: <UpdatePermiston />,
    permission: null,
  },

  // Thống kê
  {
    path: "/admin/revenue-statistics",
    component: <RevenueStatistics />,
    permission: "Danh sách thống kê",
  },
  {
    path: "/admin/Ticket-statistics",
    component: <TicketStatistics />,
    permission: "Danh sách thống kê",
  },
  {
    path: "/admin/combo-statistics",
    component: <ComboStatistics />,
    permission: "Danh sách thống kê",
  },

  // Trang chủ

  {
    path: "/admin/overview",
    component: <Overview />,
    permission: "Danh sách thống kê", // Giả định tổng quan cần quyền thống kê
  },
  {
    path: "/admin",
    exact: true,
    component: <Navigate to="/admin/overview" />,
    permission: null, // Không cần quyền cụ thể
  },
  {
    path: "/admin",
    component: <Navigate to="/admin/overview" />,
    permission: null, // Không cần quyền cụ thể
  },
];

const emailVerifiedRoutes = [
  {
    path: "/choose-seat/:slug",
    component: <ChooseSeat />,
  },

  {
    path: "/checkout/:slug",
    component: <Checkout />,
  },
];

const clientRoutes = [
  {
    path: "/",
    exact: true,
    component: <Navigate to="/" />,
  },
  {
    path: "/thanks/:code",
    component: <Thanks />,
  },
  {
    path: "/profile",
    component: <ProfileClient />,
  },

  { path: "*", component: <Navigate to="/" /> },
];

export {
  authProtectedRoutes,
  clientRoutes,
  emailVerifiedRoutes,
  publicRoutes,
  publicRoutesNonAuthLayout,
};
