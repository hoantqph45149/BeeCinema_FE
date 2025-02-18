
import { useState } from "react";
import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";

export function register() {
  const [selectedGender, setSelectedGender] = useState(null);

  const handleGenderChange = (gender) => {
    setSelectedGender(selectedGender === gender ? null : gender);
  };

  return (
    <section className="m-8 flex">
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/images/pattern.jpg"
          className="h-full w-full object-cover rounded-3xl"
          alt="background"
        />
      </div>
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <h2 className="font-bold mb-4 text-2xl">Đăng Ký</h2>
          <p className="text-lg font-normal text-gray-900">Nhập thông tin của bạn để đăng ký.</p>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-4 flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-900">Họ và tên</label>
            <input
              type="text"
              placeholder="Nhập họ và tên"
              className="outline-none p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
            />
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-900">Email</label>
            <input
              type="email"
              placeholder="name@mail.com"
              className="outline-none p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
            />
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-900">Số điện thoại</label>
            <input
              type="number"
              placeholder="Nhập số điện thoại"
              className="outline-none p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
            />
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-900">Ngày sinh</label>
            <input
              type="date"
              className="outline-none p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
            />
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-900">Mật khẩu</label>
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              className="outline-none p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
            />
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-900">Xác thực mật khẩu</label>
            <input
              type="password"
              placeholder="Nhập lại mật khẩu"
              className="outline-none p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
            />
          </div>

          <GenderCheckbox onCheckboxChange={handleGenderChange} selectedGender={selectedGender}    />

          <button className="w-full py-3 mt-6 bg-blue-500 text-white rounded-lg">
            Đăng Ký
          </button>

          <div className="space-y-4 mt-8">
            <button className="w-full py-3 bg-white text-gray-900 shadow-md rounded-lg flex items-center justify-center">
              <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1156_824)">
                  <path d="M16.3442 8.18429C16.3442 7.64047 16.3001 7.09371 16.206 6.55872H8.66016V9.63937H12.9813C12.802 10.6329 12.2258 11.5119 11.3822 12.0704V14.0693H13.9602C15.4741 12.6759 16.3442 10.6182 16.3442 8.18429Z" fill="#4285F4" />
                  <path d="M8.65974 16.0006C10.8174 16.0006 12.637 15.2922 13.9627 14.0693L11.3847 12.0704C10.6675 12.5584 9.7415 12.8347 8.66268 12.8347C6.5756 12.8347 4.80598 11.4266 4.17104 9.53357H1.51074V11.5942C2.86882 14.2956 5.63494 16.0006 8.65974 16.0006Z" fill="#34A853" />
                  <path d="M4.16852 9.53356C3.83341 8.53999 3.83341 7.46411 4.16852 6.47054V4.40991H1.51116C0.376489 6.67043 0.376489 9.33367 1.51116 11.5942L4.16852 9.53356Z" fill="#FBBC04" />
                  <path d="M8.65974 3.16644C9.80029 3.1488 10.9026 3.57798 11.7286 4.36578L14.0127 2.08174C12.5664 0.72367 10.6469 -0.0229773 8.65974 0.000539111C5.63494 0.000539111 2.86882 1.70548 1.51074 4.40987L4.1681 6.4705C4.8001 4.57449 6.57266 3.16644 8.65974 3.16644Z" fill="#EA4335" />
                </g>
                <defs>
                  <clipPath id="clip0_1156_824">
                    <rect width="16" height="16" fill="white" transform="translate(0.5)" />
                  </clipPath>
                </defs>
              </svg>
              <span>Đăng nhập với Google</span>
            </button>
          </div>
          <p className="text-center text-gray-900 font-medium mt-4">
            Đã có tài khoản?
            <Link to="/auth/sign-in" className="text-gray-900 ml-1">Đăng nhập</Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default register;