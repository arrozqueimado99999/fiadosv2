import { NavLink } from "react-router-dom";
import BtnLink from "./components/buttons/BtnLink";
import { HiHome, HiUserGroup } from "react-icons/hi";

function SideBar({ isOpen, toggleNav }) {
  return (
    <nav
      className={`fixed top-0 left-0 w-64 h-full bg-white drop-shadow-md flex-col gap-2 items-center justify-start transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } sm:relative sm:translate-x-0 sm:w-2/12 md:w-fit p-3 hidden sm:flex`}
    >
      <BtnLink icon={<HiHome />} text={'Início'} to={'/'} />
      <BtnLink icon={<HiUserGroup />} text={'Clientes'} to={'/clientes'} />
    </nav>
  );
}

export default SideBar;
