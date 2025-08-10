import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SearchResultCard from "../../../components/SearchResultCard";
import {
  setdisplayFilters,
  setdisplayMenu,
  setdisplaySearchBar,
} from "../../../store/userHome.slice";
import { SchoolFilterType, useUserGetSchools } from "../../../api/SchoolApi";
import SearchFilters from "../../../components/SearchFilters";
import Pagination from "../../../components/Pagination";
import MobileFilters from "../../../components/MobileFilters";
// import MobileFilters from "../../../components/MobileFilters";

const Univertities = () => {
  const dispatch = useDispatch();
  const { userGetSchools, loading, schools, totalItems, totalPages } =
    useUserGetSchools();

  const [filters, setFilters] = useState<SchoolFilterType>({});
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  const handlePageSelected = (page: number) => {
    setPage(page);
  };

  // Fetch schools on mount
  useEffect(() => {
    userGetSchools({
      filters,
      page,
      pageSize,
    });
    // eslint-disable-next-line
  }, [filters, page, pageSize]);

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
        <div className=" w-full">
          <div className=" mb-3">
            <MobileFilters
              filter={filters}
              setFilters={setFilters}
              total={schools.length}
            />
          </div>
          <div className=" mb-3">
            <SearchFilters
              filter={filters}
              setFilters={setFilters}
              total={schools.length}
            />
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
          ) : schools.length > 0 ? (
            <div className="flex flex-col gap-4">
              {schools.map((result) => (
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

          <div className="mt-6 flex justify-end">
            <Pagination
              padding="p-0"
              border=""
              currentPage={page}
              total={totalPages}
              pageSize={pageSize}
              totalItems={totalItems}
              onPageSelected={handlePageSelected}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Univertities;
