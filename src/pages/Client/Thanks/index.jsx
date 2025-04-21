import { FaFacebook, FaYoutube, FaTiktok, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

function Thanks() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 text-center">
      <img
        src="/images/logo/beecinema.png"
        alt="Order Success"
        className="h-[55px] mb-4"
      />
      <h1 className="flex flex-col items-center text-xl md:text-3xl font-bold text-accent">
        Đặt vé thành công!
        <img src="/images/success.gif" alt="succsess" className="w-8 h-8" />
      </h1>
      <p className="text-secondary mt-2 max-w-lg">
        🔔 Cảm ơn bạn đã đặt vé, chúng tôi sẽ gửi cho bạn Email về thông tin vé
        và chú ý đến rạp trước 15 phút để quét mã lấy vé, hãy để ý điện thoại
        bạn nhé!
      </p>
      <div className="mt-6 flex space-x-4">
        <Link
          to="/"
          className="px-4 py-2 border border-accent text-accent rounded-lg hover:bg-accent/80 hover:text-white transition"
        >
          Quay về trang chủ ➜
        </Link>
      </div>
      <div className="mt-10 text-gray-600">Theo dõi chúng tôi trên:</div>
      <div className="flex space-x-4 mt-2 text-accent text-2xl">
        <a href="#" className="hover:text-gray-500">
          <FaFacebook />
        </a>
        <a href="#" className="hover:text-gray-500">
          <FaYoutube />
        </a>
        <a href="#" className="hover:text-gray-500">
          <FaTiktok />
        </a>
        <a href="#" className="hover:text-gray-500">
          <FaInstagram />
        </a>
      </div>
    </div>
  );
}

export default Thanks;
