import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useSearchParams } from "react-router-dom";
import {
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { SchoolFilterType, OrderByType } from "../api/SchoolApi";
import { schoolTypes, programTypes, programFields } from "../utils/constants";
import { ProgramFieldType, ProgramType } from "../types/entities/program";
import { SchoolType } from "../types/entities/school";
import Modal from "./Modal";

const orderByTypes = [
  { title: "Ascending", value: OrderByType.ASC },
  { title: "Descending", value: OrderByType.DESC },
];

type Props = {
  filter: SchoolFilterType;
  setFilters: Dispatch<SetStateAction<SchoolFilterType>>;
  total?: number;
};

const MobileFilters = ({ filter, setFilters }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [openModal, setOpenModal] = useState(false);

  // Dropdown states
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Local states
  const [schoolName, setSchoolName] = useState<string>("");
  const [programName, setProgramName] = useState<string>("");
  const [city, setCity] = useState<string | undefined>(undefined);
  const [country, setCountry] = useState<string | undefined>(undefined);
  const [programMinPrice, setProgramMinPrice] = useState<number | undefined>(
    undefined
  );
  const [programMaxPrice, setProgramMaxPrice] = useState<number | undefined>(
    undefined
  );

  const handleFilterChange = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    setSearchParams(newParams);
  };

  const handleFilterReset = (key: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(key);
    setSearchParams(newParams);
  };

  const handleLocationChange = ({
    latitude,
    longitude,
  }: {
    latitude: string;
    longitude: string;
  }) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("longitude", longitude);
    newParams.set("latitude", latitude);
    setSearchParams(newParams);
  };

  const handleResetLocation = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("latitude");
    newParams.delete("longitude");
    setSearchParams(newParams);
  };

  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  // Initialize local states from URL params
  useEffect(() => {
    if (searchParams.get("name")) {
      setSchoolName(searchParams.get("name") || "");
    }
    if (searchParams.get("programName")) {
      setProgramName(searchParams.get("programName") || "");
    }
    if (searchParams.get("programMinPrice")) {
      setProgramMinPrice(Number(searchParams.get("programMinPrice")));
    }
    if (searchParams.get("programMaxPrice")) {
      setProgramMaxPrice(Number(searchParams.get("programMaxPrice")));
    }
    if (searchParams.get("city")) {
      setCity(searchParams.get("city") || "");
    }
    if (searchParams.get("country")) {
      setCountry(searchParams.get("country") || "");
    }
  }, []);

  // Update filters when URL params change
  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    setFilters({
      name: params.name || undefined,
      programName: params.programName || undefined,
      latitude: params.latitude || undefined,
      longitude: params.longitude || undefined,
      country: params.country || undefined,
      city: params.city || undefined,
      type: params.type as SchoolType | undefined,
      programMinPrice: params.programMinPrice
        ? Number(params.programMinPrice)
        : undefined,
      programMaxPrice: params.programMaxPrice
        ? Number(params.programMaxPrice)
        : undefined,
      orderByRating: params.orderByRating as OrderByType | undefined,
      orderByVisits: params.orderByVisits as OrderByType | undefined,
      orderByDistance: params.orderByDistance as OrderByType | undefined,
      programField: params.programField as ProgramFieldType | undefined,
      programType: params.programType as ProgramType | undefined,
    });
  }, [searchParams, setFilters]);

  return (
    <div className="bg-white rounded-xl  p-4 w-full overflow-y-auto lg:hidden">
      <div className="flex items-center gap-4 mb-4">
        {/* Search by school name */}
        <div className=" w-full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (schoolName) {
                handleFilterChange("name", schoolName);
              } else {
                handleFilterReset("name");
              }
            }}
          >
            <input
              type="text"
              placeholder="Search school name"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              className="w-full p-2.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </form>
        </div>

        {/* Search by program name */}
        <div className=" w-full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (programName) {
                handleFilterChange("programName", programName);
              } else {
                handleFilterReset("programName");
              }
            }}
          >
            <input
              type="text"
              placeholder="Search program name"
              value={programName}
              onChange={(e) => setProgramName(e.target.value)}
              className="w-full p-2.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </form>
        </div>
      </div>
      {/* Show filters button  */}
      <button
        type="button"
        onClick={() => setOpenModal(true)}
        className="inline-flex w-fit items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <CheckCircleIcon aria-hidden="true" className="-ml-0.5 size-5" />
        Show filters
      </button>

      <Modal
        open={openModal}
        clickOutside={true}
        setOpen={(visible) => {
          if (!visible) {
            setOpenModal(visible);
          }
        }}
        title={`Add Filter`}
        dontShowButton={true}
        xlSize="1"
      >
        <div className="space-y-4 text-sm max-h-[60vh] overflow-y-auto scroll-bar-width-none px-1 ">
          {/* Search by school name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              School Name
            </label>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (schoolName) {
                  handleFilterChange("name", schoolName);
                } else {
                  handleFilterReset("name");
                }
              }}
            >
              <input
                type="text"
                placeholder="Search school name"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="w-full p-2.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </form>
          </div>

          {/* Search by program name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Program Name
            </label>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (programName) {
                  handleFilterChange("programName", programName);
                } else {
                  handleFilterReset("programName");
                }
              }}
            >
              <input
                type="text"
                placeholder="Search program name"
                value={programName}
                onChange={(e) => setProgramName(e.target.value)}
                className="w-full p-2.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </form>
          </div>

          {/* School Type Dropdown */}
          <div>
            <button
              onClick={() => toggleDropdown("schoolType")}
              className="w-full flex items-center justify-between p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500"
            >
              <span className="font-semibold text-gray-700">
                {schoolTypes.find((item) => item.value === filter.type)
                  ?.title || "School Type"}
              </span>
              {openDropdown === "schoolType" ? (
                <ChevronUpIcon className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-gray-400" />
              )}
            </button>
            {openDropdown === "schoolType" && (
              <div className="mt-2 p-3 bg-gray-50 rounded-lg border">
                {schoolTypes.map((item) => (
                  <div
                    key={item.value}
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-white"
                  >
                    <input
                      id={item.value}
                      name="schoolType"
                      checked={filter.type === item.value}
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleFilterChange("type", item.value);
                        }
                      }}
                      type="radio"
                      className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor={item.value}
                      className="text-sm text-gray-700 cursor-pointer"
                    >
                      {item.title}
                    </label>
                  </div>
                ))}
                {filter.type && (
                  <button
                    onClick={() => handleFilterReset("type")}
                    className="mt-2 px-3 py-1 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100"
                  >
                    Reset
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Location Dropdown */}
          <div>
            <button
              onClick={() => toggleDropdown("location")}
              className="w-full flex items-center justify-between p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500"
            >
              <span className="font-semibold text-gray-700">
                {filter.city && `${filter.city}`}
                {filter.country && ` - ${filter.country}`}
                {!filter.city && !filter.country && "Location"}
              </span>
              {openDropdown === "location" ? (
                <ChevronUpIcon className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-gray-400" />
              )}
            </button>
            {openDropdown === "location" && (
              <div className="mt-2 p-3 bg-gray-50 rounded-lg border space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="Enter city"
                    value={city || ""}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (city) {
                          handleFilterChange("city", city);
                        } else {
                          handleFilterReset("city");
                          setCity(undefined);
                        }
                      }
                    }}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
                  />
                  {filter.city && (
                    <button
                      onClick={() => {
                        handleFilterReset("city");
                        setCity(undefined);
                      }}
                      className="mt-1 px-2 py-1 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100"
                    >
                      Reset City
                    </button>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    placeholder="Enter country"
                    value={country || ""}
                    onChange={(e) => setCountry(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (country) {
                          handleFilterChange("country", country);
                        } else {
                          handleFilterReset("country");
                          setCountry(undefined);
                        }
                      }
                    }}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
                  />
                  {filter.country && (
                    <button
                      onClick={() => {
                        handleFilterReset("country");
                        setCountry(undefined);
                      }}
                      className="mt-1 px-2 py-1 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100"
                    >
                      Reset Country
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Program Type Dropdown */}
          <div>
            <button
              onClick={() => toggleDropdown("programType")}
              className="w-full flex items-center justify-between p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500"
            >
              <span className="font-semibold text-gray-700">
                {programTypes.find((item) => item.value === filter.programType)
                  ?.title || "Program Type"}
              </span>
              {openDropdown === "programType" ? (
                <ChevronUpIcon className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-gray-400" />
              )}
            </button>
            {openDropdown === "programType" && (
              <div className="mt-2 p-3 bg-gray-50 rounded-lg border">
                {programTypes.map((item) => (
                  <div
                    key={item.value}
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-white"
                  >
                    <input
                      id={item.value}
                      name="programType"
                      checked={filter.programType === item.value}
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleFilterChange("programType", item.value);
                        }
                      }}
                      type="radio"
                      className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor={item.value}
                      className="text-sm text-gray-700 cursor-pointer"
                    >
                      {item.title}
                    </label>
                  </div>
                ))}
                {filter.programType && (
                  <button
                    onClick={() => handleFilterReset("programType")}
                    className="mt-2 px-3 py-1 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100"
                  >
                    Reset
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Program Field Dropdown */}
          <div>
            <button
              onClick={() => toggleDropdown("programField")}
              className="w-full flex items-center justify-between p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500"
            >
              <span className="font-semibold text-gray-700">
                {programFields.find(
                  (item) => item.value === filter.programField
                )?.title || "Program Field"}
              </span>
              {openDropdown === "programField" ? (
                <ChevronUpIcon className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-gray-400" />
              )}
            </button>
            {openDropdown === "programField" && (
              <div className="mt-2 p-3 bg-gray-50 rounded-lg border">
                {programFields.map((item) => (
                  <div
                    key={item.value}
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-white"
                  >
                    <input
                      id={item.value}
                      name="programField"
                      checked={filter.programField === item.value}
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleFilterChange("programField", item.value);
                        }
                      }}
                      type="radio"
                      className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor={item.value}
                      className="text-sm text-gray-700 cursor-pointer"
                    >
                      {item.title}
                    </label>
                  </div>
                ))}
                {filter.programField && (
                  <button
                    onClick={() => handleFilterReset("programField")}
                    className="mt-2 px-3 py-1 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100"
                  >
                    Reset
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Program Price Dropdown */}
          <div>
            <button
              onClick={() => toggleDropdown("programPrice")}
              className="w-full flex items-center justify-between p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500"
            >
              <span className="font-semibold text-gray-700">
                {filter.programMinPrice && `${filter.programMinPrice}`}
                {filter.programMaxPrice && ` - ${filter.programMaxPrice}`}
                {!filter.programMinPrice &&
                  !filter.programMaxPrice &&
                  "Program Price"}
              </span>
              {openDropdown === "programPrice" ? (
                <ChevronUpIcon className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-gray-400" />
              )}
            </button>
            {openDropdown === "programPrice" && (
              <div className="mt-2 p-3 bg-gray-50 rounded-lg border space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Minimum Price
                  </label>
                  <input
                    type="number"
                    placeholder="Enter minimum price"
                    value={programMinPrice || ""}
                    onChange={(e) => setProgramMinPrice(Number(e.target.value))}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (programMinPrice) {
                          handleFilterChange(
                            "programMinPrice",
                            programMinPrice.toString()
                          );
                        } else {
                          handleFilterReset("programMinPrice");
                          setProgramMinPrice(undefined);
                        }
                      }
                    }}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
                  />
                  {filter.programMinPrice && (
                    <button
                      onClick={() => {
                        handleFilterReset("programMinPrice");
                        setProgramMinPrice(undefined);
                      }}
                      className="mt-1 px-2 py-1 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100"
                    >
                      Reset Min Price
                    </button>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Maximum Price
                  </label>
                  <input
                    type="number"
                    placeholder="Enter maximum price"
                    value={programMaxPrice || ""}
                    onChange={(e) => setProgramMaxPrice(Number(e.target.value))}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (programMaxPrice) {
                          handleFilterChange(
                            "programMaxPrice",
                            programMaxPrice.toString()
                          );
                        } else {
                          handleFilterReset("programMaxPrice");
                          setProgramMaxPrice(undefined);
                        }
                      }
                    }}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
                  />
                  {filter.programMaxPrice && (
                    <button
                      onClick={() => {
                        handleFilterReset("programMaxPrice");
                        setProgramMaxPrice(undefined);
                      }}
                      className="mt-1 px-2 py-1 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100"
                    >
                      Reset Max Price
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Order by Rating Dropdown */}
          <div>
            <button
              onClick={() => toggleDropdown("orderByRating")}
              className="w-full flex items-center justify-between p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500"
            >
              <span className="font-semibold text-gray-700">
                Order by Rating
                {filter.orderByRating &&
                  ` - ${
                    orderByTypes.find(
                      (item) => item.value === filter.orderByRating
                    )?.title
                  }`}
              </span>
              {openDropdown === "orderByRating" ? (
                <ChevronUpIcon className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-gray-400" />
              )}
            </button>
            {openDropdown === "orderByRating" && (
              <div className="mt-2 p-3 bg-gray-50 rounded-lg border">
                {orderByTypes.map((item) => (
                  <div
                    key={item.value}
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-white"
                  >
                    <input
                      id={`rating-${item.value}`}
                      name="orderByRating"
                      checked={filter.orderByRating === item.value}
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleFilterChange("orderByRating", item.value);
                        }
                      }}
                      type="radio"
                      className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor={`rating-${item.value}`}
                      className="text-sm text-gray-700 cursor-pointer"
                    >
                      {item.title}
                    </label>
                  </div>
                ))}
                {filter.orderByRating && (
                  <button
                    onClick={() => handleFilterReset("orderByRating")}
                    className="mt-2 px-3 py-1 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100"
                  >
                    Reset
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Order by Visits Dropdown */}
          <div>
            <button
              onClick={() => toggleDropdown("orderByVisits")}
              className="w-full flex items-center justify-between p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500"
            >
              <span className="font-semibold text-gray-700">
                Order by Visits
                {filter.orderByVisits &&
                  ` - ${
                    orderByTypes.find(
                      (item) => item.value === filter.orderByVisits
                    )?.title
                  }`}
              </span>
              {openDropdown === "orderByVisits" ? (
                <ChevronUpIcon className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-gray-400" />
              )}
            </button>
            {openDropdown === "orderByVisits" && (
              <div className="mt-2 p-3 bg-gray-50 rounded-lg border">
                {orderByTypes.map((item) => (
                  <div
                    key={item.value}
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-white"
                  >
                    <input
                      id={`visits-${item.value}`}
                      name="orderByVisits"
                      checked={filter.orderByVisits === item.value}
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleFilterChange("orderByVisits", item.value);
                        }
                      }}
                      type="radio"
                      className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor={`visits-${item.value}`}
                      className="text-sm text-gray-700 cursor-pointer"
                    >
                      {item.title}
                    </label>
                  </div>
                ))}
                {filter.orderByVisits && (
                  <button
                    onClick={() => handleFilterReset("orderByVisits")}
                    className="mt-2 px-3 py-1 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100"
                  >
                    Reset
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Order by Distance Dropdown (only show if location is set) */}
          {filter.longitude && filter.latitude && (
            <div>
              <button
                onClick={() => toggleDropdown("orderByDistance")}
                className="w-full flex items-center justify-between p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500"
              >
                <span className="font-semibold text-gray-700">
                  Order by Distance
                  {filter.orderByDistance &&
                    ` - ${
                      orderByTypes.find(
                        (item) => item.value === filter.orderByDistance
                      )?.title
                    }`}
                </span>
                {openDropdown === "orderByDistance" ? (
                  <ChevronUpIcon className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                )}
              </button>
              {openDropdown === "orderByDistance" && (
                <div className="mt-2 p-3 bg-gray-50 rounded-lg border">
                  {orderByTypes.map((item) => (
                    <div
                      key={item.value}
                      className="flex items-center gap-3 p-2 rounded-md hover:bg-white"
                    >
                      <input
                        id={`distance-${item.value}`}
                        name="orderByDistance"
                        checked={filter.orderByDistance === item.value}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleFilterChange("orderByDistance", item.value);
                          }
                        }}
                        type="radio"
                        className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`distance-${item.value}`}
                        className="text-sm text-gray-700 cursor-pointer"
                      >
                        {item.title}
                      </label>
                    </div>
                  ))}
                  {filter.orderByDistance && (
                    <button
                      onClick={() => handleFilterReset("orderByDistance")}
                      className="mt-2 px-3 py-1 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100"
                    >
                      Reset
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Geolocation Toggle */}
          <div className="flex items-center gap-3 p-3 bg-white border border-gray-300 rounded-lg">
            <input
              type="checkbox"
              id="geo"
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              checked={filter.longitude && filter.latitude ? true : false}
              onChange={(e) => {
                if (e.target.checked) {
                  navigator.geolocation.getCurrentPosition((data) => {
                    if (data.coords.latitude && data.coords.longitude) {
                      handleLocationChange({
                        latitude: data.coords.latitude.toString(),
                        longitude: data.coords.longitude.toString(),
                      });
                    }
                  });
                } else {
                  handleResetLocation();
                }
              }}
            />
            <label
              htmlFor="geo"
              className="text-sm font-medium text-gray-700 cursor-pointer"
            >
              Use my location for distance-based sorting
            </label>
          </div>

          <div className=" flex items-center justify-end">
            <button
              type="button"
              onClick={() => setOpenModal(false)}
              className="inline-flex w-fit items-center gap-x-2 rounded-md bg-indigo-600 px-2 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <CheckCircleIcon aria-hidden="true" className="-ml-0.5 size-5" />
              Apply filters
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MobileFilters;
