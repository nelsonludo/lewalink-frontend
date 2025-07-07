import { NavLink } from "react-router-dom";
import {
  setdisplayMenu,
  userHomeInitialStateType,
} from "../store/userHome.slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import ProfileMenu from "./ProfileMenu"; // Import the ProfileMenu component

const Menu = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { displayMenu }: userHomeInitialStateType = useSelector(
    (state: any) => state.userHomeSlice as userHomeInitialStateType
  );

    const profileMenuRef = useRef<HTMLDivElement>(null);


  const dispatch = useDispatch();

  const toggleMenu = () => {
    dispatch(setdisplayMenu(false)); // or false
  };

  

 useEffect(() => {
    if (!showProfileMenu) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showProfileMenu]);  

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
        {/* <NavLink
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
        </NavLink> */}
        <div className="flex items-center text-sm">
          {/* this image should render based on the language chosen once that's set up */}
          <img src="/images/cameroun.png" alt="" className="w-4 h-4" />
          <select name="language" id="language">
            <option value="en">ENG</option>
            <option value="fr">FR</option>
          </select>
        </div>
        <div className="relative" ref={profileMenuRef}>
          <button
            className="cursor-pointer flex flex-row gap-2 items-center"
            onClick={() => setShowProfileMenu((prev) => !prev)}
            
          >
            <span className="lg:hidden">Profile</span>
            <img
              src="/images/userCircle.png"
              alt="User profile icon showing a stylized person inside a circle, used for account access in the website navigation bar"
              className="w-9 h-9"
            />
          </button>
          {showProfileMenu && (
            <ProfileMenu
              show={showProfileMenu}
              setShow={setShowProfileMenu}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;