import { useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";

const QRCodeScanner = ({ setModal }) => {
  const nav = useNavigate();
  const playBeep = () => {
    const beep = new Audio("/audios/ScanBeep.wav");
    beep.play();
  };
  useEffect(() => {
    const qrcodeRegionId = "BeecinemaQRCode";

    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    };

    const qrCodeSuccessCallback = (decodedText) => {
      setModal(false);
      playBeep();
      nav(`/admin/ticket/detail/${decodedText}`);
    };

    const qrCodeErrorCallback = (errorMessage) => {};

    const html5QrcodeScanner = new Html5QrcodeScanner(
      qrcodeRegionId,
      config,
      false
    );

    html5QrcodeScanner.render(qrCodeSuccessCallback, qrCodeErrorCallback);

    return () => {
      html5QrcodeScanner.clear().catch((error) => {
        console.error("❌ Failed to clear QR scanner:", error);
      });
    };
  }, []);

  return (
    <div id="BeecinemaQRCode" style={{ width: "100%", height: "300px" }} />
  );
};

export default QRCodeScanner;
