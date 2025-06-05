import { useState } from "react";
import Filters from "./Filters";
import SearchBar from "./SearchBar";
import SearchResultCard from "../../../components/SearchResultCard";
import {
  setdisplayFilters,
  setdisplayMenu,
} from "../../../store/userHome.slice";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setdisplaySearchBar } from "../../../store/userHome.slice";

const Univertities = () => {
  const [searchResults, setSearchResults] = useState([
    {
      schoolName: "Harvard University",
      speciality: "Computer Science",
      location: "Cambridge, MA",
      time: "Full-time",
      duration: "4 years",
      diploma: "Bachelor's Degree",
      language: "English",
      coursesNumber: 120,
    },
    {
      schoolName: "Harvard University",
      speciality: "Computer Science",
      location: "Cambridge, MA",
      time: "Full-time",
      duration: "4 years",
      diploma: "Bachelor's Degree",
      language: "English",
      coursesNumber: 120,
    },
  ]);

  const dispatch = useDispatch();

  const toggleFilters = () => {
    dispatch(setdisplayFilters(true)); // or false
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        dispatch(setdisplaySearchBar(false));
        dispatch(setdisplayMenu(false));
        dispatch(setdisplayFilters(false));
      }
    };

    window.addEventListener("resize", handleResize);

    // Run once on mount
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
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

        <div className=" w-full lg:w-[75%] ">
          <SearchBar />

          <div className="border-b border-gray-400 pb-2 lg:p-4 mb-4 flex justify-between items-center">
            <div>
              <h2 className="text-xl lg:text-2xl font-semibold ">
                Search results
              </h2>
              <h1 className="text-sm lg:text-md text-gray-400 ">
                Showing {searchResults.length} results
              </h1>
            </div>
            <button
              className="flex lg:hidden justify-end"
              onClick={toggleFilters}
            >
              <img src="/images/filter.png" alt="" className="w-6 h-6" />
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {searchResults.map((result, index) => (
              <SearchResultCard
                schoolid="2"
                schoolName={result.schoolName}
                speciality={result.speciality}
                language={result.language}
                duration={result.duration}
                time={result.time}
                diploma={result.diploma}
                location={result.location}
                coursesNumber={result.coursesNumber}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Univertities;
