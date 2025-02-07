import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  CalendarCheck,
  CircleDollarSign,
  Clapperboard,
  Contact,
  Flame,
  FolderClock,
  IdCard,
  LockKeyhole,
  LogOut,
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
            href="/settings"
          >
            <CalendarCheck size={16} strokeWidth={1.5} className="mr-2" /> Lịch
            Chiếu Theo Rạp
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            className="px-4 py-4 text-sm hover:bg-gray-100 flex items-center"
            href="/support"
          >
            <UserPen size={16} strokeWidth={1.5} className="mr-2" /> Thông Tin
            Tài Khoản
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            className="px-4 py-4 text-sm hover:bg-gray-100 flex items-center"
            href="/license"
          >
            <Clapperboard size={16} strokeWidth={1.5} className="mr-2" /> Phim
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            className="px-4 py-4 text-sm hover:bg-gray-100 flex items-center"
            href="/license"
          >
            <Siren size={16} strokeWidth={1.5} className="mr-2" /> Chính sách
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            className="px-4 py-4 text-sm hover:bg-gray-100 flex items-center"
            href="/license"
          >
            <CircleDollarSign size={16} strokeWidth={1.5} className="mr-2" />
            Gía vé
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            className="px-4 py-4 text-sm hover:bg-gray-100 flex items-center"
            href="/license"
          >
            <Newspaper size={16} strokeWidth={1.5} className="mr-2" /> Tin Tức
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            className="px-4 py-4 text-sm hover:bg-gray-100 flex items-center"
            href="/license"
          >
            <Contact size={16} strokeWidth={1.5} className="mr-2" /> Liên Hệ
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            className="px-4 py-4 text-sm hover:bg-gray-100 flex items-center"
            href="/"
          >
            <Milestone size={16} strokeWidth={1.5} className="mr-2" /> Giới
            Thiệu
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            className="px-4 py-4 text-sm hover:bg-gray-100 flex items-center"
            href="/license"
          >
            <Flame size={16} strokeWidth={1.5} className="mr-2" /> Thành Viên
          </Link>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}

export default MenuDropdown;
