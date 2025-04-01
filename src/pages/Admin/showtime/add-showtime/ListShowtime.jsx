import { useMemo, useState } from "react";
import { Accordion, AccordionItem, Collapse } from "reactstrap";
import classnames from "classnames";
import TableContainer from "../../../../Components/Common/TableContainer";

const ListShowtime = ({ data }) => {
  const [openAccordion, setOpenAccordion] = useState(""); // State cho Accordion ngoài cùng
  const [openDates, setOpenDates] = useState({});
  const [openCinemas, setOpenCinemas] = useState({});
  const [openRooms, setOpenRooms] = useState({});

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? "" : id);
  };

  const toggleDate = (date) => {
    setOpenDates((prev) => ({ ...prev, [date]: !prev[date] }));
  };

  const toggleCinema = (date, cinemaId) => {
    setOpenCinemas((prev) => ({
      ...prev,
      [`${date}-${cinemaId}`]: !prev[`${date}-${cinemaId}`],
    }));
  };

  const toggleRoom = (date, cinemaId, roomId) => {
    setOpenRooms((prev) => ({
      ...prev,
      [`${date}-${cinemaId}-${roomId}`]: !prev[`${date}-${cinemaId}-${roomId}`],
    }));
  };

  const columns = useMemo(
    () => [
      {
        header: "Giờ bắt đầu",
        accessorKey: "start_time",
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        header: "Giờ kết thúc",
        accessorKey: "end_time",
        enableColumnFilter: false,
        enableSorting: false,
      },
    ],
    []
  );

  return (
    <div>
      <Accordion
        open={openAccordion}
        toggle={toggleAccordion}
        className="custom-accordionwithicon accordion-border-box"
      >
        {data?.map((dateItem) => (
          <AccordionItem key={dateItem.date} className="material-shadow">
            <h2 className="accordion-header">
              <button
                className={classnames("accordion-button", {
                  collapsed: !openDates[dateItem.date],
                })}
                type="button"
                onClick={() => toggleDate(dateItem.date)}
                style={{ cursor: "pointer" }}
              >
                {dateItem.date}
              </button>
            </h2>
            <Collapse isOpen={openDates[dateItem.date]}>
              <div className="accordion-body">
                {dateItem.cinemas.map((cinema) => (
                  <AccordionItem
                    key={cinema.cinema_id}
                    className="material-shadow"
                  >
                    <h2 className="accordion-header">
                      <button
                        className={classnames("accordion-button", {
                          collapsed:
                            !openCinemas[
                              `${dateItem.date}-${cinema.cinema_id}`
                            ],
                        })}
                        type="button"
                        onClick={() =>
                          toggleCinema(dateItem.date, cinema.cinema_id)
                        }
                        style={{ cursor: "pointer" }}
                      >
                        {cinema.cinema_name}
                      </button>
                    </h2>
                    <Collapse
                      isOpen={
                        openCinemas[`${dateItem.date}-${cinema.cinema_id}`]
                      }
                    >
                      <div className="accordion-body">
                        {cinema.rooms.map((room) => (
                          <AccordionItem
                            key={room.room_id}
                            className="material-shadow"
                          >
                            <h2 className="accordion-header">
                              <button
                                className={classnames("accordion-button", {
                                  collapsed:
                                    !openRooms[
                                      `${dateItem.date}-${cinema.cinema_id}-${room.room_id}`
                                    ],
                                })}
                                type="button"
                                onClick={() =>
                                  toggleRoom(
                                    dateItem.date,
                                    cinema.cinema_id,
                                    room.room_id
                                  )
                                }
                                style={{ cursor: "pointer" }}
                              >
                                {room.room_name}
                              </button>
                            </h2>
                            <Collapse
                              isOpen={
                                openRooms[
                                  `${dateItem.date}-${cinema.cinema_id}-${room.room_id}`
                                ]
                              }
                            >
                              <div className="accordion-body">
                                <TableContainer
                                  columns={columns}
                                  data={room.showtimes}
                                  customPageSize={8}
                                  divClass="table-responsive table-card mt-1"
                                  tableClass="align-middle table-nowrap"
                                  theadClass="table-light text-muted"
                                />
                              </div>
                            </Collapse>
                          </AccordionItem>
                        ))}
                      </div>
                    </Collapse>
                  </AccordionItem>
                ))}
              </div>
            </Collapse>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ListShowtime;
