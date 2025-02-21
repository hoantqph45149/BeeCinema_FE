import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Input,
  Label,
  Row,
} from "reactstrap";
import * as Yup from "yup";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableContainer from "../../../Components/Common/TableContainer";
import { useCRUD, useFetch } from "../../../Hooks/useCRUD";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik, validateYupSchema } from "formik";
import api from "../../../apis/axios";
import dayjs from "dayjs";

const Updateshowtime = () => {
  const { id } = useParams();
  const { patch: updateShowtime } = useCRUD(["showtimes"]);
  const { data: showtimeData } = useFetch(["showtime", id], `/showtimes/${id}`);
  const { data: moviesData } = useFetch(["movies"], "/movies");
  const { data: branchesData } = useFetch(["branches"], "/branches/active");
  const nav = useNavigate();
  const [showtime, setShowtime] = useState({});
  const [showtimesDate, setShowtimesDate] = useState([]);
  const [movies, setMovies] = useState([]);
  const [movieVersions, setMovieVersions] = useState([]);
  const [branches, setBranches] = useState([]);
  const [cinemas, setCinemas] = useState([]);
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    if (moviesData && branchesData && showtimeData) {
      setMovies(moviesData.data);
      setBranches(branchesData.branches);
      setShowtime(showtimeData.showtime);
      const movie = moviesData.data.find(
        (movie) => movie.id == showtimeData.showtime.movie_id
      );
      const branche = branchesData.branches.find(
        (branche) => branche.id == showtimeData.showtime.room.branch_id
      );

      const cinema = branche.cinemas.find(
        (cinema) => cinema.id == showtimeData.showtime.cinema_id
      );
      setRooms(cinema.rooms);
      setCinemas(branche.cinemas);
      setMovieVersions(movie.movie_versions);
    }
  }, [moviesData, branchesData, showtimeData]);

  useEffect(() => {
    if (showtime) {
      const fetchData = async () => {
        try {
          const { data } = await api.get(
            `/showtimes?branch_id=${showtime?.room?.branch_id}&cinema_id=${showtime?.cinema_id}&room_id=${showtime.room_id}&date=${showtime?.date}&is_active=1`
          );
          const showtimes = data.showtimes.sort((a, b) => {
            return dayjs(a.start_time, "YYYY-MM-DD HH:mm:ss").diff(
              dayjs(b.start_time, "YYYY-MM-DD HH:mm:ss")
            );
          });
          setShowtimesDate(showtimes);
        } catch (error) {
          console.error("Fetch error:", error);
        }
      };

      fetchData();
    }
  }, [showtime]);

  const handleSetVersionMovie = (id) => {
    if (id === "") {
      setMovieVersions([]);
    } else {
      const movie = movies.find((movie) => movie.id == id);
      if (movie) {
        setMovieVersions(movie.movie_versions);
      }
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      movie_id: showtime?.movie?.id || "",
      movie_version_id: showtime?.movie_version?.id || "",
      branch_id: showtime?.room?.branch_id || "",
      cinema_id: showtime?.cinema_id || "",
      room_id: showtime?.room_id || "",
      date: showtime?.date || "",
      is_active: showtime?.is_active || true,
      start_time: dayjs(showtime?.start_time).format("HH:mm") || "",
      end_time: dayjs(showtime?.end_time).format("HH:mm") || "",
    },
    validationSchema: Yup.object({
      movie_id: Yup.string().required("Vui lòng chọn phim"),
      movie_version_id: Yup.string().required("Vui lòng chọn phiên bản phim"),
      branch_id: Yup.string().required("Vui lòng chọn chi nhánh"),
      cinema_id: Yup.string().required("Vui lòng chọn rạp"),
      room_id: Yup.string().required("Vui lòng chọn phòng"),
      date: Yup.date()
        .required("Vui lòng chọn ngày khởi chiếu")
        .min(today, "Ngày khởi chiếu không được nhỏ hơn ngày hiện tại"),
      start_time: Yup.string()
        .required("Vui lòng chọn giờ chiếu")
        .test(
          "is-not-overlapping",
          "Giờ chiếu bị trùng với suất khác",
          function (value) {
            if (!value || !showtimesDate || !formik.values.movie_id)
              return true;

            const movie = movies.find((m) => m.id == formik.values.movie_id);
            if (!movie) return true;

            const startTime = dayjs(
              `${formik.values.date} ${value}`,
              "YYYY-MM-DD HH:mm"
            );
            const endTime = startTime.add(
              showtime.movie.duration + 15,
              "minute"
            ); // Tự động tính end_time

            return !showtimesDate.some((show) => {
              if (show.id == showtime.id) return false;
              const showStart = dayjs(show.start_time, "YYYY-MM-DD HH:mm:ss");
              const showEnd = dayjs(show.end_time, "YYYY-MM-DD HH:mm:ss");

              // Kiểm tra trùng lặp
              const isOverlapping =
                startTime.isBetween(showStart, showEnd, null, "[)") || // start_time nằm trong khoảng suất cũ
                endTime.isBetween(showStart, showEnd, null, "(]") || // end_time nằm trong khoảng suất cũ
                (startTime.isBefore(showStart) && endTime.isAfter(showEnd)); // Bao trùm suất cũ

              return isOverlapping;
            });
          }
        )

        .test(
          "is-not-in-the-past",
          "Giờ chiếu không được nhỏ hơn giờ hiện tại",
          function (value) {
            if (!value || !formik.values.date) return true;

            const today = dayjs().startOf("day");
            const selectedDate = dayjs(formik.values.date).startOf("day");

            if (selectedDate.isSame(today, "day")) {
              const currentTime = dayjs();
              const startTime = dayjs(
                `${formik.values.date} ${value}`,
                "YYYY-MM-DD HH:mm"
              );
              return startTime.isAfter(currentTime);
            }
            return true;
          }
        ),
    }),

    onSubmit: (values) => {
      console.log(values);
      updateShowtime.mutate({
        url: `/showtimes/${id}`,
        data: values,
      });
    },
  });

  // console.log(showtime);

  useEffect(() => {
    if (formik.values.start_time && formik.values.movie_id) {
      const selectedMovie = movies.find((m) => m.id == formik.values.movie_id);
      if (selectedMovie) {
        const movieDuration = selectedMovie.duration || 0; // Thời lượng phim (phút)
        const startTime = dayjs(
          `${formik.values.date} ${formik.values.start_time}`,
          "YYYY-MM-DD HH:mm"
        );
        const endTime = startTime
          .add(movieDuration + 15, "minute")
          .format("HH:mm");
        formik.setFieldValue("end_time", endTime);
      }
    }
  }, [formik.values.start_time, formik.values.movie_id]);
  const columns = useMemo(() => [
    {
      header: "Thời gian",
      accessorKey: "thoigian",
      enableColumnFilter: false,
      cell: (cell) => {
        return (
          <div>
            {`${dayjs(cell.row.original.start_time).format("HH:mm")}-${dayjs(
              cell.row.original.end_time
            ).format("HH:mm")}`}
          </div>
        );
      },
    },
    {
      header: "Phòng",
      accessorKey: "room.name",
      enableColumnFilter: false,
    },
  ]);
  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Thêm mới suất chiếu" pageTitle="Thêm mới" />
        <Form onSubmit={formik.handleSubmit}>
          <Row>
            <Col xl={8} lg={7}>
              <div>
                <Card>
                  <div className="card-header border-0">
                    <Row className="align-items-center">
                      <Col>
                        <div className="d-flex mb-3">
                          <div className="flex-grow-1">
                            <h5 className="fs-16">Thêm thông tin suất chiếu</h5>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="card-body">
                    <Row>
                      <Col lg={8}>
                        <div className="mb-3">
                          <Label htmlFor="movie_id" className="form-label">
                            Tên phim
                          </Label>
                          <select
                            id="movie_id"
                            name="movie_id"
                            value={formik.values.movie_id || ""}
                            onChange={(e) => {
                              formik.setFieldValue("movie_id", e.target.value);
                              handleSetVersionMovie(e.target.value);
                            }}
                            className="form-select mb-3"
                          >
                            <option value="">--- Chọn phim ---</option>
                            {movies.map((movie) => (
                              <option key={movie.id} value={movie.id}>
                                {movie.name}
                              </option>
                            ))}
                          </select>
                          {formik.errors.movie_id &&
                            formik.touched.movie_id && (
                              <div className="text-danger">
                                {formik.errors.movie_id}
                              </div>
                            )}
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="mb-3">
                          <Label
                            htmlFor="movie_version_id"
                            className="form-label"
                          >
                            Phiên bản phim
                          </Label>
                          <select
                            id="movie_version_id"
                            name="movie_version_id"
                            value={formik.values.movie_version_id || ""}
                            className="form-select mb-3"
                            {...formik.getFieldProps("movie_version_id")}
                          >
                            <option value="">--- phiên bản phim ---</option>
                            {movieVersions?.map((version, index) => (
                              <option key={index} value={version.id}>
                                {version.name}
                              </option>
                            ))}
                          </select>
                          {formik.errors.movie_version_id &&
                            formik.touched.movie_version_id && (
                              <div className="text-danger">
                                {formik.errors.movie_version_id}
                              </div>
                            )}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={4}>
                        <div className="mb-3">
                          <Label htmlFor="branch_id" className="form-label">
                            Chi nhánh
                          </Label>
                          <select
                            disabled
                            id="branch_id"
                            name="branch_id"
                            onChange={(e) => {
                              formik.setFieldValue("branch_id", e.target.value);
                            }}
                            value={formik.values.branch_id}
                            className="form-select mb-3"
                          >
                            <option value="">--- Chọn chi nhánh ---</option>
                            {branches.map((branch) => (
                              <option key={branch.id} value={branch.id}>
                                {branch.name}
                              </option>
                            ))}
                          </select>
                          {formik.errors.branch_id &&
                            formik.touched.branch_id && (
                              <div className="text-danger">
                                {formik.errors.branch_id}
                              </div>
                            )}
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="mb-3">
                          <Label htmlFor="cinema_id" className="form-label">
                            Rạp chiếu
                          </Label>
                          <select
                            disabled
                            onChange={(e) => {
                              formik.setFieldValue("cinema_id", e.target.value);
                            }}
                            id="cinema_id"
                            className="form-select mb-3"
                            value={formik.values.cinema_id}
                          >
                            <option value="">--- Chọn rạp ---</option>
                            {cinemas?.map((cinema) => (
                              <option key={cinema.id} value={cinema.id}>
                                {cinema.name}
                              </option>
                            ))}
                          </select>
                          {formik.errors.cinema_id &&
                            formik.touched.cinema_id && (
                              <div className="text-danger">
                                {formik.errors.cinema_id}
                              </div>
                            )}
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="mb-3">
                          <Label htmlFor="room_id" className="form-label">
                            Tên phòng{" "}
                          </Label>
                          <select
                            value={formik.values.room_id}
                            {...formik.getFieldProps("room_id")}
                            id="room_id"
                            className="form-select mb-3"
                          >
                            {rooms?.map((room) => (
                              <option key={room.id} value={room.id}>
                                {room.name}
                              </option>
                            ))}
                          </select>
                          {formik.errors.room_id && formik.touched.room_id && (
                            <div className="text-danger">
                              {formik.errors.room_id}
                            </div>
                          )}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={4}>
                        <div className="mb-3">
                          <Label htmlFor="date" className="form-label">
                            Ngày khởi chiếu
                          </Label>
                          <Input
                            type="date"
                            id="date"
                            name="date"
                            {...formik.getFieldProps("date")}
                            value={formik.values.date}
                            className="form-control"
                          />
                          {formik.errors.date && formik.touched.date && (
                            <div className="text-danger">
                              {formik.errors.date}
                            </div>
                          )}
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="mb-3">
                          <Label htmlFor="start_time" className="form-label">
                            Giờ chiếu
                          </Label>
                          <Input
                            type="time"
                            className="form-control"
                            id="start_time"
                            name="start_time"
                            {...formik.getFieldProps("start_time")}
                            value={formik.values.start_time}
                          />
                          {formik.errors.start_time &&
                            formik.touched.start_time && (
                              <div className="text-danger">
                                {formik.errors.start_time}
                              </div>
                            )}
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="mb-3">
                          <Label htmlFor="end_time" className="form-label">
                            Giờ kết thúc
                          </Label>
                          <Input
                            type="time"
                            className="form-control"
                            id="end_time"
                            name="end_time"
                            {...formik.getFieldProps("end_time")}
                            value={formik.values.end_time}
                          />
                          {formik.errors.end_time &&
                            formik.touched.end_time && (
                              <div className="text-danger">
                                {formik.errors.end_time}
                              </div>
                            )}
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Card>
              </div>
              <Card>
                <CardHeader>
                  <div className="d-flex gap-3">
                    <Button
                      onClick={() => nav("/admin/showtime")}
                      color="primary"
                    >
                      Danh sách
                    </Button>
                    <Button type="submit" color="primary">
                      Cập nhật
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            </Col>

            <Col xl={4} lg={5}>
              <Card>
                <CardBody>
                  <div className="d-flex">
                    <div className="flex-grow-1">
                      <Row className="justify-content-center ">
                        <Col>
                          <div className="mt-4 mt-md-0">
                            <div>
                              <div className="form-check form-switch form-check-right">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  id="is_active"
                                  defaultChecked={showtime.is_active}
                                  {...formik.getFieldProps("is_active")}
                                />
                                <Label
                                  className="form-check-label"
                                  for="is_active"
                                >
                                  Hoạt động:
                                </Label>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={showtimesDate || []}
                    isAddUserList={false}
                    customPageSize={6}
                    className="custom-header-css"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};
export default Updateshowtime;
