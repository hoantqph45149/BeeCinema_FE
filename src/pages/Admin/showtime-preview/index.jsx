import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { Film, Clock, ChevronDown, ChevronUp } from "lucide-react";
import {
  Button,
  Card,
  CardBody,
  Container,
  Accordion,
  AccordionItem,
  Collapse,
  CardHeader,
  Row,
  Col,
  TabContent,
  TabPane,
  ListGroup,
  ListGroupItem,
  Badge,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { useLocation, useNavigate } from "react-router-dom";
import { useCRUD } from "../../../Hooks/useCRUD";
import { showAlert } from "../../../Components/Common/showAlert";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const ShowtimePreview = () => {
  const location = useLocation();
  const { showtimes, movie_id, movie_version_id, movie_name, movie_image } =
    location.state || {};
  const nav = useNavigate();
  const { create } = useCRUD(["showtimes"]);
  const [eventsByRoom, setEventsByRoom] = useState({});
  const [generatedShowtimes, setGeneratedShowtimes] = useState({});
  const [openDate, setOpenDate] = useState(null);
  const [openCinema, setOpenCinema] = useState({});
  const [activeTab, setActiveTab] = useState("1");
  const [isOpen, setIsOpen] = useState(true);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const toggleCollapse = () => setIsOpen(!isOpen);
  // Thêm state để lưu thống kê
  const [stats, setStats] = useState({
    byDate: {},
    byCinema: {},
    totalGenerated: 0,
  });

  const updateOverlapping = (events) => {
    return events.map((event, index) => {
      const overlapping = events.some(
        (e, i) => i !== index && e.start < event.end && e.end > event.start
      );
      return { ...event, overlapping };
    });
  };

  const groupShowtimesByDateAndCinema = () => {
    const grouped = {};
    showtimes.forEach((room) => {
      const { date, cinema_id, room_id, cinema_name } = room;
      if (!grouped[date]) grouped[date] = {};
      if (!grouped[date][cinema_id])
        grouped[date][cinema_id] = { rooms: [], cinema_name };
      grouped[date][cinema_id].rooms.push(room);
    });
    return grouped;
  };

  // Hàm tính toán thống kê
  const calculateStats = (eventsByRoom) => {
    const byDate = {};
    const byCinema = {};
    let totalGenerated = 0;

    Object.entries(eventsByRoom).forEach(([key, events]) => {
      const [date, roomId] = key.split("|");
      const room = showtimes.find(
        (r) => r.date === date && r.room_id === Number(roomId)
      );
      const cinemaId = room.cinema_id;
      const cinemaName = room.cinema_name;
      const generatedCount = events.filter(
        (e) => e.type === "generated"
      ).length;

      if (!byDate[date]) byDate[date] = { total: 0, cinemas: {} };
      byDate[date].total += generatedCount;
      if (!byDate[date].cinemas[cinemaId])
        byDate[date].cinemas[cinemaId] = { name: cinemaName, count: 0 };
      byDate[date].cinemas[cinemaId].count += generatedCount;

      if (!byCinema[cinemaId])
        byCinema[cinemaId] = { name: cinemaName, count: 0 };
      byCinema[cinemaId].count += generatedCount;

      totalGenerated += generatedCount;
    });

    return { totalGenerated, byDate, byCinema };
  };

  useEffect(() => {
    const initialEvents = {};
    const initialGeneratedShowtimes = {};

    showtimes.forEach((room) => {
      const key = `${room.date}|${room.room_id}`;
      const formattedEvents = room.showtimes.map((showtime, index) => ({
        id: index,
        title: `Suất ${index + 1} (${showtime.type})`,
        start: moment(
          `${room.date} ${showtime.start_time}`,
          "YYYY-MM-DD HH:mm"
        ).toDate(),
        end: moment(
          `${room.date} ${showtime.end_time}`,
          "YYYY-MM-DD HH:mm"
        ).toDate(),
        type: showtime.type,
        overlapping: showtime.overlapping,
        roomKey: key,
      }));
      const eventsWithOverlap = updateOverlapping(formattedEvents);
      initialEvents[key] = eventsWithOverlap;

      const generated = eventsWithOverlap
        .filter((e) => e.type === "generated")
        .map((event) => ({
          start_time: moment(event.start).format("HH:mm"),
          end_time: moment(event.end).format("HH:mm"),
          type: event.type,
          overlapping: event.overlapping,
        }));
      if (generated.length > 0) {
        initialGeneratedShowtimes[key] = generated;
      }
    });

    setEventsByRoom(initialEvents);
    setGeneratedShowtimes(initialGeneratedShowtimes);
    setStats(calculateStats(initialEvents));
  }, [showtimes]);

  const updateGeneratedShowtimes = (key, updatedEvents) => {
    const generated = updatedEvents
      .filter((e) => e.type === "generated")
      .map((event) => ({
        start_time: moment(event.start).format("HH:mm"),
        end_time: moment(event.end).format("HH:mm"),
        type: event.type,
        overlapping: event.overlapping,
      }));
    if (generated.length > 0) {
      setGeneratedShowtimes((prev) => ({ ...prev, [key]: generated }));
    } else {
      setGeneratedShowtimes((prev) => {
        const newState = { ...prev };
        delete newState[key];
        return newState;
      });
    }
    setStats(calculateStats({ ...eventsByRoom, [key]: updatedEvents }));
  };

  const handleDeleteEvent = (event) => {
    if (event.type !== "generated") {
      alert("Chỉ có thể xóa suất chiếu được tạo (generated)!");
      return;
    }

    const key = event.roomKey;
    const updatedEvents = eventsByRoom[key].filter((e) => e.id !== event.id);
    const eventsWithOverlap = updateOverlapping(updatedEvents);

    setEventsByRoom((prev) => ({ ...prev, [key]: eventsWithOverlap }));
    updateGeneratedShowtimes(key, eventsWithOverlap);
  };

  const eventStyleGetter = (event) => {
    const backgroundColor = event.overlapping
      ? event.type === "generated"
        ? "#ff4500"
        : "#ff69b4"
      : event.type === "existing"
      ? "#d3d3d3"
      : "#3174ad";
    return {
      style: {
        backgroundColor,
        color: "white",
        borderRadius: "0px",
        border: "none",
      },
    };
  };

  const CustomEvent = ({ event }) => (
    <div>
      <span>{event.title}</span>
      {event.type === "generated" && (
        <Button
          color="danger"
          size="sm"
          style={{ marginLeft: 10 }}
          onClick={() => handleDeleteEvent(event)}
        >
          Xóa
        </Button>
      )}
    </div>
  );

  const handleEventDrop = ({ event, start, end }) => {
    if (event.type !== "generated") return;

    const key = event.roomKey;
    const minTime = moment(key.split("|")[0])
      .startOf("day")
      .add(7, "hours")
      .toDate();
    const maxTime = moment(key.split("|")[0])
      .startOf("day")
      .add(23, "hours")
      .add(59, "minutes")
      .toDate();

    let newStart = new Date(start);
    let newEnd = new Date(end);

    if (newStart < minTime) newStart = minTime;
    if (newEnd > maxTime) newEnd = maxTime;

    const updatedEvents = eventsByRoom[key].map((e) =>
      e.id === event.id ? { ...e, start: newStart, end: newEnd } : e
    );
    const eventsWithOverlap = updateOverlapping(updatedEvents);
    const hasOverlap = eventsWithOverlap.some((e) => e.overlapping);

    const MIN_GAP = 15 * 60 * 1000;
    let hasInvalidGap = false;

    for (const e of eventsByRoom[key]) {
      if (e.id === event.id) continue;

      const gapBefore = newStart - e.end;
      const gapAfter = e.start - newEnd;

      if (gapBefore > 0 && gapBefore < MIN_GAP) {
        hasInvalidGap = true;
        break;
      }
      if (gapAfter > 0 && gapAfter < MIN_GAP) {
        hasInvalidGap = true;
        break;
      }
    }

    if (hasOverlap || hasInvalidGap) {
      return;
    }

    setEventsByRoom((prev) => ({ ...prev, [key]: eventsWithOverlap }));
    updateGeneratedShowtimes(key, eventsWithOverlap);
  };

  const draggableAccessor = (event) => event.type === "generated";

  const hasOverlappingEvents = () => {
    return Object.values(eventsByRoom).some((events) =>
      events.some((event) => event.overlapping)
    );
  };

  const formatGeneratedShowtimesForDB = () => {
    const showtimesFormatted = Object.keys(generatedShowtimes).map((key) => {
      const [date, room_id] = key.split("|");
      const roomData = showtimes.find(
        (room) => room.date === date && room.room_id === Number(room_id)
      );
      return {
        date,
        room_id: Number(room_id),
        cinema_id: roomData.cinema_id,
        showtimes: generatedShowtimes[key],
      };
    });

    return {
      movie_id: Number(movie_id),
      movie_version_id: Number(movie_version_id),
      showtimes: showtimesFormatted,
    };
  };

  const handleSaveToDB = () => {
    if (hasOverlappingEvents()) {
      showAlert("Có suất chiếu bị trùng lặp. Vui lòng kiểm tra lại!", "error");
      return;
    }
    const dataToSend = formatGeneratedShowtimesForDB();
    create.mutate(
      { url: "/showtimes", data: dataToSend },
      {
        onSuccess: (data) => {
          nav("/admin/showtime");
        },
      }
    );
  };

  const groupedShowtimes = groupShowtimesByDateAndCinema();

  const toggleDate = (date) => {
    setOpenDate(openDate === date ? null : date);
  };

  const toggleCinema = (date, cinema_id) => {
    const key = `${date}|${cinema_id}`;
    setOpenCinema((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Thêm mới suất chiếu" pageTitle="Thêm mới" />
        <Card>
          <CardHeader className="p-0 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-black p-4">
              <Row className="align-items-center">
                <Col xs={12} md={4} className="mb-3 mb-md-0">
                  <div className="d-flex align-items-center">
                    <div className="position-relative me-3">
                      <img
                        src={movie_image || "/placeholder.svg"}
                        alt={movie_name}
                        className="rounded shadow-sm"
                        style={{
                          width: "120px",
                          height: "180px",
                          objectFit: "cover",
                        }}
                      />
                      <Badge
                        color="danger"
                        className="position-absolute top-0 end-0 mt-1 me-1"
                      >
                        {stats?.totalGenerated || 0} suất
                      </Badge>
                    </div>
                    <div>
                      <h3 className="mb-1 fw-bold">{movie_name}</h3>
                      <div className="d-flex align-items-center text-blac mb-2">
                        <Film size={16} className="me-1" />
                        <span className="me-3">Phim</span>
                        <Clock size={16} className="me-1" />
                        <span>Suất chiếu: {stats?.totalGenerated || 0}</span>
                      </div>
                      <Button
                        color="success"
                        size="sm"
                        onClick={handleSaveToDB}
                        disabled={hasOverlappingEvents()}
                        className="mt-2"
                      >
                        <span className="d-flex align-items-center">
                          Tạo suất chiếu
                        </span>
                      </Button>
                    </div>
                  </div>
                </Col>
                <Col xs={12} md={8}>
                  <div className="bg-white bg-opacity-10 rounded p-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5 className="m-0 text-black">
                        <span className="badge bg-info me-2">Thống kê</span>
                        Suất chiếu generated
                      </h5>
                      <Button
                        color="link"
                        className="text-black p-0"
                        onClick={toggleCollapse}
                      >
                        {isOpen ? (
                          <ChevronUp size={20} />
                        ) : (
                          <ChevronDown size={20} />
                        )}
                      </Button>
                    </div>

                    <Collapse isOpen={isOpen}>
                      <Nav tabs className="mb-3 border-0">
                        <NavItem>
                          <NavLink
                            className={`cursor-pointer ${
                              activeTab === "1"
                                ? "active bg-white bg-opacity-20"
                                : "text-black"
                            }`}
                            onClick={() => toggle("1")}
                          >
                            Theo ngày
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={`cursor-pointer ${
                              activeTab === "2"
                                ? "active bg-white bg-opacity-20"
                                : "text-black"
                            }`}
                            onClick={() => toggle("2")}
                          >
                            Theo rạp
                          </NavLink>
                        </NavItem>
                      </Nav>

                      <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                          {Object.entries(stats?.byDate || {}).length > 0 ? (
                            <ListGroup flush className="bg-transparent">
                              {Object.entries(stats?.byDate || {}).map(
                                ([date, data]) => (
                                  <ListGroupItem
                                    key={date}
                                    className="bg-transparent border-white border-opacity-25 text-black"
                                  >
                                    <div className="d-flex justify-content-between align-items-center">
                                      <strong>{date}</strong>
                                      <Badge
                                        color="light"
                                        className="text-dark"
                                      >
                                        {data.total} suất
                                      </Badge>
                                    </div>
                                    <div className="mt-2 ms-3">
                                      {Object.entries(data.cinemas || {}).map(
                                        ([cinemaId, cinema]) => (
                                          <div
                                            key={cinemaId}
                                            className="d-flex justify-content-between text-blac mb-1"
                                          >
                                            <span>{cinema.name}</span>
                                            <span>{cinema.count} suất</span>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </ListGroupItem>
                                )
                              )}
                            </ListGroup>
                          ) : (
                            <div className="text-center text-blac py-3">
                              Chưa có suất chiếu generated
                            </div>
                          )}
                        </TabPane>

                        <TabPane tabId="2">
                          {Object.entries(stats?.byCinema || {}).length > 0 ? (
                            <ListGroup flush className="bg-transparent">
                              {Object.entries(stats?.byCinema || {}).map(
                                ([id, cinema]) => (
                                  <ListGroupItem
                                    key={id}
                                    className="bg-transparent border-white border-opacity-25 text-black"
                                  >
                                    <div className="d-flex justify-content-between align-items-center">
                                      <span>{cinema.name}</span>
                                      <Badge
                                        color="light"
                                        className="text-dark"
                                      >
                                        {cinema.count} suất
                                      </Badge>
                                    </div>
                                  </ListGroupItem>
                                )
                              )}
                            </ListGroup>
                          ) : (
                            <div className="text-center text-blac py-3">
                              Chưa có dữ liệu rạp
                            </div>
                          )}
                        </TabPane>
                      </TabContent>
                    </Collapse>
                  </div>
                </Col>
              </Row>
            </div>
          </CardHeader>
          <CardBody>
            <div style={{ marginTop: 20 }}>
              <Accordion open={openDate} toggle={toggleDate}>
                {Object.keys(groupedShowtimes).map((date) => (
                  <AccordionItem key={date}>
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button"
                        type="button"
                        onClick={() => toggleDate(date)}
                      >
                        Ngày {date} ({stats.byDate[date]?.total || 0} suất
                        generated)
                      </button>
                    </h2>
                    <Collapse isOpen={openDate === date}>
                      <Accordion>
                        {Object.keys(groupedShowtimes[date]).map(
                          (cinema_id) => {
                            const cinemaGeneratedCount =
                              stats.byCinema[cinema_id]?.count || 0;
                            return (
                              <AccordionItem key={cinema_id}>
                                <h3 className="accordion-header">
                                  <button
                                    className="accordion-button"
                                    type="button"
                                    onClick={() =>
                                      toggleCinema(date, cinema_id)
                                    }
                                  >
                                    {
                                      groupedShowtimes[date][cinema_id]
                                        .cinema_name
                                    }{" "}
                                    ({cinemaGeneratedCount} suất generated)
                                  </button>
                                </h3>
                                <Collapse
                                  isOpen={openCinema[`${date}|${cinema_id}`]}
                                >
                                  <div style={{ padding: "20px" }}>
                                    {groupedShowtimes[date][
                                      cinema_id
                                    ].rooms.map((room) => {
                                      const key = `${room.date}|${room.room_id}`;
                                      const events = eventsByRoom[key] || [];
                                      const generatedCount = events.filter(
                                        (e) => e.type === "generated"
                                      ).length;
                                      const totalCount = events.length;
                                      const hasOverlap = events.some(
                                        (e) => e.overlapping
                                      );

                                      return (
                                        <div
                                          key={key}
                                          style={{ marginBottom: 20 }}
                                        >
                                          <h4>Phòng {room.room_name}</h4>
                                          <p>
                                            Số suất chiếu được tạo:{" "}
                                            {generatedCount} / Tổng số suất:{" "}
                                            {totalCount}
                                          </p>
                                          {hasOverlap && (
                                            <p style={{ color: "red" }}>
                                              Có suất chiếu bị trùng lặp
                                            </p>
                                          )}
                                          <DnDCalendar
                                            localizer={localizer}
                                            events={events}
                                            startAccessor="start"
                                            endAccessor="end"
                                            defaultView="day"
                                            views={["day"]}
                                            date={moment(
                                              room.date,
                                              "YYYY-MM-DD"
                                            ).toDate()}
                                            min={moment(
                                              `${room.date} 07:00`,
                                              "YYYY-MM-DD HH:mm"
                                            ).toDate()}
                                            max={moment(
                                              `${room.date} 23:59`,
                                              "YYYY-MM-DD HH:mm"
                                            ).toDate()}
                                            step={15}
                                            timeslots={4}
                                            onEventDrop={handleEventDrop}
                                            draggableAccessor={
                                              draggableAccessor
                                            }
                                            resizable={false}
                                            eventPropGetter={eventStyleGetter}
                                            components={{ event: CustomEvent }}
                                            toolbar={false}
                                            style={{
                                              height: 400,
                                              marginTop: 20,
                                            }}
                                          />
                                        </div>
                                      );
                                    })}
                                  </div>
                                </Collapse>
                              </AccordionItem>
                            );
                          }
                        )}
                      </Accordion>
                    </Collapse>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default ShowtimePreview;
