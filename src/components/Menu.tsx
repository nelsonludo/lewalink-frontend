import { NavLink } from "react-router-dom";
import {
  setdisplayMenu,
  userHomeInitialStateType,
} from "../store/userHome.slice";
import { useDispatch, useSelector } from "react-redux";

const Menu = () => {
  const { displayMenu }: userHomeInitialStateType = useSelector(
    (state: any) => state.userHomeSlice as userHomeInitialStateType
  );

  const dispatch = useDispatch();

  const toggleMenu = () => {
    dispatch(setdisplayMenu(false)); // or false
  };

  return (
    <div
      className={` ${
        displayMenu
          ? "fixed inset-0 z-50 flex items-start justify-end bg-white bg-opacity-90 w-[70%] ml-[30%] px-6 shadow-xl"
          : "hidden"
      } lg:block`}
    >
      <div className="flex  flex-col lg:flex-row items-end lg:items-center justify-between gap-8 w-full ">
        <div className="flex items-center lg:px-1 my-4 lg:my-0 w-full justify-between lg:hidden">
          <span className="text-lg font-bold lg:hidden">Menu</span>
          <button
            onClick={toggleMenu}
            className="cursor-pointer"
            aria-label="Toggle search bar"
          >
            <img
              src="/images/icons/arrow-back-circleIcon.png"
              alt=""
              className="lg:hidden w-10 h-full "
            />
          </button>
        </div>
        <NavLink
          to="/home/universities"
          className={({ isActive }: { isActive: boolean }) =>
            isActive ? "border-b-2 border-[#BB29FF] font-bold pb-1" : "pb-1"
          }
        >
          Universities
        </NavLink>
        <NavLink
          to="/home/secondary-schools"
          className={({ isActive }: { isActive: boolean }) =>
            isActive ? "border-b-2 border-[#BB29FF] font-bold pb-1" : "pb-1"
          }
        >
          Secondary schools
        </NavLink>
        <NavLink
          to="/home/primary-schools"
          className={({ isActive }: { isActive: boolean }) =>
            isActive ? "border-b-2 border-[#BB29FF] font-bold pb-1" : "pb-1"
          }
        >
          Primary schools
        </NavLink>
        <div className="flex items-center text-sm">
          {/* this image should render based on the language chosen once that's set up */}
          <img src="/images/cameroun.png" alt="" className="w-4 h-4" />
          <select name="language" id="language">
            <option value="en">ENG</option>
            <option value="fr">FR</option>
          </select>
        </div>
        <button className="cursor-pointer  flex flex-row gap-2 items-center">
          <span className="lg:hidden">Profile</span>
          <img
            src="/images/userCircle.png"
            alt="User profile icon showing a stylized person inside a circle, used for account access in the website navigation bar"
            className="w-9 h-9"
          />
        </button>
      </div>
    </div>
  );
};

export default Menu;
