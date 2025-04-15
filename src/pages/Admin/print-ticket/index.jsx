import PrintTicketSeat from "./PrintTicketSeat";
import printJS from "print-js";
import { Button } from "reactstrap";
import PrintTicketDetail from "./PrintTicketDetail";
import { showConfirm } from "../../../Components/Common/showAlert";
import { useCRUD } from "../../../Hooks/useCRUD";

export default function PrintTicket({ ticket }) {
  const { create: confirmTicket } = useCRUD(["tickets", ticket?.code]);
  const handlePrint = () => {
    if (ticket?.status === "Đã thanh toán") {
      showConfirm("In Vé", `Bạn có chắc muốn in vé không?`, () => {
        confirmTicket.mutate(
          {
            url: `/tickets/confirm`,
            data: { ticket_id: ticket?.id },
            shouldShowAlert: false,
          },
          {
            onSuccess: () => {
              printJS({
                printable: "beecinema",
                type: "html",
                style: `
                  @media print {
                    #beecinema {
                      display: block !important;
                    }
                  }
          
                  /* Định nghĩa kích thước trang A4 */
                  @page {
                    size: A4;
                    margin: 5mm;
                  }
          
                  /* Reset margin và padding mặc định */
                  body {
                    margin: 0;
                    padding: 0;
                    background: white !important;
                  }
          
                  /* Đảm bảo mỗi ticketContainer chiếm một trang */
                  .ticketContainer {
                    width: 210mm;
                    height: 297mm;
                    page-break-after: always;
                    break-inside: avoid;
                    text-align: center;
                    box-sizing: border-box;
                    overflow: hidden;
                  }
          
                  .ticketContainer:last-child {
                    page-break-after: auto;
                  }
          
                  /* Đảm bảo nội dung bên trong không tràn */
                  .ticketContainer > * {
                    max-height: 297mm;
                    overflow: hidden;
                  }
                `,
                targetStyles: ["*"],
                scanStyles: true,
                documentTitle: "Beecinema",
              });
            },
          }
        );
      });
      return;
    }
    printJS({
      printable: "beecinema",
      type: "html",
      style: `
        @media print {
          #beecinema {
            display: block !important;
          }
        }

        /* Định nghĩa kích thước trang A4 */
        @page {
          size: A4;
          margin: 5mm;
        }

        /* Reset margin và padding mặc định */
        body {
          margin: 0;
          padding: 0;
          background: white !important;
        }

        /* Đảm bảo mỗi ticketContainer chiếm một trang */
        .ticketContainer {
          width: 210mm;
          height: 297mm;
          page-break-after: always;
          break-inside: avoid;
          text-align: center;
          box-sizing: border-box;
          overflow: hidden;
        }

        .ticketContainer:last-child {
          page-break-after: auto;
        }

        /* Đảm bảo nội dung bên trong không tràn */
        .ticketContainer > * {
          max-height: 297mm;
          overflow: hidden;
        }
      `,
      targetStyles: ["*"],
      scanStyles: true,
      documentTitle: "Beecinema",
    });
  };

  return (
    <>
      <Button color="primary" onClick={handlePrint}>
        <i className="ri-printer-line"></i> In Vé
      </Button>
      <div
        style={{
          display: "none",
          fontFamily: '"OCR-B", "Courier New", "Roboto Mono", sans-serif',
        }}
        id="beecinema"
      >
        <div className="ticketContainer">
          <PrintTicketDetail data={ticket} />
        </div>
        {ticket.seats?.details?.map((item) => (
          <div key={item.seat_id} className="ticketContainer">
            <PrintTicketSeat seat={item} ticket={ticket} />
          </div>
        ))}
      </div>
    </>
  );
}
