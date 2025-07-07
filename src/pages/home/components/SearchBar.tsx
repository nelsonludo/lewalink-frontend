import { useDispatch, useSelector } from "react-redux";
import AuthButton from "../../../components/Buttons/AuthButton";
import ButtonsThingy from "../../../components/ButtonsThingy";
import SearchSelect from "../../../components/SearchSelect";
import {
  setdisplaySearchBar,
  userHomeInitialStateType,
} from "../../../store/userHome.slice";
import { useState } from "react";
import SearchInput from "../../../components/SearchInput";
import { useUserGetSchools } from "../../../api/SchoolApi";
import { SchoolType } from "../../../types/entities/school";

const SearchBar = () => {
  const dispatch = useDispatch();
  const tabs = ["Schools", "Programs"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [schoolSearch, setSchoolSearch] = useState({
    type: "",
    city: "",
    country: "",
  });

  const { userGetSchools } = useUserGetSchools();

  const handleSchoolSearch = () => {
    // Implement search logic here
    userGetSchools(schoolSearch);
  };

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
      <form
        className="bg-[#F4EAFF]  lg:bg-white rounded-xl py-4 lg:px-4 w-full h-full"
        onSubmit={(e) => {
          e.preventDefault();
          handleSchoolSearch();
        }}
      >
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
            <ButtonsThingy
              programs={tabs}
              selectedProgram={selectedTab}
              setSelectedProgram={setSelectedTab}
            />
          </div>
        </div>
        {selectedTab === "Schools" ? (
          <div className="grid grid-cols md:grid-cols-3 lg:grid-cols-4 p-4 gap-4 bg-white rounded-4xl ">
            <SearchInput
              label="Country"
              value={schoolSearch.country}
              setValue={(value) =>
                setSchoolSearch({ ...schoolSearch, country: value })
              }
            />
            <SearchInput
              label="City"
              value={schoolSearch.city}
              setValue={(value) =>
                setSchoolSearch({ ...schoolSearch, city: value })
              }
            />
            <SearchSelect
              label="Type"
              options={Object.values(SchoolType)}
              selected={schoolSearch.type}
              setSelected={(value) =>
                setSchoolSearch({ ...schoolSearch, type: value })
              }
            />

            <div className="w-[30%] lg:w-full h-full flex items-center justify-center">
              <AuthButton
                type="submit"
                loading={false}
                variant="primary"
                onClick={() => handleSchoolSearch()}
              >
                Search
              </AuthButton>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols md:grid-cols-3 lg:grid-cols-4 p-4 gap-4 bg-white rounded-4xl ">
            <SearchSelect
              label="School"
              options={Object.values(SchoolType)}
              selected={schoolSearch.type}
              setSelected={(value) =>
                setSchoolSearch({ ...schoolSearch, type: value })
              }
            />
            <SearchSelect
              label="Program"
              options={Object.values(SchoolType)}
              selected={schoolSearch.type}
              setSelected={(value) =>
                setSchoolSearch({ ...schoolSearch, type: value })
              }
            />
            <SearchSelect
              label="City"
              options={Object.values(SchoolType)}
              selected={schoolSearch.type}
              setSelected={(value) =>
                setSchoolSearch({ ...schoolSearch, type: value })
              }
            />
            <SearchSelect
              label="Study Level"
              options={Object.values(SchoolType)}
              selected={schoolSearch.type}
              setSelected={(value) =>
                setSchoolSearch({ ...schoolSearch, type: value })
              }
            />
            <SearchSelect
              label="Region"
              options={Object.values(SchoolType)}
              selected={schoolSearch.type}
              setSelected={(value) =>
                setSchoolSearch({ ...schoolSearch, type: value })
              }
            />
            <SearchSelect
              label="Location"
              options={Object.values(SchoolType)}
              selected={schoolSearch.type}
              setSelected={(value) =>
                setSchoolSearch({ ...schoolSearch, type: value })
              }
            />
            <SearchSelect
              label="By Geo-Localization"
              options={Object.values(SchoolType)}
              selected={schoolSearch.type}
              setSelected={(value) =>
                setSchoolSearch({ ...schoolSearch, type: value })
              }
            />

            <div className="w-[30%] lg:w-full h-full flex items-center justify-center">
              <AuthButton type="submit" loading={false} variant="primary">
                Search
              </AuthButton>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
