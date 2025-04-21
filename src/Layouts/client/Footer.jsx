import { Facebook, Instagram, Youtube } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-primary text-secondary border-t-2  py-10">
      <div className="container ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-6">
          {/* Language Movies */}
          <div>
            <img
              src="/images/logo/beecinema.png"
              alt=""
              className="w-32 mb-4"
            />
            <ul className="space-y-2">
              {["Chính sách", "Giá vé", "Tin tức", "Liên hệ"].map(
                (movie, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-accent text-sm mr-2">●</span>
                    <a href="#" className="hover:text-accent">
                      {movie}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Movies by Presenter */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Cụm Rạp BEECINEMA</h2>
            <ul className="space-y-2">
              {[
                "Hà Nội",
                "Hồ Chí Minh",
                "Thái Nguyên",
                "Hải Phòng",
                "Đà Nẵng",
                "Nha Trang",
                "Vũng Tàu",
              ].map((movie, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-accent text-sm mr-2">●</span>
                  <a href="#" className="hover:text-accent">
                    {movie}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Booking Online */}
          <div>
            <h2 className="text-lg font-semibold mb-3">
              Kết Nối Với Chúng Tôi
            </h2>
            <ul className="space-y-2">
              {[
                {
                  icon: <Facebook size={16} strokeWidth={1.5} />,
                  link: "www.Facebook.com",
                },
                {
                  icon: <Instagram size={16} strokeWidth={1.5} />,
                  link: "www.Instagram.com",
                },
                {
                  icon: <Youtube size={16} strokeWidth={1.5} />,
                  link: "www.Youtube.com",
                },
                {
                  icon: <Facebook size={16} strokeWidth={1.5} />,
                  link: "www.Tiktok.com",
                },
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-accent text-sm mr-2">{item.icon}</span>
                  <a href="#" className="hover:text-accent">
                    {item.link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* App Download */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Thông Tin</h2>
            <p className="text-sm font-semibold text-[#595f65] mb-4">
              CÔNG TY TNHH BEECINEMA VIỆT NAM
            </p>
            <ul className="space-y-2">
              {[
                {
                  icon: "Địa chỉ",
                  link: "Tầng 5, Tòa nhà Hanoi Group, 442 Đội Cấn, Ba Đình, Hà Nội",
                },
                {
                  icon: "Hotline",
                  link: "1900 0000",
                },
                {
                  icon: "Email",
                  link: "Beecinema@fpt.vn.com",
                },
                {
                  icon: "Website",
                  link: "www.Beecinema.com",
                },
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-accent  mr-2">
                    {item.icon}:{" "}
                    <span className="text-secondary font-semibold">
                      {item.link}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-10 border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between text-sm">
          <p>
            Bản Quyền{" "}
            <a href="#" className="text-accent">
              Beecinema
            </a>
            .Cung cấp{" "}
            <a href="#" className="text-accent">
              FPT Software
            </a>
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fa fa-facebook"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fa fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fa fa-linkedin"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fa fa-youtube-play"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
