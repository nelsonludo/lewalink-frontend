// import { useSelector } from "react-redux";
// import { AuthInitialStateType } from "../store/auth.slice";

import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { setdisplaySearchBar, setdisplayMenu } from "../store/userHome.slice";
import Menu from "./Menu";

type Props = {};

const Navbar = ({}: Props) => {
  const dispatch = useDispatch();

  const toggleSearchBar = () => {
    dispatch(setdisplaySearchBar(true)); // or false
  };
  const toggleMenu = () => {
    dispatch(setdisplayMenu(true)); // or false
  };

  return (
    <div className="flex justify-between items-center py-4 px-4 lg:px-12 bg-white">
      <div className="flex justify-center items-center">
        <img src="/images/LewaLinkLogo.png" alt="Logo" className="w-10 h-10" />
        <h2 className="hidden lg:flex text-lg sm:text-2xl">
          <strong>Lewa</strong>Link
        </h2>
      </div>

      <Menu />
      <div className="flex lg:hidden gap-4 items-center">
        <button
          onClick={toggleSearchBar}
          className="cursor-pointer"
          aria-label="Toggle search bar"
        >
          <img
            src="/images/icons/searchIcon.png"
            alt="Search icon"
            className="w-7 h-7"
          />
        </button>
        <button
          onClick={toggleMenu}
          className="cursor-pointer"
          aria-label="Toggle search bar"
        >
          <img
            src="/images/icons/menuIcon.png"
            alt="Search icon"
            className="w-8 h-8"
          />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
