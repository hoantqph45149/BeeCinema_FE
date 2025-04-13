import { useFormik } from "formik";
import { useEffect, useState } from "react";
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

import Flatpickr from "react-flatpickr";

import * as Yup from "yup";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isBetween from "dayjs/plugin/isBetween";

import { showAlert } from "../../../../Components/Common/showAlert";
import { useCRUD, useFetch } from "../../../../Hooks/useCRUD";
import { generateDateRange } from "../../../../utils/CheckDay";
import { useAuthContext } from "../../../../Contexts/auth/UseAuth";

dayjs.extend(isBetween);
dayjs.extend(customParseFormat);

document.title = "Add showtime";
const AddMultipleShowtimes = () => {
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
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [noShowDates, setNoShowDates] = useState([]);
  const [movies, setMovies] = useState([]);
  const [movieVersions, setMovieVersions] = useState([]);
  const [branches, setBranches] = useState([]);
  const [cinemas, setCinemas] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [selectedCinemas, setSelectedCinemas] = useState([]);
  const [isAuto, setIsAuto] = useState(false);

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
      setSelectedCinemas([authUser?.cinema_id]);
    }
  }, [moviesData, branchesData, cinema, authUser?.cinema_id]);

  const handleCheckboxChange = (date, isChecked) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    if (isChecked) {
      setNoShowDates((prev) => [...prev, formattedDate]);
    } else {
      setNoShowDates((prev) => prev.filter((d) => d !== formattedDate));
    }
  };

  const dateList = generateDateRange(startDate, endDate);

  const handleCheckboxChangeCinema = (id, isChecked) => {
    const cinema = cinemas.find((cinema) => cinema.id == id);

    if (isChecked) {
      setSelectedCinemas((prev) => [...prev, cinema.id]);
      setRooms((prev) => [
        ...prev,
        ...cinema.rooms.map((room) => ({
          ...room,
          cinema_name: cinema.name,
        })),
      ]);
    } else {
      setSelectedCinemas((prev) => prev.filter((cinemaId) => cinemaId !== id));
      setRooms((prev) => prev.filter((room) => room.cinema_id !== id));
      // Xóa các phòng thuộc rạp bị bỏ chọn khỏi selectedRooms
      setSelectedRooms((prev) =>
        prev.filter((room) => {
          const roomCinemaId = cinemas.find((c) =>
            c.rooms.some((r) => r.id === room.room_id)
          )?.id;
          return roomCinemaId !== id;
        })
      );
    }
  };

  const handleCheckboxChangeRoom = (id, isChecked) => {
    if (isChecked) {
      setSelectedRooms((prev) => [...prev, { room_id: id }]);
    } else {
      setSelectedRooms((prev) => prev.filter((room) => room.room_id !== id));
    }
  };

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
    } else {
      const branche = branches.find((branche) => branche.id == id);
      setCinemas(branche.cinemas);
      setSelectedCinemas([]);
      setRooms([]);
      setSelectedRooms([]);
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const formik = useFormik({
    initialValues: {
      movie_id: "",
      movie_version_id: "",
      rooms: [],
      is_active: 1,
      exclude_dates: [],
      start_date: "",
      end_date: "",
      auto_generate_showtimes: isAuto,
      start_hour: "",
      end_hour: "",
      showtimes: [{ start_time: "", end_time: "" }],
    },
    validationSchema: Yup.object({
      movie_id: Yup.string().required("Vui lòng chọn phim"),
      movie_version_id: Yup.string().required("Vui lòng chọn phiên bản phim"),
      start_date: Yup.date().required("Vui lòng chọn ngày bắt đầu"),
      end_date: Yup.date().required("Vui lòng chọn ngày kết thúc"),
      start_hour: !isAuto
        ? Yup.string()
        : Yup.string()
            .required("Vui lòng nhập giờ bắt đầu")
            .test(
              "start-time-validation",
              "Giờ bắt đầu phải từ 07:00 trở đi",
              function (value) {
                if (!value) return false;

                const startTime = dayjs(value, "HH:mm");
                const minTime = dayjs("07:00", "HH:mm");

                if (!startTime.isValid()) {
                  return false;
                }

                return startTime.isAfter(minTime) || startTime.isSame(minTime);
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

                    const startDate = this.options.context?.start_date;
                    if (!startDate) return false;

                    const now = dayjs();
                    const nowPlus5Hours = now.add(5, "hour");

                    const selectedDate = dayjs(startDate);
                    const startDateTime = dayjs(
                      `${selectedDate.format("YYYY-MM-DD")} ${value}`,
                      "YYYY-MM-DD HH:mm"
                    );

                    if (selectedDate.isSame(now, "day")) {
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
                ),
              end_time: Yup.string().required("Vui lòng nhập giờ kết thúc"),
            })
          ),
    }),
    onSubmit: (values) => {
      if (!isAuto) {
        delete values.start_hour;
        delete values.end_hour;
      } else {
        delete values.showtimes;
      }

      const data = {
        ...values,
        rooms: selectedRooms,
        cinema_ids: selectedCinemas,
        start_date: dayjs(values.start_date).format("YYYY-MM-DD"),
        end_date: dayjs(values.end_date).format("YYYY-MM-DD"),
        exclude_dates: noShowDates,
      };
      createShowtime.mutate(
        { url: "/showtimes/preview", data: data, shouldShowAlert: false },
        {
          onSuccess: (data) => {
            nav("/admin/showtime/preview", {
              state: {
                showtimes: data.showtimes,
                movie_id: data.movie_id,
                movie_name: data.movie_name,
                movie_image: data.movie_image,
                movie_version_id: data.movie_version_id,
              },
            });
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

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Row>
        <Col>
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
                  <Col lg={12}>
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
                </Row>
                <Row>
                  <Col lg={6}>
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
                  {!authUser.cinema_id && (
                    <Col lg={6}>
                      <div className="mb-3">
                        <Label htmlFor="branch_id" className="form-label">
                          Chi nhánh
                        </Label>
                        <select
                          id="branch_id"
                          name="branch_id"
                          onChange={(e) => {
                            handleSetCinemaWithRoom(e.target.value);
                          }}
                          className="form-select mb-3"
                        >
                          <option value="">--- Chọn chi nhánh ---</option>
                          {branches.map((branch) => (
                            <option key={branch.id} value={branch.id}>
                              {branch.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </Col>
                  )}
                  {!authUser.cinema_id && (
                    <Col lg={6}>
                      <Card>
                        <CardHeader>
                          <Label
                            className="form-check-label fw-bold d-flex align-items-center gap-2"
                            htmlFor="check-all-cinemas"
                            style={{
                              cursor: "pointer",
                              color:
                                selectedCinemas.length === cinemas.length &&
                                cinemas.length > 0
                                  ? "#007bff"
                                  : "#333",
                            }}
                          >
                            <Input
                              className="form-check-input me-2"
                              type="checkbox"
                              id="check-all-cinemas"
                              ref={(el) => {
                                if (el) {
                                  el.indeterminate =
                                    selectedCinemas.length > 0 &&
                                    selectedCinemas.length < cinemas.length;
                                }
                              }}
                              checked={
                                selectedCinemas.length === cinemas.length &&
                                cinemas.length > 0
                              }
                              onChange={(e) => {
                                const checked = e.target.checked;
                                if (checked) {
                                  const allCinemaIds = cinemas.map(
                                    (cinema) => cinema.id
                                  );
                                  setSelectedCinemas(allCinemaIds);
                                  const allRooms = cinemas.flatMap((cinema) =>
                                    cinema.rooms.map((room) => ({
                                      ...room,
                                      cinema_name: cinema.name,
                                    }))
                                  );
                                  setRooms(allRooms);
                                } else {
                                  setSelectedCinemas([]);
                                  setRooms([]);
                                  setSelectedRooms([]);
                                }
                              }}
                            />
                            <span>
                              {selectedCinemas.length === cinemas.length &&
                              cinemas.length > 0
                                ? "Bỏ chọn tất cả rạp"
                                : selectedCinemas.length > 0
                                ? `Đã chọn ${selectedCinemas.length}/${cinemas.length} rạp`
                                : "Chọn tất cả rạp chiếu"}
                            </span>
                            {selectedCinemas.length > 0 && (
                              <span className="badge bg-primary">
                                {selectedCinemas.length}
                              </span>
                            )}
                          </Label>
                        </CardHeader>
                        <CardBody>
                          {cinemas.length > 0 ? (
                            cinemas.map((cinema) => (
                              <div key={cinema.id} className="form-check mb-3">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  id={`cinema-${cinema.id}`}
                                  value={cinema.id}
                                  checked={selectedCinemas.includes(cinema.id)}
                                  onChange={(e) => {
                                    handleCheckboxChangeCinema(
                                      cinema.id,
                                      e.target.checked
                                    );
                                  }}
                                />
                                <Label
                                  className="form-check-label"
                                  htmlFor={`cinema-${cinema.id}`}
                                >
                                  {cinema.name}
                                </Label>
                              </div>
                            ))
                          ) : (
                            <div>Vui lòng chọn chi nhánh.</div>
                          )}
                        </CardBody>
                      </Card>
                    </Col>
                  )}
                  <Col lg={6}>
                    <Card>
                      <CardHeader>
                        <Label
                          className="form-check-label fw-bold d-flex align-items-center gap-2"
                          htmlFor="check-all-rooms"
                          style={{
                            cursor: "pointer",
                            color:
                              selectedRooms.length === rooms.length &&
                              rooms.length > 0
                                ? "#007bff"
                                : "#333",
                          }}
                        >
                          <Input
                            className="form-check-input me-2"
                            type="checkbox"
                            id="check-all-rooms"
                            ref={(el) => {
                              if (el) {
                                // Thêm trạng thái indeterminate
                                el.indeterminate =
                                  selectedRooms.length > 0 &&
                                  selectedRooms.length < rooms.length;
                              }
                            }}
                            checked={
                              selectedRooms.length === rooms.length &&
                              rooms.length > 0
                            }
                            onChange={(e) => {
                              const checked = e.target.checked;
                              if (checked) {
                                const allRooms = rooms.map((room) => ({
                                  room_id: room.id,
                                }));
                                setSelectedRooms(allRooms);
                              } else {
                                setSelectedRooms([]);
                              }
                            }}
                          />
                          <span>
                            {selectedRooms.length === rooms.length &&
                            rooms.length > 0
                              ? "Bỏ chọn tất cả phòng"
                              : selectedRooms.length > 0
                              ? `Đã chọn ${selectedRooms.length}/${rooms.length} phòng`
                              : "Chọn tất cả phòng chiếu"}
                          </span>
                          {selectedRooms.length > 0 && (
                            <span className="badge bg-primary">
                              {selectedRooms.length}
                            </span>
                          )}
                        </Label>
                      </CardHeader>
                      <CardBody>
                        {rooms.length > 0 ? (
                          rooms.map((room) => (
                            <div className="form-check mb-3" key={room.id}>
                              <Input
                                className="form-check-input"
                                type="checkbox"
                                id={`room-${room.id}`}
                                value={room.id}
                                checked={selectedRooms.some(
                                  (r) => r.room_id === room.id
                                )}
                                onChange={(e) => {
                                  handleCheckboxChangeRoom(
                                    room.id,
                                    e.target.checked
                                  );
                                }}
                              />
                              <Label
                                className="form-check-label fw-semibold d-flex align-items-center gap-1"
                                htmlFor={`room-${room.id}`}
                              >
                                {room.name}
                                <span className="badge bg-dark text-white fs-12">
                                  Rạp {room.cinema_name}
                                </span>
                              </Label>
                            </div>
                          ))
                        ) : (
                          <div>Vui lòng chọn rạp chiếu.</div>
                        )}
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
                    <div className="mt-3">
                      <Label className="form-label mb-0">Ngày bắt đầu</Label>
                      <Flatpickr
                        className="form-control"
                        placeholder="Chọn ngày bắt đầu"
                        options={{
                          dateFormat: "Y-m-d",
                          minDate: "today",
                        }}
                        value={startDate}
                        onChange={([date]) => {
                          setStartDate(date);
                          formik.setFieldValue("start_date", date);
                        }}
                      />
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="mt-3">
                      <Label className="form-label mb-0">Ngày kết thúc</Label>
                      <Flatpickr
                        className="form-control"
                        placeholder="Chọn ngày kết thúc"
                        options={{
                          dateFormat: "Y-m-d",
                          minDate: startDate || "today",
                        }}
                        value={endDate}
                        onChange={([date]) => {
                          setEndDate(date);
                          formik.setFieldValue("end_date", date);
                        }}
                      />
                    </div>
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Card>
                    <CardHeader>
                      <Label className="form-check-label" htmlFor="formCheck6">
                        Chọn ngày không tạo suất chiếu
                      </Label>
                    </CardHeader>
                    <CardBody>
                      <Row>
                        {dateList.length > 0 ? (
                          dateList.map((date, index) => {
                            const formattedDate = date.toLocaleDateString(
                              "vi-VN",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              }
                            );
                            return (
                              <Col lg={4} key={index}>
                                <div className="form-check mb-3">
                                  <Input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`formCheck_${index}`}
                                    onChange={(e) =>
                                      handleCheckboxChange(
                                        date,
                                        e.target.checked
                                      )
                                    }
                                  />
                                  <Label
                                    className="form-check-label fw-semibold d-flex align-items-center gap-1"
                                    htmlFor={`formCheck_${index}`}
                                  >
                                    {formattedDate}
                                  </Label>
                                </div>
                              </Col>
                            );
                          })
                        ) : (
                          <Col>
                            <p>Vui lòng chọn ngày bắt đầu và ngày kết thúc.</p>
                          </Col>
                        )}
                      </Row>
                    </CardBody>
                  </Card>
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
                    Tự động tạo suất chiếu
                    <p className="text-muted">
                      (Hệ thống sẽ tự động tạo suất chiếu trong khoảng thời gian
                      bạn chọn)
                    </p>
                  </Label>
                </div>

                <Row>
                  {!isAuto && (
                    <Col lg={4} className="mb-3">
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
                    </Col>
                  )}
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
                        const prevEndTime =
                          index > 0
                            ? formik.values.showtimes[index - 1].end_time
                            : null;
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
                                  className={`form-control ${
                                    `${formik.touched.start_time}-${index}` &&
                                    formik.errors.showtimes?.[index]?.start_time
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  value={showtime.start_time || ""}
                                  onChange={(e) => {
                                    const newStartTime = e.target.value;

                                    if (
                                      prevEndTime &&
                                      dayjs(newStartTime, "HH:mm").isBefore(
                                        dayjs(prevEndTime, "HH:mm")
                                      )
                                    ) {
                                      formik.setFieldError(
                                        `showtimes.${index}.start_time`,
                                        "Giờ bắt đầu phải lớn hơn giờ kết thúc của suất trước!"
                                      );
                                      return;
                                    }

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
                                {`${formik.touched.start_time}-${index}` &&
                                  formik.errors.showtimes?.[index]
                                    ?.start_time && (
                                    <div className="invalid-feedback">
                                      {
                                        formik.errors.showtimes[index]
                                          .start_time
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
                <Button type="submit" color="primary">
                  Xuất bản
                </Button>
              </div>
            </CardHeader>
          </Card>
        </Col>
      </Row>
    </Form>
  );
};
export default AddMultipleShowtimes;
