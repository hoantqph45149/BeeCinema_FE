import React from "react";
import Button from "../../../Components/Common/Button";

const Contact = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-green-900"></div>

      <div className="relative w-full max-w-5xl bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden z-10 mt-6">
        <div className="w-full md:w-2/3 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">
            Gửi tin nhắn cho chúng tôi
          </h2>
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Họ và tên *
                </label>
                <input
                  type="text"
                  placeholder="Nhập họ và tên"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <p className="text-red-500 text-sm mt-1">
                  Vui lòng nhập họ và tên
                </p>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  placeholder="Nhập email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <p className="text-red-500 text-sm mt-1">
                  Vui lòng nhập địa chỉ email hợp lệ
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Số điện thoại
                </label>
                <input
                  type="text"
                  placeholder="Nhập số điện thoại"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Công ty
                </label>
                <input
                  type="text"
                  placeholder="Tên công ty"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-1">
                Tin nhắn *
              </label>
              <textarea
                rows="4"
                placeholder="Nhập nội dung tin nhắn"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              ></textarea>
              <p className="text-red-500 text-sm mt-1">
                Vui lòng nhập nội dung tin nhắn
              </p>
            </div>
            <Button>GỬI TIN NHẮN</Button>
          </form>
        </div>

        <div className="w-full md:w-1/3 bg-blue-900 text-white p-6 md:p-8 text-center md:text-left">
          <h3 className="text-lg font-semibold mb-4">Thông tin liên hệ</h3>
          <p className="text-sm mb-4">CÔNG TY TNHH BEECINEMA VIỆT NAM</p>
          <p className="flex items-center justify-center md:justify-start mb-2">
            <span className="mr-2">📍</span>Tầng 5, Tòa nhà Hanoi Group, 442 Đội
            Cấn, Ba Đình, Hà Nội
          </p>
          <p className="flex items-center justify-center md:justify-start mb-2">
            <span className="mr-2">📞</span> 1900 0000
          </p>
          <p className="flex items-center justify-center md:justify-start">
            <span className="mr-2">✉️</span> www.Beecinema.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
