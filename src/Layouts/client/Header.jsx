import { useEffect, useState } from "react";
import LocationSelect from "./LocationSelect";
import MenuDropdown from "./MenuDropdown";
import ProfileDropdownClient from "./ProfileDropdownClient";

const Header = () => {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header className="flex flex-col">
      <div className="text-white bg-gray-900">
        <div className="container">
          <div className="flex justify-end">
            {/* <div className="flex">
              <Link to={"/register"}>Đăng ký</Link>
              <span className="mx-2">|</span>
              <Link to={"/Login"}>Đăng nhập</Link>
            </div> */}
            <div className="py-2">
              <ProfileDropdownClient />
            </div>
          </div>
        </div>
      </div>
      <nav
        className={`bg-white border-b shadow-lg w-full h-[83px] ${
          isFixed ? "fixed top-0 z-50" : ""
        }`}
      >
        <div className="container h-full">
          <div className="flex justify-between items-center py-3 h-full">
            <div className="flex items-center space-x-4">
              <img
                src="https://betacinemas.vn/Assets/Common/logo/logo.png"
                alt="Poly Cinemas"
                className="h-10 mr-4"
              />
              <div>
                <LocationSelect />
              </div>
            </div>
            <div className="lg:hidden p-4">
              <MenuDropdown />
            </div>
            <ul className="items-center space-x-5 text-secondary font-bold h-full hidden lg:flex ">
              <li className="hover:text-accent xl:text-base lg:text-xs cursor-pointer">
                Lịch chiếu theo rạp
              </li>
              <li className="hover:text-accent xl:text-base lg:text-xs cursor-pointer">
                Phim
              </li>
              <li className="hover:text-accent xl:text-base lg:text-xs cursor-pointer">
                Chính sách
              </li>
              <li className="hover:text-accent xl:text-base lg:text-xs cursor-pointer">
                Giá vé
              </li>
              <li className="hover:text-accent xl:text-base lg:text-xs cursor-pointer">
                Tin tức
              </li>
              <li className="hover:text-accent xl:text-base lg:text-xs cursor-pointer">
                Liên hệ
              </li>
              <li className="hover:text-accent xl:text-base lg:text-xs cursor-pointer">
                Giới thiệu
              </li>
              <li className="hover:text-accent xl:text-base lg:text-xs cursor-pointer">
                Thành viên
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
