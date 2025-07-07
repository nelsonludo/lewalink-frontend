import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Filters from "./Filters";
import SearchBar from "./SearchBar";
import SearchResultCard from "../../../components/SearchResultCard";
import {
  setdisplayFilters,
  setdisplayMenu,
  setdisplaySearchBar,
  userHomeInitialStateType,
} from "../../../store/userHome.slice";
import { useUserGetSchools } from "../../../api/SchoolApi";
import { School, SchoolType } from "../../../types/entities/school";

const Univertities = () => {
  const dispatch = useDispatch();
  const { userGetSchools, loading } = useUserGetSchools();
  const { schools }: userHomeInitialStateType = useSelector(
    (state: any) => state.userHomeSlice as userHomeInitialStateType
  );
  const [searchResults, setSearchResults] = useState<School[]>(schools || []);

  // Memoized handler to avoid unnecessary re-renders
  const toggleFilters = useCallback(() => {
    dispatch(setdisplayFilters(true));
  }, [dispatch]);

  // Keep searchResults in sync with schools
  useEffect(() => {
    setSearchResults(schools || []);
  }, [schools]);

  // Fetch schools on mount
  useEffect(() => {
    userGetSchools({ type: SchoolType.PRIVATE_UNIVERSITY });
    // eslint-disable-next-line
  }, []);

  // Handle responsive UI state
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        dispatch(setdisplaySearchBar(false));
        dispatch(setdisplayMenu(false));
        dispatch(setdisplayFilters(false));
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  return (
    <div className="bg-[#F4EAFF]">
      <div className="w-full h-[20%]">
        <img
          src="/images/homeBanner.png"
          alt=""
          className="hidden lg:block w-full h-full"
        />
        <img
          src="/images/homeBannerMobile.png"
          alt=""
          className="lg:hidden w-full h-full"
        />
      </div>
      <div className="flex flex-row py-3 px-2 lg:px-10 gap-4">
        <Filters />
        <div className="w-full lg:w-[75%]">
          <SearchBar />
          <div className="border-b border-gray-400 pb-2 lg:p-4 mb-4 flex justify-between items-center">
            <div>
              <h2 className="text-xl lg:text-2xl font-semibold">
                Search results
              </h2>
              <h1 className="text-sm lg:text-md text-gray-400">
                Showing {searchResults.length} results
              </h1>
            </div>
            <button
              className="flex lg:hidden justify-end"
              onClick={toggleFilters}
              aria-label="Show filters"
              type="button"
            >
              <img src="/images/filter.png" alt="Filter" className="w-6 h-6" />
            </button>
          </div>
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <svg
                className="animate-spin h-8 w-8 text-purple-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="flex flex-col gap-4">
              {searchResults.map((result) => (
                <SearchResultCard
                  key={result.id}
                  schoolid={result.id}
                  schoolName={result.name}
                  type={result.type}
                  distance={result.distance}
                  location={result.country}
                  rating={result.rating}
                />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center py-10">
              <span className="text-gray-500 text-lg">
                No schools were found.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Univertities;
