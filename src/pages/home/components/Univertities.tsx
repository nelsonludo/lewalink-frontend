import { useState } from "react";
import Filters from "./Filters";
import SearchBar from "./SearchBar";
import SearchResultCard from "../../../components/SearchResultCard";

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
  return (
    <div className="bg-[#F4EAFF]">
      <div className="w-full h-50">
        <img src="/images/homeBanner.png" alt="" className="w-full h-full" />
      </div>
      <div className="flex flex-row py-5 px-10 gap-4">
        <div className="w-[25%]">
          <Filters />
        </div>
        <div className="w-[75%]">
          <SearchBar />
          <div className="border-b border-gray-400 p-4 mb-4">
            <h2 className="text-2xl font-semibold ">Search results</h2>
            <h1 className="text-gray-400 ">
              Showing {searchResults.length} results
            </h1>
          </div>
          <div className="flex flex-col gap-4">
            {searchResults.map((result, index) => (
              <SearchResultCard
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
