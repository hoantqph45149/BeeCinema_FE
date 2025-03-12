import { Html5QrcodeScanner } from "html5-qrcode";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import QRCodeScanner from "./Html5QrcodeScanner";

const ScanQRCode = () => {
  const [modal, setModal] = useState(false);
  // Toggle Modal
  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  }, [modal]);

  return (
    <>
      <div className="ms-1 header-item d-none d-sm-flex">
        <button
          onClick={toggle}
          title="Quét mã QR"
          type="button"
          className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
        >
          <i className="ri-qr-scan-2-line fs-22"></i>
        </button>
      </div>
      <Modal isOpen={modal} toggle={toggle} centered>
        <ModalHeader className="bg-light p-3" toggle={toggle}></ModalHeader>
        <ModalBody>
          <QRCodeScanner setModal={setModal} />
        </ModalBody>
        <div className="modal-footer">
          <Button type="button" color="light" onClick={toggle}>
            Đóng
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ScanQRCode;
