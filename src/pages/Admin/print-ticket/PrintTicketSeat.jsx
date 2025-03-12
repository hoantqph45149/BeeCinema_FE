import dayjs from "dayjs";

export default function PrintTicketSeat({ seat, ticket }) {
  const A4_HEIGHT = 1000;
  const perforationHeight = 64;

  const perforationsCount = Math.ceil(A4_HEIGHT / perforationHeight);

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
                  RẠP CHIẾU PHIM BEECINEMA {ticket?.cinema?.name}
                </h2>
                <p style={{ fontSize: "0.75rem" }}>{ticket?.cinema?.address}</p>
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
                  VÉ XEM PHIM
                </div>
                <div
                  style={{
                    textAlign: "start",
                    fontSize: "0.875rem",
                  }}
                >
                  <p>CÔNG TY CỔ PHẦN BEECINEMA MEDIA</p>
                  <p>
                    Tầng 3, số 595 đường Mễ Trì - Phường Mỹ Đình, Quận Nam Từ
                    Liểm
                  </p>
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
                      {" "}
                      {ticket?.movie?.name}
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
                      {dayjs(ticket?.showtime?.start_time).format(
                        "DD/MM/YYYY HH:mm"
                      )}
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
                      {ticket?.showtime?.format}
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
                      {seat.seat_name}
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
                      {ticket?.room?.name}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingBottom: "10px", textAlign: "left" }}>
                      Giá vé:
                    </td>
                    <td
                      style={{
                        fontWeight: "600",
                        textAlign: "right",
                        paddingBottom: "10px",
                      }}
                    >
                      VND {formatPrice(seat.price)}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div
                style={{
                  borderBottom: "1px dashed #a3a3a3",
                  paddingTop: "1rem",
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
                  *Lưu ý: Phim được phổ biến đến người xem*
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
                        {ticket?.movie?.duration}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left" }}>Tên KH:</td>
                      <td style={{ textAlign: "right", fontWeight: "600" }}>
                        {ticket?.user?.name}
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
                  <p>Hotline CSKH: 0800 123 456</p>
                </div>
              </div>

              <div
                style={{
                  textAlign: "center",
                  fontSize: "0.75rem",
                  paddingTop: "1rem",
                }}
              >
                <p style={{ fontWeight: "600" }}>
                  BEECINEMA - RẠP NGON GIÁ NGỌT
                </p>
                <p>www.beecinema.vn - facebook.com/beecinema</p>
              </div>

              <table style={{ width: "100%" }}>
                <tbody>
                  <tr style={{ textAlign: "center" }}>
                    <td>
                      <img
                        src={`https://bwipjs-api.metafloor.com/?bcid=code128&text=${ticket?.code}&scale=3&height=8`}
                        alt={ticket?.code}
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
                        {ticket?.code}
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
