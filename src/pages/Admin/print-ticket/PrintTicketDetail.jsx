import { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function PrintTicketDetail({ data }) {
  const [seats, setSeats] = useState([]);
  const [combos, setCombos] = useState([]);
  const A4_HEIGHT = 1000;
  const perforationHeight = 64;
  const perforationsCount = Math.ceil(A4_HEIGHT / perforationHeight);

  useEffect(() => {
    if (data) {
      const seatsMap = data?.seats?.details.map((item) => item.seat_name);
      const combosMap = data?.combos?.details.map((item) => ({
        name: item.combo_name,
        items: item.foods
          .map((food) => `${food.quantity} ${food.food_name}`)
          .join(" + "),
        price: item.total_price,
      }));
      setSeats(seatsMap || []);
      setCombos(combosMap || []);
    }
  }, [data]);
  const ticketData = {
    cinema: {
      name: `RẠP CHIẾU PHIM BEECINEMA ${data?.cinema?.name}`,
      address: data?.cinema?.address,
      company: "CÔNG TY CỔ PHẦN BEECINEMA MEDIA",
      companyAddress:
        "Tầng 3, số 595 đường Mễ Trì - Phường Mỹ Đình, Quận Nam Từ Liểm",
      slogan: "BEECINEMA - RẠP NGON GIÁ NGỌT",
      website: "www.beecinema.vn - facebook.com/beecinema",
      hotline: "0800 123 456",
    },
    movie: {
      title: data?.movie?.name,
      format: data?.showtime?.format,
      duration: `${data?.movie?.duration} Phút`,
      rating: "Phim được phổ biến đến người xem",
    },
    screening: {
      datetime: dayjs(data?.showtime?.start_time).format("DD/MM/YYYY HH:mm"),
      theater: data?.room?.name,
    },
    seats: seats,
    price: {
      perSeat: data?.seats?.total_seat_price,
      total: data?.total_price,
    },
    customer: {
      name: data?.user?.name,
    },
    combos: combos,
    barcode: data?.code,
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div>
              {Array.from({ length: perforationsCount }).map((_, i) => (
                <table
                  key={i}
                  style={{
                    width: "5rem",
                    height: "4rem",
                    backgroundColor: "#337AB7",
                    color: "white",
                    fontSize: "0.75rem",
                    textAlign: "center",
                  }}
                >
                  <tbody>
                    <tr>
                      <td
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        <span
                          style={{
                            backgroundColor: "white",
                            borderRadius: "0.375rem",
                            padding: "0.70rem",
                            display: "inline-block",
                          }}
                        >
                          <img
                            src="/images/logo/beecinema.png"
                            alt="becinema"
                            style={{ height: "1rem" }}
                          />
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              ))}
            </div>
          </td>
          <td style={{ verticalAlign: "top" }}>
            <div
              style={{
                backgroundColor: "white",
                paddingLeft: "3rem",
                paddingRight: "3rem",
                paddingTop: "2.5rem",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  borderBottom: "1px dashed #a3a3a3",
                  paddingBottom: "1rem",
                }}
              >
                <h2
                  style={{
                    fontWeight: "bold",
                    fontSize: "0.875rem",
                  }}
                >
                  {ticketData.cinema.name}
                </h2>
                <p style={{ fontSize: "0.75rem" }}>
                  {ticketData.cinema.address}
                </p>
              </div>
              <div>
                <div
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "1.25rem",
                    marginTop: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  CHI TIẾT VÉ
                </div>
                <div
                  style={{
                    textAlign: "start",
                    fontSize: "0.875rem",
                  }}
                >
                  <p>{ticketData.cinema.company}</p>
                  <p>{ticketData.cinema.companyAddress}</p>
                </div>
              </div>

              <table style={{ width: "100%" }}>
                <tbody style={{ fontSize: "0.875rem" }}>
                  <tr>
                    <td style={{ paddingBottom: "10px", textAlign: "left" }}>
                      Tên phim:
                    </td>
                    <td
                      style={{
                        fontWeight: "600",
                        textAlign: "right",
                        paddingBottom: "10px",
                      }}
                    >
                      {ticketData.movie.title}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingBottom: "10px", textAlign: "left" }}>
                      Ngày giờ:
                    </td>
                    <td
                      style={{
                        fontWeight: "600",
                        textAlign: "right",
                        paddingBottom: "10px",
                      }}
                    >
                      {ticketData.screening.datetime}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingBottom: "10px", textAlign: "left" }}>
                      Định dạng:
                    </td>
                    <td
                      style={{
                        fontWeight: "600",
                        textAlign: "right",
                        paddingBottom: "10px",
                      }}
                    >
                      {ticketData.movie.format}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingBottom: "10px", textAlign: "left" }}>
                      Ghế ngồi:
                    </td>
                    <td
                      style={{
                        fontWeight: "600",
                        textAlign: "right",
                        paddingBottom: "10px",
                      }}
                    >
                      {ticketData?.seats.length > 0 &&
                        ticketData?.seats.join(", ")}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingBottom: "10px", textAlign: "left" }}>
                      Phòng chiếu:
                    </td>
                    <td
                      style={{
                        fontWeight: "600",
                        textAlign: "right",
                        paddingBottom: "10px",
                      }}
                    >
                      {ticketData.screening.theater}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingBottom: "10px", textAlign: "left" }}>
                      Tổng Giá Ghế:
                    </td>
                    <td
                      style={{
                        fontWeight: "600",
                        textAlign: "right",
                        paddingBottom: "10px",
                      }}
                    >
                      VND {formatPrice(ticketData.price.perSeat)}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Combo section */}
              {ticketData.combos.length > 0 && (
                <div style={{ marginBottom: "1rem" }}>
                  <div
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      marginBottom: "0.5rem",
                      borderBottom: "1px solid #e5e5e5",
                      paddingBottom: "0.25rem",
                    }}
                  >
                    Combo & Đồ ăn:
                  </div>
                  <table style={{ width: "100%" }}>
                    <tbody style={{ fontSize: "0.875rem" }}>
                      {ticketData.combos.map((combo, index) => (
                        <tr key={`combo-${index}`}>
                          <td
                            style={{ paddingBottom: "8px", textAlign: "left" }}
                          >
                            {combo.name}:
                          </td>
                          <td
                            style={{
                              paddingBottom: "8px",
                              textAlign: "left",
                              color: "#666",
                            }}
                          >
                            {combo.items}
                          </td>
                          <td
                            style={{
                              fontWeight: "600",
                              textAlign: "right",
                              paddingBottom: "8px",
                            }}
                          >
                            VND {formatPrice(combo.price)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Total price */}
              <div
                style={{
                  borderTop: "1px dashed #a3a3a3",
                  paddingTop: "0.5rem",
                  marginBottom: "1rem",
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "1rem",
                  fontWeight: "700",
                }}
              >
                <span>Tổng cộng:</span>
                <span>VND {formatPrice(ticketData.price.total)}</span>
              </div>

              <div
                style={{
                  borderBottom: "1px dashed #a3a3a3",
                  paddingTop: "0.5rem",
                  paddingBottom: "1rem",
                }}
              >
                <div
                  style={{
                    fontSize: "0.75rem",
                    fontStyle: "italic",
                    textAlign: "center",
                    marginBottom: "1rem",
                  }}
                >
                  *Lưu ý: {ticketData.movie.rating}*
                </div>

                <table
                  style={{
                    fontSize: "0.875rem",
                    marginBottom: "1rem",
                    width: "100%",
                  }}
                >
                  <tbody>
                    <tr>
                      <td style={{ textAlign: "left" }}>Thời gian:</td>
                      <td style={{ textAlign: "right", fontWeight: "600" }}>
                        {ticketData.movie.duration}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left" }}>Tên KH:</td>
                      <td style={{ textAlign: "right", fontWeight: "600" }}>
                        {ticketData.customer.name}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div
                  style={{
                    fontSize: "0.75rem",
                    marginBottom: "1rem",
                    textAlign: "center",
                  }}
                >
                  <p>Quý khách không được đổi/trả vé đã mua</p>
                  <p>Hotline CSKH: {ticketData.cinema.hotline}</p>
                </div>
              </div>

              <div
                style={{
                  textAlign: "center",
                  fontSize: "0.75rem",
                  paddingTop: "1rem",
                }}
              >
                <p style={{ fontWeight: "600" }}>{ticketData.cinema.slogan}</p>
                <p>{ticketData.cinema.website}</p>
              </div>

              <table style={{ width: "100%" }}>
                <tbody>
                  <tr style={{ textAlign: "center" }}>
                    <td>
                      <img
                        src={`https://bwipjs-api.metafloor.com/?bcid=code128&text=${ticketData.barcode}&scale=3&height=8`}
                        alt={ticketData.barcode}
                      />
                    </td>
                  </tr>
                  <tr style={{ textAlign: "center" }}>
                    <td>
                      <span
                        style={{
                          paddingTop: "0.25rem",
                          paddingBottom: "0.25rem",
                        }}
                      >
                        {ticketData.barcode}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </td>
          <td>
            <div>
              {Array.from({ length: perforationsCount }).map((_, i) => (
                <table
                  key={i}
                  style={{
                    width: "5rem",
                    height: "4rem",
                    backgroundColor: "#337AB7",
                    color: "white",
                    fontSize: "0.75rem",
                    textAlign: "center",
                  }}
                >
                  <tbody>
                    <tr>
                      <td
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        <span
                          style={{
                            backgroundColor: "white",
                            borderRadius: "0.375rem",
                            padding: "0.70rem",
                            display: "inline-block",
                          }}
                        >
                          <img
                            src="/images/logo/beecinema.png"
                            alt="becinema"
                            style={{ height: "1rem" }}
                          />
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              ))}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
