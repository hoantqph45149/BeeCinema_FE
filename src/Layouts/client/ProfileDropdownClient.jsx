import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ChevronDown,
  FolderClock,
  IdCard,
  LockKeyhole,
  LogOut,
  Tags,
  UserPen,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Contexts/auth/UseAuth";
import { useCRUD } from "../../Hooks/useCRUD";

function ProfileDropdownClient() {
  const { create: logout } = useCRUD(["logout"]);
  const { authUser, setAuthUser } = useAuthContext();
  const nav = useNavigate();

  const handleLogout = () => {
    logout.mutate(
      {
        url: "/logout",
        data: {},
        shouldShowAlert: false,
      },
      {
        onSuccess: () => {
          setAuthUser(null);
          nav("/login");
        },
        onError: (error) => {
          if (error?.response?.data?.message == "Unauthenticated.") {
            setAuthUser(null);
            nav("/login");
          }
        },
      }
    );
  };
  return (
    <Menu>
      <MenuButton className="flex items-center space-x-2 text-primary font-semibold">
        <span>Xin chào : {authUser?.name}</span>{" "}
        <ChevronDown size={20} strokeWidth={3} />
      </MenuButton>
      <MenuItems
        anchor="bottom"
        className="w-64 bg-white border rounded-lg shadow-lg"
      >
        {authUser?.role === "admin" && (
          <MenuItem>
            <Link
              className="px-4 py-4 text-sm hover:bg-gray-100 flex items-center"
              onClick={() => {
                window.location.href = "/admin";
              }}
            >
              <LockKeyhole size={16} strokeWidth={1.5} className="mr-2" /> Truy
              Cập Trang Quản Trị
            </Link>
          </MenuItem>
        )}
        <MenuItem>
          <Link
            className="px-4 py-4 text-sm hover:bg-gray-100 flex items-center"
            to="/profile"
          >
            <UserPen size={16} strokeWidth={1.5} className="mr-2" /> Thông Tin
            Tài Khoản
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            className="px-4 py-4 text-sm hover:bg-gray-100 flex items-center"
            to="/profile?tab=membership"
          >
            <IdCard size={16} strokeWidth={1.5} className="mr-2" /> Thẻ Thành
            Viên
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            className="px-4 py-4 text-sm hover:bg-gray-100 flex items-center"
            to="/profile?tab=bookingHistory"
          >
            <FolderClock size={16} strokeWidth={1.5} className="mr-2" />
            Lịch Sử Đặt Vé
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            className="px-4 py-4 text-sm hover:bg-gray-100 flex items-center"
            to="/profile?tab=Voucher"
          >
            <Tags size={18} strokeWidth={1.5} className="mr-2" />
            Voucher
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            onClick={handleLogout}
            className="px-4 py-4 text-sm hover:bg-gray-100 flex items-center"
          >
            <LogOut size={16} strokeWidth={1.5} className="mr-2" /> Đăng Xuất
          </Link>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}

export default ProfileDropdownClient;
