import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../../../Contexts/auth/UseAuth";
import Modal from "./../../../Components/Common/Modal";
import FormUpdateProfile from "./FormUpdateProfile";
import MemberShip from "./MemberShip";
import MyVoucher from "./MyVoucher";
import ResetPassword from "./ResetPassword";
import TicketHistory from "./TicketHistory";

function ProfileClient() {
  const location = useLocation();
  const activeTabParams = new URLSearchParams(location.search).get("tab");
  const { authUser } = useAuthContext();
  const [activeTab, setActiveTab] = useState("membership");
  const [openModalProfile, setOpenModalProfile] = useState(false);
  const [openModalResetPassword, setOpenModalResetPassword] = useState(false);

  const tabs = ["membership", "bookingHistory", "Voucher"];

  useEffect(() => {
    if (activeTabParams) {
      setActiveTab(activeTabParams);
    }
  }, [activeTabParams]);
  return (
    <div className="bg-gray-100 pb-10">
      <Modal
        isOpen={openModalProfile}
        onClose={() => setOpenModalProfile(false)}
        onSubmit={() => alert("Submitted!")}
        title="Cập nhật thông tin cá nhân"
        isFooter={false}
      >
        <FormUpdateProfile setModal={setOpenModalProfile} />
      </Modal>
      <Modal
        isOpen={openModalResetPassword}
        onClose={() => setOpenModalResetPassword(false)}
        onSubmit={() => alert("Submitted!")}
        title="Cập nhật Mật khẩu"
        isFooter={false}
      >
        <ResetPassword setModal={setOpenModalResetPassword} />
      </Modal>
      <div className="bg-black text-white py-6">
        <div className="container min-h-full relative flex flex-col justify-between md:flex-row md:items-center gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <img
                src={authUser?.avatar ?? "/images/defaultavatar.jpg"}
                alt="Profile"
                className="w-14 h-14  md:w-20 md:h-20 rounded-full border-4 border-white"
              />
              <div>
                <h1 className="text-md font-semibold">{authUser?.name}</h1>
                <p className="text-sm">{authUser?.email}</p>
                <p className="text-xs">{authUser?.birthday}</p>
              </div>
            </div>
            <div
              onClick={() => setOpenModalResetPassword(true)}
              className="text-accent font-semibold cursor-pointer"
            >
              <span>Đổi mật khẩu</span>
            </div>
          </div>
          <div>
            <button
              onClick={() => setOpenModalProfile(true)}
              className="bg-accent text-primary font-semibold px-2 py-1  md:px-2 md:py-2 rounded-lg"
            >
              <FaEdit className="m-1 text-[20px]" />
            </button>
          </div>
        </div>
      </div>

      <div className=" bg-white shadow-md px-2 py-3 border-b">
        <div className="container flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`flex-1 text-[10px] md:text-base md:flex-none md:w-[200px] md font-medium px-2 py-2 rounded-md transition-all duration-200 ${
                activeTab === tab
                  ? "bg-accent text-white"
                  : "text-secondary hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "membership"
                ? "Thẻ thành viên"
                : tab === "Voucher"
                ? "Voucher"
                : "Lịch sử đặt vé"}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "membership" && (
        <div className="mx-2 lg:mx-8">
          <MemberShip />
        </div>
      )}
      {activeTab === "bookingHistory" && (
        <div className="mx-2 lg:mx-8">
          <TicketHistory />
        </div>
      )}
      {activeTab === "Voucher" && (
        <div className="mx-2 lg:mx-8">
          <MyVoucher />
        </div>
      )}
    </div>
  );
}

export default ProfileClient;
