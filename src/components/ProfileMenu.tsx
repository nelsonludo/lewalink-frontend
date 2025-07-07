import { NavLink } from "react-router-dom";


interface ProfileMenuProps {
  show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({show, setShow}) => {
  

  if (!show) return null;

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
        <div className="px-4 py-2 border-b">
          <span className="font-semibold">John Doe</span>
          <p className="text-xs text-gray-500">johndoe@email.com</p>
        </div>
        <ul>
          <li>
            <NavLink
              to="/profile"
              className="block px-4 py-2 hover:bg-gray-100"
              onClick={() => setShow(false)}
            >
              My Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className="block px-4 py-2 hover:bg-gray-100"
              onClick={() => setShow(false)}
            >
              Settings
            </NavLink>
          </li>
          <li>
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                // handle logout here
                setShow(false);
              }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
    );
  };
  
  export default ProfileMenu;