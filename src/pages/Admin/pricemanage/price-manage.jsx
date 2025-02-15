import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Row,
  Table,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { useCRUD, useFetch } from "../../../Hooks/useCRUD";
import { h } from "@fullcalendar/core/preact.js";

document.title = "Quản lý giá vé";
const PriceManage = () => {
  const { data: typeSeatsData } = useFetch(["typeSeats"], "/type-seats");
  const { data: cinemasData } = useFetch(["cinemas"], "/cinemas");
  const { data: typeRoomsData } = useFetch(["typeRooms"], "/type-rooms");
  const { data: branchesData } = useFetch(["branches"], "/branches");
  const { patch: patchTypeRoom } = useCRUD(["typeRooms"]);
  const { patch: patchTypeSeat } = useCRUD(["typeSeats"]);
  const { patch: patchCinema } = useCRUD(["cinemas"]);
  const [typeRooms, setTypeRooms] = useState([]);
  const [typeSeats, setTypeSeats] = useState([]);
  const [cinemas, setCinemas] = useState([]);
  const [branches, setBranches] = useState([]);
  console.log("branchesData", branches);
  // console.log("typeRoomsData", typeRooms);
  console.log("cinemasData", cinemas);
  // console.log("typeSeatsData", typeSeats);

  useEffect(() => {
    if ((typeRoomsData, typeSeatsData, cinemasData, branchesData)) {
      setCinemas(cinemasData);
      setTypeRooms(typeRoomsData.data);
      setTypeSeats(typeSeatsData.data);
      setBranches(branchesData.data);
    }
  }, [typeRoomsData, typeSeatsData, cinemasData, branchesData]);

  const handleUpdatePrice = (item, type) => {
    switch (type) {
      case "seat":
        patchTypeSeat.mutate({
          url: `/type-seats/${item.id}`,
          data: { ...item, price: Number(item.price) },
        });
        break;
      case "room":
        patchTypeRoom.mutate({
          url: `/type-rooms/${item.id}`,
          data: { ...item, surcharge: Number(item.surcharge) },
        });
        console.log(item);
        break;
      case "cinema":
        patchCinema.mutate({
          url: `/cinemas/${item.id}`,
          data: { ...item, surcharge: Number(item.surcharge) },
        });
        console.log(item);
        break;
      default:
        break;
    }
  };

  const handleChangeBranch = (value) => {
    if (value === "all") {
      setCinemas(cinemasData);
    } else {
      const selectedBranch = branches.find((branch) => branch.id == value);
      if (selectedBranch) {
        setCinemas(selectedBranch.cinemas);
      }
    }
  };

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Quản lý giá vé" pageTitle="Danh sách" />
        <Row>
          <Col lg={6}>
            <Card>
              <CardBody>
                <h5 className="mb-3">Giá vé theo Ghế - Loại phòng</h5>
                <Table bordered>
                  <thead>
                    <tr>
                      <th>Giá theo ghế</th>
                      <th>Giá (VND)</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {typeSeats.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>
                          <Input
                            type="number"
                            value={item.price || ""}
                            placeholder="0"
                            onChange={(e) => {
                              const updatedSeats = typeSeats.map((seat) =>
                                seat.id === item.id
                                  ? { ...seat, price: Number(e.target.value) }
                                  : seat
                              );
                              setTypeSeats(updatedSeats);
                            }}
                          />
                        </td>
                        <td>
                          <Button
                            onClick={() => handleUpdatePrice(item, "seat")}
                            type="button"
                            color="primary"
                          >
                            Cập nhật
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                <Table bordered>
                  <thead>
                    <tr>
                      <th> Phụ thu theo loại phòng</th>
                      <th> Giá (VNĐ)</th>
                      <th> Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {typeRooms.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>
                          <Input
                            type="number"
                            value={item.surcharge || ""}
                            placeholder="0"
                            onChange={(e) => {
                              const updatedRooms = typeRooms.map((room) =>
                                room.id === item.id
                                  ? {
                                      ...room,
                                      surcharge: Number(e.target.value),
                                    }
                                  : room
                              );
                              setTypeRooms(updatedRooms);
                            }}
                          />
                        </td>
                        <td>
                          <Button
                            onClick={() => handleUpdatePrice(item, "room")}
                            color="primary"
                          >
                            Cập nhật
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>

          <Col lg={6}>
            <Card>
              <CardBody>
                <h5 className="mb-3">Phụ thu theo rạp</h5>
                <Row className="mb-2">
                  <Col md={12}>
                    <div className="mb-3">
                      <select
                        id="branches"
                        name="branches"
                        className={`form-select mb-3`}
                        aria-label="Default select example"
                        onChange={(e) => {
                          handleChangeBranch(e.target.value);
                        }}
                      >
                        <option value="all">Tất cả</option>
                        {branches.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option> // </option>
                        ))}
                      </select>
                    </div>
                  </Col>
                </Row>

                <Table bordered>
                  <thead>
                    <tr>
                      <th>Tên rạp</th>
                      <th>Giá (VNĐ)</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cinemas.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>
                          <Input
                            type="number"
                            value={item.surcharge || ""}
                            placeholder="0"
                            onChange={(e) => {
                              const updatedCinemas = cinemas.map((cinema) =>
                                cinema.id === item.id
                                  ? {
                                      ...cinema,
                                      surcharge: Number(e.target.value),
                                    }
                                  : cinema
                              );
                              setCinemas(updatedCinemas);
                            }}
                          />
                        </td>
                        <td>
                          <Button
                            onClick={() => handleUpdatePrice(item, "cinema")}
                            color="primary"
                          >
                            Cập nhật
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PriceManage;
