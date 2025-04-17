import { useFormik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  Input,
  Label,
  Row,
} from "reactstrap";
import * as Yup from "yup";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isBetween from "dayjs/plugin/isBetween";

import TableContainer from "../../../../Components/Common/TableContainer";
import { useAuthContext } from "../../../../Contexts/auth/UseAuth";
import { useCRUD, useFetch } from "../../../../Hooks/useCRUD";
import { showAlert } from "../../../../Components/Common/showAlert";

dayjs.extend(isBetween);
dayjs.extend(customParseFormat);

document.title = "Add showtime";
const AddShowPerDay = () => {
  const { authUser } = useAuthContext();
  const { create: createShowtime } = useCRUD(["showtimes"]);
  const { data: moviesData } = useFetch(["movies"], "/movies");
  const { data: branchesData } = useFetch(["branches"], "/branches/active");
  const { data: cinema } = useFetch(
    ["cinemas", authUser?.cinema_id],
    `/cinemas/${authUser?.cinema_id}`,
    {
      enabled: !!authUser?.cinema_id,
    }
  );

  const nav = useNavigate();
  const [movies, setMovies] = useState([]);
  const [movieVersions, setMovieVersions] = useState([]);
  const [branches, setBranches] = useState([]);
  const [cinemas, setCinemas] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [showtimesDate, setShowtimesDate] = useState([]);
  const [filterShowtimes, setFilterShowtimes] = useState({
    branch_id: "",
    cinema_id: "",
    room_id: "",
    date: "",
  });
  const [isAuto, setIsAuto] = useState(false);

  const finalFilter = {
    ...filterShowtimes,
    cinema_id: authUser?.cinema_id || filterShowtimes?.cinema_id,
    branch_id: cinema?.branch_id || filterShowtimes?.branch_id,
  };

  const { data: showtimeData } = useFetch(
    ["showtimes-by-filter", finalFilter],
    finalFilter &&
      finalFilter.branch_id &&
      finalFilter.cinema_id &&
      finalFilter.room_id &&
      finalFilter.date
      ? `/showtimes?branch_id=${finalFilter.branch_id}&cinema_id=${finalFilter.cinema_id}&room_id=${finalFilter.room_id}&date=${finalFilter.date}`
      : null,
    {
      enabled:
        !!finalFilter?.branch_id &&
        !!finalFilter?.cinema_id &&
        !!finalFilter?.room_id &&
        !!finalFilter?.date,
    }
  );

  useEffect(() => {
    if (showtimeData) {
      const sorted = showtimeData.showtimes.sort((a, b) =>
        dayjs(a.start_time, "YYYY-MM-DD HH:mm:ss").diff(
          dayjs(b.start_time, "YYYY-MM-DD HH:mm:ss")
        )
      );
      setShowtimesDate(sorted);
    }
  }, [showtimeData]);

  useEffect(() => {
    if (moviesData && branchesData) {
      setMovies(moviesData.data);
      setBranches(branchesData.branches);
    }
    if (authUser?.cinema_id && branchesData && cinema) {
      const rooms = branchesData.branches
        .find((branche) => branche.id == cinema?.branch_id)
        .cinemas.find((cinema) => cinema.id == authUser?.cinema_id).rooms;
      setRooms(rooms);
    }
  }, [moviesData, branchesData, cinema, authUser?.cinema_id]);

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

  const handleSetCinemaWithRoom = (id) => {
    if (id === "") {
      setCinemas([]);
      setRooms([]);
    } else {
      const branche = branches.find((branche) => branche.id == id);
      setCinemas(branche.cinemas);
      setRooms(branche.cinemas[0].rooms);
    }
  };

  const handleSetRoom = (id) => {
    const cinema = cinemas.find((cinema) => cinema.id == id);
    setRooms(cinema.rooms);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const formik = useFormik({
    initialValues: {
      movie_id: "",
      movie_version_id: "",
      branch_id: "",
      cinema_id: "",
      room_id: "",
      date: "",
      auto_generate_showtimes: isAuto,
      start_hour: "",
      end_hour: "",
      showtimes: [{ start_time: "", end_time: "" }],
    },
    validationSchema: Yup.object({
      movie_id: Yup.string().required("Vui lòng chọn phim"),
      movie_version_id: Yup.string().required("Vui lòng chọn phiên bản phim"),
      branch_id: authUser.cinema_id
        ? ""
        : Yup.string().required("Vui lòng chọn chi nhánh"),
      cinema_id: authUser.cinema_id
        ? ""
        : Yup.string().required("Vui lòng chọn rạp"),
      room_id: Yup.string().required("Vui lòng chọn phòng"),
      date: Yup.date()
        .required("Vui lòng chọn ngày khởi chiếu")
        .min(today, "Ngày khởi chiếu không được nhỏ hơn ngày hiện tại"),
      start_hour: !isAuto
        ? Yup.string()
        : Yup.string()
            .required("Vui lòng nhập giờ bắt đầu")
            .test(
              "start-after-7am",
              "Giờ bắt đầu phải từ 07:00 sáng trở đi",
              function (value) {
                if (!value) return false;
                const time = dayjs(value, "HH:mm");
                const minTime = dayjs("07:00", "HH:mm");
                return time.isSame(minTime) || time.isAfter(minTime);
              }
            )
            .test(
              "start-time-validation",
              "Giờ bắt đầu phải lớn hơn hiện tại ít nhất 5h",
              function (value) {
                if (!value) return false;
                const { date } = this.parent;
                if (!date) return false;
                const formattedDate = dayjs(date).format("YYYY-MM-DD");
                const startTime = dayjs(
                  `${formattedDate} ${value}`,
                  "YYYY-MM-DD HH:mm"
                );
                if (dayjs(formattedDate).isSame(dayjs(), "day")) {
                  return startTime.isAfter(dayjs().add(5, "hour"));
                }
                return true;
              }
            ),

      end_hour: !isAuto
        ? Yup.string()
        : Yup.string()
            .required("Vui lòng nhập giờ kết thúc")
            .test(
              "end-before-midnight",
              "Giờ kết thúc không được quá 23:59",
              function (value) {
                if (!value) return false;
                const endTime = dayjs(value, "HH:mm");
                const latestTime = dayjs("23:59", "HH:mm");
                return (
                  endTime.isSame(latestTime) || endTime.isBefore(latestTime)
                );
              }
            )
            .test(
              "duration-at-least-12h",
              "Tổng thời gian phải >= 12 giờ",
              function (value) {
                const { start_hour, date } = this.parent;
                if (!date || !start_hour || !value) return false;

                const formattedDate = dayjs(date).format("YYYY-MM-DD");

                const startTime = dayjs(
                  `${formattedDate} ${start_hour}`,
                  "YYYY-MM-DD HH:mm",
                  true
                );
                const endTime = dayjs(
                  `${formattedDate} ${value}`,
                  "YYYY-MM-DD HH:mm",
                  true
                );

                if (!startTime.isValid() || !endTime.isValid()) {
                  return false;
                }

                return endTime.diff(startTime, "hour") >= 12;
              }
            ),

      showtimes: isAuto
        ? Yup.array()
        : Yup.array().of(
            Yup.object().shape({
              start_time: Yup.string()
                .required("Vui lòng nhập giờ bắt đầu")
                .test(
                  "is-after-7am",
                  "Giờ bắt đầu không được trước 07:00 sáng",
                  function (value) {
                    if (!value) return false;
                    const time = dayjs(value, "HH:mm");
                    const minTime = dayjs("07:00", "HH:mm");
                    return time.isSame(minTime) || time.isAfter(minTime);
                  }
                )
                .test(
                  "is-after-now",
                  "Giờ bắt đầu phải lớn hơn giờ hiện tại ít nhất 5 tiếng",
                  function (value) {
                    if (!value) return false;

                    const selectedDate = this.options.context?.date;
                    if (!selectedDate) return false;

                    const now = dayjs();
                    const nowPlus5Hours = now.add(5, "hour");

                    const startDateTime = dayjs(
                      `${selectedDate} ${value}`,
                      "YYYY-MM-DD HH:mm"
                    );

                    if (dayjs(selectedDate).isSame(now, "day")) {
                      return startDateTime.isAfter(nowPlus5Hours);
                    }

                    return true;
                  }
                )
                .test(
                  "is-15min-after-prev",
                  "Mỗi suất chiếu phải cách nhau ít nhất 15 phút",
                  function (value) {
                    const { path, parent, options } = this;
                    const index = Number(path.match(/\d+/)?.[0]);
                    const prevShowtimes = options.context?.showtimes || [];

                    if (index === 0) return true;

                    const prevEndTime = prevShowtimes[index - 1]?.end_time;
                    if (!prevEndTime) return true;

                    const currentStart = dayjs(value, "HH:mm");
                    const previousEnd = dayjs(prevEndTime, "HH:mm");

                    return currentStart.diff(previousEnd, "minute") >= 15;
                  }
                )
                .test(
                  "no-overlap-with-existing",
                  "Suất chiếu không được trùng với suất chiếu đã có",
                  function (value) {
                    const { parent } = this;
                    if (!value) return true;

                    const selectedDate = this.options.context?.date;
                    if (!selectedDate) return false;

                    const currentStart = dayjs(
                      `${selectedDate} ${value}`,
                      "YYYY-MM-DD HH:mm"
                    );
                    const currentEnd = dayjs(
                      `${selectedDate} ${parent.end_time}`,
                      "YYYY-MM-DD HH:mm"
                    );

                    return showtimesDate.every((showtime) => {
                      const existingStart = dayjs(
                        showtime.start_time,
                        "YYYY-MM-DD HH:mm:ss"
                      );
                      const existingEnd = dayjs(
                        showtime.end_time,
                        "YYYY-MM-DD HH:mm:ss"
                      );

                      const isOverlap =
                        currentStart.isSame(existingStart) ||
                        currentStart.isBetween(
                          existingStart,
                          existingEnd,
                          null,
                          "[]"
                        ) ||
                        currentEnd.isSame(existingEnd) ||
                        currentEnd.isBetween(
                          existingStart,
                          existingEnd,
                          null,
                          "[]"
                        ) ||
                        existingStart.isBetween(
                          currentStart,
                          currentEnd,
                          null,
                          "[]"
                        ) ||
                        existingEnd.isBetween(
                          currentStart,
                          currentEnd,
                          null,
                          "[]"
                        ) ||
                        (currentStart.isSame(existingStart) &&
                          currentEnd.isSame(existingEnd));

                      return !isOverlap;
                    });
                  }
                )
                .test(
                  "is-15min-gap-with-existing",
                  "Suất chiếu phải cách các suất đã có ít nhất 15 phút",
                  function (value) {
                    const { parent } = this;
                    if (!value || !parent?.end_time) return true;

                    const selectedDate = this.options.context?.date;
                    if (!selectedDate) return false;

                    const currentStart = dayjs(
                      `${selectedDate} ${value}`,
                      "YYYY-MM-DD HH:mm"
                    );
                    const currentEnd = dayjs(
                      `${selectedDate} ${parent.end_time}`,
                      "YYYY-MM-DD HH:mm"
                    );

                    return showtimesDate.every((showtime) => {
                      const existingStart = dayjs(
                        showtime.start_time,
                        "YYYY-MM-DD HH:mm:ss"
                      );
                      const existingEnd = dayjs(
                        showtime.end_time,
                        "YYYY-MM-DD HH:mm:ss"
                      );

                      // Nếu cách nhau ít hơn 15 phút thì KHÔNG hợp lệ
                      const diffStart = Math.abs(
                        currentStart.diff(existingEnd, "minute")
                      );
                      const diffEnd = Math.abs(
                        currentEnd.diff(existingStart, "minute")
                      );

                      return diffStart >= 15 && diffEnd >= 15;
                    });
                  }
                ),
              end_time: Yup.string().required("Vui lòng nhập giờ kết thúc"),
            })
          ),
    }),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      if (authUser.cinema_id) {
        values.cinema_id = authUser.cinema_id;
        values.branch_id = cinema.branch_id;
      }
      createShowtime.mutate(
        { url: "/add-showtime-per-day", data: values },
        {
          onSuccess: () => {
            nav("/admin/showtime");
            formik.resetForm();
          },
        }
      );
    },
  });

  useEffect(() => {
    const movie = movies.find((movie) => movie.id == formik.values.movie_id);
    if (!movie) return;

    const movieDuration = movie.duration;

    const updatedShowtimes = formik.values.showtimes.map((showtime, index) => {
      const startTime = showtime.start_time;
      if (!startTime) return showtime;

      const startTimeObj = dayjs(startTime, "HH:mm");
      const endTime = startTimeObj
        .add(movieDuration, "minute")
        .add(15, "minute");

      return { ...showtime, end_time: endTime.format("HH:mm") };
    });

    formik.setFieldValue("showtimes", updatedShowtimes);
  }, [formik.values.movie_id]);

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
                      {formik.errors.movie_id && formik.touched.movie_id && (
                        <div className="text-danger">
                          {formik.errors.movie_id}
                        </div>
                      )}
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="mb-3">
                      <Label htmlFor="movie_version_id" className="form-label">
                        Phiên bản phim
                      </Label>
                      <select
                        id="movie_version_id"
                        name="movie_version_id"
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
                  {!authUser.cinema_id && (
                    <>
                      <Col lg={4}>
                        <div className="mb-3">
                          <Label htmlFor="branch_id" className="form-label">
                            Chi nhánh
                          </Label>
                          <select
                            id="branch_id"
                            name="branch_id"
                            onChange={(e) => {
                              formik.setFieldValue("branch_id", e.target.value);
                              handleSetCinemaWithRoom(e.target.value);
                              setFilterShowtimes({
                                ...filterShowtimes,
                                branch_id: e.target.value,
                              });
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
                            onChange={(e) => {
                              formik.setFieldValue("cinema_id", e.target.value);
                              handleSetRoom(e.target.value);
                              setFilterShowtimes({
                                ...filterShowtimes,
                                cinema_id: e.target.value,
                              });
                            }}
                            id="cinema_id"
                            className="form-select mb-3"
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
                    </>
                  )}
                  <Col lg={4}>
                    <div className="mb-3">
                      <Label htmlFor="room_id" className="form-label">
                        Tên phòng{" "}
                      </Label>
                      <select
                        onChange={(e) => {
                          formik.setFieldValue("room_id", e.target.value);
                          setFilterShowtimes({
                            ...filterShowtimes,
                            room_id: e.target.value,
                          });
                        }}
                        id="room_id"
                        className="form-select mb-3"
                      >
                        <option value="">--- Chọn phòng ---</option>
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
                  <Col lg={8}>
                    <div className="mb-3">
                      <Label htmlFor="date" className="form-label">
                        Ngày khởi chiếu
                      </Label>
                      <Input
                        type="date"
                        id="date"
                        name="date"
                        onChange={(e) => {
                          formik.setFieldValue("date", e.target.value);
                          setFilterShowtimes({
                            ...filterShowtimes,
                            date: e.target.value,
                          });
                        }}
                        value={formik.values.date}
                        className="form-control"
                      />
                      {formik.errors.date && formik.touched.date && (
                        <div className="text-danger">{formik.errors.date}</div>
                      )}
                    </div>
                  </Col>
                  {!isAuto && (
                    <Col lg={4}>
                      <div>
                        <Button
                          onClick={() => {
                            const currentShowtimes = formik.values.showtimes;

                            const lastShowtime =
                              currentShowtimes[currentShowtimes.length - 1];

                            const newStartTime = lastShowtime
                              ? dayjs(lastShowtime.end_time, "HH:mm")
                                  .add(15, "minute")
                                  .format("HH:mm")
                              : "";

                            const movie = movies.find(
                              (movie) => movie.id == formik.values.movie_id
                            );
                            const movieDuration = movie?.duration || 0;

                            const startTimeObj = dayjs(newStartTime, "HH:mm");
                            const newEndTimeObj = startTimeObj
                              .add(movieDuration, "minute")
                              .add(15, "minute");

                            // Check nếu vượt quá 24:00 thì không thêm nữa
                            const isPastMidnight = newEndTimeObj.isAfter(
                              dayjs("24:00", "HH:mm")
                            );
                            if (isPastMidnight) {
                              showAlert(
                                "",
                                "Suất chiếu vượt quá 12h đêm, không thể thêm nữa!",
                                "warning"
                              );
                              return;
                            }

                            const endTime = newEndTimeObj.format("HH:mm");

                            formik.setFieldValue("showtimes", [
                              ...currentShowtimes,
                              {
                                start_time: newStartTime,
                                end_time: endTime,
                              },
                            ]);
                          }}
                          color="primary"
                          className="mt-4"
                        >
                          Thêm giờ chiếu
                        </Button>
                      </div>
                    </Col>
                  )}
                </Row>
                <div className="form-check py-2">
                  <Input
                    className="form-check-input"
                    type="checkbox"
                    id="auto_generate_showtimes"
                    onChange={() => {
                      setIsAuto(!isAuto);
                      formik.setFieldValue("auto_generate_showtimes", !isAuto);
                    }}
                  />{" "}
                  <Label
                    className="form-check-label"
                    for="auto_generate_showtimes"
                  >
                    Tự động tạo xuất chiếu trong ngày
                  </Label>
                </div>
                <Row>
                  {isAuto ? (
                    <>
                      <Col lg={6}>
                        <div className="mb-3">
                          <Label htmlFor="start_hour" className="form-label">
                            Giờ Mở Cửa
                          </Label>
                          <Input
                            type="time"
                            id="start_hour"
                            name="start_hour"
                            className="form-control"
                            {...formik.getFieldProps("start_hour")}
                          />
                          {formik.touched.start_hour &&
                            formik.errors.start_hour && (
                              <div className="text-danger">
                                {formik.errors.start_hour}
                              </div>
                            )}
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mb-3">
                          <Label htmlFor="end_hour" className="form-label">
                            Giờ Đóng Cửa
                          </Label>
                          <Input
                            type="time"
                            className="form-control"
                            id="end_hour"
                            {...formik.getFieldProps("end_hour")}
                          />
                          {formik.touched.end_hour &&
                            formik.errors.end_hour && (
                              <div className="text-danger">
                                {formik.errors.end_hour}
                              </div>
                            )}
                        </div>
                      </Col>
                    </>
                  ) : (
                    <>
                      {formik.values.showtimes?.map((showtime, index) => {
                        return (
                          <Row key={index}>
                            <Col lg={5}>
                              <div className="mb-3">
                                <Label
                                  htmlFor={`giochieu-${index}`}
                                  className="form-label"
                                >
                                  Giờ Chiếu
                                </Label>
                                <Input
                                  type="time"
                                  className="form-control"
                                  value={showtime.start_time || ""}
                                  onChange={(e) => {
                                    const newStartTime = e.target.value;

                                    // Tính toán giờ kết thúc
                                    const movie = movies.find(
                                      (movie) =>
                                        movie.id == formik.values.movie_id
                                    );
                                    const movieDuration = movie?.duration || 0;

                                    const calculatedEndTime = dayjs(
                                      newStartTime,
                                      "HH:mm"
                                    )
                                      .add(movieDuration, "minute")
                                      .add(15, "minute")
                                      .format("HH:mm");

                                    formik.setValues({
                                      ...formik.values,
                                      showtimes: formik.values.showtimes.map(
                                        (s, i) =>
                                          i === index
                                            ? {
                                                ...s,
                                                start_time: newStartTime,
                                                end_time: calculatedEndTime,
                                              }
                                            : s
                                      ),
                                    });
                                  }}
                                  onBlur={formik.handleBlur}
                                  id={`start_time-${index}`}
                                />
                                {formik.errors.showtimes?.[index]
                                  ?.start_time && (
                                  <div className="text-danger">
                                    {
                                      formik.errors.showtimes?.[index]
                                        ?.start_time
                                    }
                                  </div>
                                )}
                              </div>
                            </Col>

                            <Col lg={5}>
                              <div className="mb-3">
                                <Label
                                  htmlFor={`end_time-${index}`}
                                  className="form-label"
                                >
                                  Giờ Kết Thúc
                                </Label>
                                <Input
                                  type="time"
                                  className="form-control"
                                  value={showtime.end_time || ""}
                                  readOnly
                                  id={`end_time-${index}`}
                                />
                              </div>
                            </Col>

                            {formik.values.showtimes.length > 1 && (
                              <Col lg={2}>
                                <div>
                                  <Button
                                    onClick={() =>
                                      formik.setFieldValue(
                                        "showtimes",
                                        formik.values.showtimes.filter(
                                          (_, i) => i !== index
                                        )
                                      )
                                    }
                                    color="danger"
                                    className="mt-4"
                                  >
                                    Xóa
                                  </Button>
                                </div>
                              </Col>
                            )}
                          </Row>
                        );
                      })}
                    </>
                  )}
                </Row>
              </div>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <div className="d-flex gap-3">
                <Button onClick={() => nav("/admin/showtime")} color="primary">
                  Danh sách
                </Button>
                <Button  type="submit" color="primary">
                  Xuất bản
                </Button>
              </div>
            </CardHeader>
          </Card>
        </Col>

        <Col xl={4} lg={5}>
          <Card>
            <CardHeader>
              <div className="d-flex mb-3">
                <div className="flex-grow-1">
                  <h5 className="fs-16">Suất chiếu đang có </h5>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <TableContainer
                columns={columns}
                data={showtimesDate || []}
                isAddUserList={false}
                customPageSize={10}
                className="custom-header-css"
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Form>
  );
};
export default AddShowPerDay;
