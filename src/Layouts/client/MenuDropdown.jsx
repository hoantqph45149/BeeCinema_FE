import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  CalendarCheck,
  CircleDollarSign,
  Clapperboard,
  Contact,
  Flame,
  MenuIcon,
  Milestone,
  Newspaper,
  Siren,
  UserPen,
} from "lucide-react";
import { Link } from "react-router-dom";

function MenuDropdown() {
  return (
    <Menu>
      <MenuButton className="flex items-center space-x-2 font-semibold">
        <MenuIcon size={30} strokeWidth={3} />
      </MenuButton>
      <MenuItems
        anchor="bottom"
        className="w-64 bg-white border rounded-lg shadow-lg z-[99999]"
      >
        <MenuItem>
          <Link
            className="px-4 py-4 text-sm hover:bg-gray-100 flex items-center"
            to="/showtime"
          >
            <CalendarCheck size={16} strokeWidth={1.5} className="mr-2" /> Lịch
            Chiếu Theo Rạp
          </Link>
        </MenuItem>
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
            to="/movies"
          >
            <Clapperboard size={16} strokeWidth={1.5} className="mr-2" /> Phim
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            className="px-4 py-4 text-sm hover:bg-gray-100 flex items-center"
            to="/license"
          >
            <Siren size={16} strokeWidth={1.5} className="mr-2" /> Ưu Đãi
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            className="px-4 py-4 text-sm hover:bg-gray-100 flex items-center"
            to="/price-ticket"
          >
            <CircleDollarSign size={16} strokeWidth={1.5} className="mr-2" />
            Gía vé
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            className="px-4 py-4 text-sm hover:bg-gray-100 flex items-center"
            to="/news"
          >
            <Newspaper size={16} strokeWidth={1.5} className="mr-2" /> Tin Tức
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            className="px-4 py-4 text-sm hover:bg-gray-100 flex items-center"
            to="/contact"
          >
            <Contact size={16} strokeWidth={1.5} className="mr-2" /> Liên Hệ
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            className="px-4 py-4 text-sm hover:bg-gray-100 flex items-center"
            to="/introduce"
          >
            <Milestone size={16} strokeWidth={1.5} className="mr-2" /> Giới
            Thiệu
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            className="px-4 py-4 text-sm hover:bg-gray-100 flex items-center"
            to="/profile"
          >
            <Flame size={16} strokeWidth={1.5} className="mr-2" /> Thành Viên
          </Link>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}

export default MenuDropdown;
