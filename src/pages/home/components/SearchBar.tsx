import { useDispatch, useSelector } from "react-redux";
import AuthButton from "../../../components/Buttons/AuthButton";
import ButtonsThingy from "../../../components/ButtonsThingy";
import SearchSelect from "../../../components/SearchSelect";
import {
  setdisplaySearchBar,
  userHomeInitialStateType,
} from "../../../store/userHome.slice";

const SearchBar = () => {
  const dispatch = useDispatch();

  const toggleSearchBar = () => {
    dispatch(setdisplaySearchBar(false)); // or false
  };

  const { displaySearchBar }: userHomeInitialStateType = useSelector(
    (state: any) => state.userHomeSlice as userHomeInitialStateType
  );

  return (
    <div
      className={` ${
        displaySearchBar
          ? "fixed inset-0 z-50 flex items-center justify-center bg-opacity-90"
          : "hidden"
      } lg:block`}
    >
      <div className="bg-[#F4EAFF]  lg:bg-white rounded-xl py-4 lg:px-4 w-full h-full">
        <div className="flex items-center px-4 lg:px-1 my-4 lg:my-0">
          <button
            onClick={toggleSearchBar}
            className="cursor-pointer"
            aria-label="Toggle search bar"
          >
            <img
              src="/images/icons/arrow-back-circleIcon.png"
              alt=""
              className="lg:hidden w-10 h-full mr-4"
            />
          </button>

          <div className="w-[90%] lg:w-[40%]">
            <ButtonsThingy programs={["Schools", "Programs"]} />
          </div>
        </div>
        <div className="grid grid-cols md:grid-cols-3 lg:grid-cols-4 p-4 gap-4 bg-white rounded-4xl ">
          <SearchSelect label="School" options={[]} />
          <SearchSelect label="Program" options={[]} />
          <SearchSelect label="City" options={[]} />
          <SearchSelect label="Study Level" options={[]} />
          <SearchSelect label="Region" options={[]} />
          <SearchSelect label="Location" options={[]} />
          <SearchSelect label="By Geo-Localization" options={[]} />

          <div className="w-[30%] lg:w-full ">
            <AuthButton type="submit" loading={false} variant="primary">
              Search
            </AuthButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
