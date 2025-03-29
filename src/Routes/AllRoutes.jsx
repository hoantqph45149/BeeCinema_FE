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
import Addshowtime from "../pages/Admin/showtime/AddShowtime";
import Showtime from "../pages/Admin/showtime/index";
import ShowtimeDetail from "../pages/Admin/showtime/ShowtimeDetail";
import Updateshowtime from "../pages/Admin/showtime/UpdateShowtime";

// ticket
import Ticket from "../pages/Admin/ticket/index";
import TicketDetail from "../pages/Admin/ticket/TicketDetail";

// voucher
import AddVoucher from "../pages/Admin/voucher/AddVoucher";
import EditVoucher from "../pages/Admin/voucher/EditVoucher";
import Voucher from "../pages/Admin/voucher/index";

// thống kê

// quản lý giá
import AddAccount from "../pages/Admin/account/AddAccount";
import PriceManage from "../pages/Admin/pricemanage/price-manage";

// quản lý sơ đồ ghế
import EditSeatTemplate from "../pages/Admin/seat-template/EditSeatTemplate";
import SeatTemplate from "../pages/Admin/seat-template/index";
import SeeSeatMap from "../pages/Admin/seat-template/SeeSeatMap";

// contact
import ContactAdmin from "../pages/Admin/contact";

// Đường dẫn dành cho phía client
import RevenueStatistics from "../pages/Admin/statistics/revenue-statistics";
import TicketStatistics from "../pages/Admin/statistics/ticket-statistics";
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
  // quản lý vé
  {
    path: "/admin/ticket",
    component: <Ticket />,
  },
  {
    path: "/admin/ticket/detail/:code",
    component: <TicketDetail />,
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
    path: "/admin/showtime/:id/edit",
    component: <Updateshowtime />,
  },
  {
    path: "/admin/showtime/:id/detail",
    component: <ShowtimeDetail />,
  },

  // quản lý đồ ăn
  { path: "/admin/food", component: <Food /> },

  // quản lý combo
  { path: "/admin/combo", component: <Combo /> },
  { path: "/admin/combo/add", component: <AddCombo /> },
  { path: "/admin/combo/:id/edit", component: <EditCombo /> },

  // quản lý tài khoản
  { path: "/admin/account", component: <Account /> },
  { path: "/admin/account/add", component: <AddAccount /> },
  { path: "/admin/account/:id/edit", component: <UpdateAccount /> },

  // quản lý liên hệ
  { path: "/admin/contact", component: <ContactAdmin /> },
  // quản lý giảm giá
  { path: "/admin/voucher", component: <Voucher /> },
  { path: "/admin/voucher/add", component: <AddVoucher /> },
  { path: "/admin/voucher/:id/edit", component: <EditVoucher /> },

  // quản lý bài viết
  { path: "/admin/post", component: <Post /> },
  { path: "/admin/post/add", component: <AddPost /> },
  { path: "/admin/post/:id/edit", component: <UpdatePost /> },
  // quản lý giá vé
  { path: "/admin/price", component: <PriceManage /> },
  // quản lý banner
  { path: "/admin/slide-show", component: <SlideShow /> },
  { path: "/admin/slide-show/add", component: <AddSlideShow /> },
  // quản lý cấp bậc (rank)
  { path: "/admin/rank", component: <Rank /> },
  // thống kê
  { path: "/admin/revenue-statistics", component: <RevenueStatistics /> },
  { path: "/admin/Ticket-statistics", component: <TicketStatistics /> },
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

const emailVerifiedRoutes = [
  {
    path: "/choose-seat/:slug",
    component: <ChooseSeat />,
  },
];

const clientRoutes = [
  {
    path: "/",
    exact: true,
    component: <Navigate to="/" />,
  },
  {
    path: "/profile",
    component: <ProfileClient />,
  },
  {
    path: "/checkout/:slug",
    component: <Checkout />,
  },
  {
    path: "/thanks/:code",
    component: <Thanks />,
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
