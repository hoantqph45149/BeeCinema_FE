import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="text-white flex flex-col">
      <div className="text-white bg-gray-900">
        <div className="container">
          <div className="flex justify-end px-6">
            <div className="flex">
              <Link to={"/register"}>Đăng ký</Link>
              <span className="mx-2">|</span>
              <Link to={"/Login"}>Đăng nhập</Link>
            </div>
          </div>
        </div>
      </div>
      <nav className="bg-[#f7941d] w-full h-[83px] ">
        <div className="container h-full">
          <div className="flex justify-between items-center px-6 py-3 h-full">
            <div className="flex items-center space-x-10 ">
              <img
                src="https://betacinemas.vn/Assets/Common/logo/logo.png"
                alt="Poly Cinemas"
                className="h-10 mr-4"
              />
              <div className="text-white font-semibold">
                <button className="bg-[#f7941d]px-4 py-2 rounded-lg">
                  Poly Hà Đông ▼
                </button>
              </div>
            </div>
            <ul className="flex items-center space-x-5 text-white text-lg font-bold h-full">
              <li className="hover:underline cursor-pointer">
                Lịch chiếu theo rạp
              </li>
              <li className="hover:underline cursor-pointer">Phim</li>
              <li className="hover:underline cursor-pointer">Chính sách</li>
              <li className="hover:underline cursor-pointer">Giá vé</li>
              <li className="hover:underline cursor-pointer">Tin tức</li>
              <li className="hover:underline cursor-pointer">Liên hệ</li>
              <li className="hover:underline cursor-pointer">Giới thiệu</li>
              <li className="hover:underline cursor-pointer">Thành viên</li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
