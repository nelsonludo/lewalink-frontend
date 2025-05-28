// import { useSelector } from "react-redux";
// import { AuthInitialStateType } from "../store/auth.slice";

import { NavLink } from "react-router-dom";

type Props = {};

const Navbar = ({}: Props) => {
  // const { user }: AuthInitialStateType = useSelector(
  //   (state: any) => state.authSlice as AuthInitialStateType
  // );
  return (
    <div className="flex justify-between items-center py-4 px-12 bg-white">
      <div className="flex justify-center items-center">
        <img src="/images/LewaLinkLogo.png" alt="Logo" className="w-10 h-10" />
        <h2 className="text-lg sm:text-2xl">
          <strong>Lewa</strong>Link
        </h2>
      </div>
      <div className="flex items-center justify-between gap-8">
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
        <button className="cursor-pointer ">
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

export default Navbar;
