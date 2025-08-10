import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

import { useSearchParams } from "react-router-dom";
import { OrderByType, SchoolFilterType } from "../api/SchoolApi";
import { SchoolType } from "../types/entities/school";
import { programFields, programTypes, schoolTypes } from "../utils/constants";
import { ProgramFieldType, ProgramType } from "../types/entities/program";

const orderByTypes = [
  { title: "Ascending", value: OrderByType.ASC },
  { title: "Descending", value: OrderByType.DESC },
];

type Props = {
  filter: SchoolFilterType;
  setFilters: Dispatch<SetStateAction<SchoolFilterType>>;
  total?: number;
};

const SearchFilters = ({ filter, setFilters, total }: Props) => {
  // Search params
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
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

  const handleFilterReset = (key: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(key);
    setSearchParams(newParams);
  };

  // Local states
  const [name, setName] = useState("");
  const [programName, setProgramName] = useState("");
  const [city, setCity] = useState<string | undefined>();
  const [country, setCountry] = useState<string | undefined>();
  const [programMinPrice, setProgramMinPrice] = useState<number | undefined>();
  const [programMaxPrice, setProgramMaxPrice] = useState<number | undefined>();

  useEffect(() => {
    if (searchParams.get("name")) {
      setName(searchParams.get("name") || "");
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
  }, [searchParams]);

  return (
    <div className=" p-4 bg-white rounded-lg lg:block hidden">
      <div className=" flex items-center gap-3 mb-3">
        {/* Search by school name: Done */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (name) {
              handleFilterChange("name", name);
            } else {
              handleFilterReset("name");
            }
          }}
          className=" flex-grow"
        >
          <input
            type="text"
            placeholder="School name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className=" block w-full sm:flex-grow-0   p-2.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 "
          />
        </form>

        {/* Search by program name: Done */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (programName) {
              handleFilterChange("programName", programName);
            } else {
              handleFilterReset("programName");
            }
          }}
          className=" flex-grow"
        >
          <input
            type="text"
            placeholder="Program name"
            value={programName}
            onChange={(e) => setProgramName(e.target.value)}
            className=" block w-full sm:flex-grow-0   p-2.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 "
          />
        </form>
        {/* School type */}
        <Menu as="div" className="relative inline-block">
          <MenuButton className="inline-flex items-center justify-center gap-x-1.5 rounded-full bg-white  py-2 px-3 text-sm font-medium text-gray-700 shadow-sm border border-gray-300 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200">
            {schoolTypes.find((item) => item.value === filter.type)?.title ||
              "School type"}

            <ChevronDownIcon
              aria-hidden="true"
              className="-mr-1 size-4 text-gray-400"
            />
          </MenuButton>

          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-[300px] origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none transition-all transform data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in p-2"
          >
            <div className="py-1">
              {schoolTypes.map((item) => {
                return (
                  <div className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 transition-colors duration-150">
                    <div className=" group flex items-center ">
                      <input
                        id={item.value}
                        name={item.value}
                        checked={filter.type === item.value}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleFilterChange("type", item.value);
                          }
                        }}
                        type="radio"
                        aria-describedby="comments-description"
                        className="relative size-5 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                      />
                    </div>
                    <div className="text-base">
                      <label
                        htmlFor={item.value}
                        className="text-sm font-medium text-gray-700 cursor-pointer select-none"
                      >
                        {item.title}
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
            {filter.type && (
              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  onClick={() => {
                    handleFilterReset("type");
                  }}
                  type="button"
                  className="rounded bg-red-50 py-2 px-3 text-xs font-semibold text-red-600 shadow-sm hover:bg-red-100"
                >
                  Réinitialiser
                </button>
              </div>
            )}
          </MenuItems>
        </Menu>

        {/* Location  */}
        <Menu as="div" className="relative inline-block">
          <MenuButton className="inline-flex items-center justify-center gap-x-1.5 rounded-full bg-white py-2 px-3 text-sm font-medium text-gray-700 shadow-sm border border-gray-300 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200">
            {filter.city && `${filter.city}`}
            {filter.country && ` - ${filter.country}`}
            {!filter.city && !filter.country && "Location"}
            <ChevronDownIcon
              aria-hidden="true"
              className="-mr-1 size-5 text-gray-400"
            />
          </MenuButton>

          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-[300px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in p-3 "
          >
            <div>
              <label
                htmlFor="city"
                className="block text-sm/6 font-medium text-gray-900 mb-1"
              >
                City
              </label>
              <input
                id="city"
                name="city"
                placeholder="Ou recherchez-vous ?"
                value={city || ""}
                onChange={(e) => setCity(e.target.value)}
                className="block w-[100%] rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    e.stopPropagation();

                    if (city) {
                      handleFilterChange("city", city.toString());
                    } else {
                      handleFilterReset("city");
                      setCity(undefined);
                    }
                  } else if (e.key === " ") {
                    e.stopPropagation();
                  }
                }}
              />
              {filter.city && (
                <div className="flex items-center justify-end gap-2 pt-3">
                  <button
                    onClick={() => {
                      handleFilterReset("city");
                      setCity(undefined);
                    }}
                    type="button"
                    className="rounded bg-red-50 py-2 px-3 text-xs font-semibold text-red-600 shadow-sm hover:bg-red-100"
                  >
                    Réinitialiser
                  </button>
                </div>
              )}
            </div>
            <div className=" mt-2">
              <label
                htmlFor="country"
                className="block text-sm/6 font-medium text-gray-900 mb-1"
              >
                Country
              </label>
              <input
                id="country"
                name="country"
                placeholder="Ou recherchez-vous ?"
                value={country || ""}
                onChange={(e) => setCountry(e.target.value)}
                className="block w-[100%] rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    e.stopPropagation();

                    if (country) {
                      handleFilterChange("country", country.toString());
                    } else {
                      handleFilterReset("country");
                      setCountry(undefined);
                    }
                  } else if (e.key === " ") {
                    e.stopPropagation();
                  }
                }}
              />
              {filter.country && (
                <div className="flex items-center justify-end gap-2 pt-3">
                  <button
                    onClick={() => {
                      handleFilterReset("country");
                      setCity(undefined);
                    }}
                    type="button"
                    className="rounded bg-red-50 py-2 px-3 text-xs font-semibold text-red-600 shadow-sm hover:bg-red-100"
                  >
                    Réinitialiser
                  </button>
                </div>
              )}
            </div>
          </MenuItems>
        </Menu>
      </div>

      <div className=" flex items-center gap-3">
        {/* Program type */}
        <Menu as="div" className="relative inline-block">
          <MenuButton className="inline-flex items-center justify-center gap-x-1.5 rounded-full bg-white  py-2 px-3 text-sm font-medium text-gray-700 shadow-sm border border-gray-300 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200">
            {programTypes.find((item) => item.value === filter.programType)
              ?.title || "Program type"}

            <ChevronDownIcon
              aria-hidden="true"
              className="-mr-1 size-4 text-gray-400"
            />
          </MenuButton>

          <MenuItems
            transition
            className="absolute left-0 z-10 mt-2 w-[300px] origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none transition-all transform data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in p-2"
          >
            <div className="py-1">
              {programTypes.map((item) => {
                return (
                  <div className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 transition-colors duration-150">
                    <div className=" group flex items-center ">
                      <input
                        id={item.value}
                        name={item.value}
                        checked={filter.programType === item.value}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleFilterChange("programType", item.value);
                          }
                        }}
                        type="radio"
                        aria-describedby="comments-description"
                        className="relative size-5 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                      />
                    </div>
                    <div className="text-base">
                      <label
                        htmlFor={item.value}
                        className="text-sm font-medium text-gray-700 cursor-pointer select-none"
                      >
                        {item.title}
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
            {filter.programType && (
              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  onClick={() => {
                    handleFilterReset("programType");
                  }}
                  type="button"
                  className="rounded bg-red-50 py-2 px-3 text-xs font-semibold text-red-600 shadow-sm hover:bg-red-100"
                >
                  Réinitialiser
                </button>
              </div>
            )}
          </MenuItems>
        </Menu>

        {/* Program field */}
        <Menu as="div" className="relative inline-block">
          <MenuButton className="inline-flex items-center justify-center gap-x-1.5 rounded-full bg-white  py-2 px-3 text-sm font-medium text-gray-700 shadow-sm border border-gray-300 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200">
            {programFields.find((item) => item.value === filter.programField)
              ?.title || "Program field"}

            <ChevronDownIcon
              aria-hidden="true"
              className="-mr-1 size-4 text-gray-400"
            />
          </MenuButton>

          <MenuItems
            transition
            className="absolute left-0 z-10 mt-2 w-[300px] origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none transition-all transform data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in p-2"
          >
            <div className="py-1">
              {programFields.map((item) => {
                return (
                  <div className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 transition-colors duration-150">
                    <div className=" group flex items-center ">
                      <input
                        id={item.value}
                        name={item.value}
                        checked={filter.programField === item.value}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleFilterChange("programField", item.value);
                          }
                        }}
                        type="radio"
                        aria-describedby="comments-description"
                        className="relative size-5 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                      />
                    </div>
                    <div className="text-base">
                      <label
                        htmlFor={item.value}
                        className="text-sm font-medium text-gray-700 cursor-pointer select-none"
                      >
                        {item.title}
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
            {filter.programField && (
              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  onClick={() => {
                    handleFilterReset("programField");
                  }}
                  type="button"
                  className="rounded bg-red-50 py-2 px-3 text-xs font-semibold text-red-600 shadow-sm hover:bg-red-100"
                >
                  Réinitialiser
                </button>
              </div>
            )}
          </MenuItems>
        </Menu>

        {/* Program price  */}
        <Menu as="div" className="relative inline-block">
          <MenuButton className="inline-flex items-center justify-center gap-x-1.5 rounded-full bg-white py-2 px-3 text-sm font-medium text-gray-700 shadow-sm border border-gray-300 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200">
            {filter.programMinPrice && `${filter.programMinPrice}`}
            {filter.programMaxPrice && ` - ${filter.programMaxPrice}`}
            {!filter.programMinPrice &&
              !filter.programMaxPrice &&
              "Program price"}
            <ChevronDownIcon
              aria-hidden="true"
              className="-mr-1 size-5 text-gray-400"
            />
          </MenuButton>

          <MenuItems
            transition
            className="absolute left-0 z-10 mt-2 w-[300px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in p-3 "
          >
            <div>
              <label
                htmlFor="salary"
                className="block text-sm/6 font-medium text-gray-900 mb-1"
              >
                Minimum program price
              </label>
              <input
                id="salary"
                name="salary"
                type="number"
                placeholder="Ou recherchez-vous ?"
                value={programMinPrice || ""}
                onChange={(e) => setProgramMinPrice(Number(e.target.value))}
                className="block w-[100%] rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    e.stopPropagation();

                    if (programMinPrice) {
                      handleFilterChange(
                        "programMinPrice",
                        programMinPrice.toString()
                      );
                    } else {
                      handleFilterReset("programMinPrice");
                      setProgramMinPrice(undefined);
                    }
                  } else if (e.key === " ") {
                    e.stopPropagation();
                  }
                }}
              />
              {filter.programMinPrice && (
                <div className="flex items-center justify-end gap-2 pt-3">
                  <button
                    onClick={() => {
                      handleFilterReset("programMinPrice");
                      setProgramMinPrice(undefined);
                    }}
                    type="button"
                    className="rounded bg-red-50 py-2 px-3 text-xs font-semibold text-red-600 shadow-sm hover:bg-red-100"
                  >
                    Réinitialiser
                  </button>
                </div>
              )}
            </div>
            <div className="py-2 mt-3">
              <label
                htmlFor="salary"
                className="block text-sm/6 font-medium text-gray-900 mb-1"
              >
                Maximum program price
              </label>
              <input
                id="tjm"
                name="tjm"
                type="number"
                placeholder="Ou recherchez-vous ?"
                value={programMaxPrice || ""}
                onChange={(e) => setProgramMaxPrice(Number(e.target.value))}
                className="block w-[100%] rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    e.stopPropagation();

                    if (programMaxPrice) {
                      handleFilterChange(
                        "programMaxPrice",
                        programMaxPrice.toString()
                      );
                    } else {
                      handleFilterReset("programMaxPrice");
                      setProgramMaxPrice(undefined);
                    }
                  } else if (e.key === " ") {
                    e.stopPropagation();
                  }
                }}
              />
              {filter.programMaxPrice && (
                <div className="flex items-center justify-end gap-2 pt-3">
                  <button
                    onClick={() => {
                      handleFilterReset("programMaxPrice");
                      setProgramMaxPrice(undefined);
                    }}
                    type="button"
                    className="rounded bg-red-50 py-2 px-3 text-xs font-semibold text-red-600 shadow-sm hover:bg-red-100"
                  >
                    Réinitialiser
                  </button>
                </div>
              )}
            </div>
          </MenuItems>
        </Menu>

        {/* Order by rating */}
        <Menu as="div" className="relative inline-block">
          <MenuButton className="inline-flex items-center justify-center gap-x-1.5 rounded-full bg-white  py-2 px-3 text-sm font-medium text-gray-700 shadow-sm border border-gray-300 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200">
            Order by rating{" "}
            {filter.orderByRating &&
              ` - ${
                orderByTypes.find((item) => item.value === filter.orderByRating)
                  ?.title
              }`}
            <ChevronDownIcon
              aria-hidden="true"
              className="-mr-1 size-4 text-gray-400"
            />
          </MenuButton>

          <MenuItems
            transition
            className="absolute left-0 z-10 mt-2 w-[300px] origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none transition-all transform data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in p-2"
          >
            <div className="py-1">
              {orderByTypes.map((item) => {
                return (
                  <div className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 transition-colors duration-150">
                    <div className=" group flex items-center ">
                      <input
                        id={item.value}
                        name={item.value}
                        checked={filter.orderByRating === item.value}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleFilterChange("orderByRating", item.value);
                          }
                        }}
                        type="radio"
                        aria-describedby="comments-description"
                        className="relative size-5 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                      />
                    </div>
                    <div className="text-base">
                      <label
                        htmlFor={item.value}
                        className="text-sm font-medium text-gray-700 cursor-pointer select-none"
                      >
                        {item.title}
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
            {filter.orderByRating && (
              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  onClick={() => {
                    handleFilterReset("orderByRating");
                  }}
                  type="button"
                  className="rounded bg-red-50 py-2 px-3 text-xs font-semibold text-red-600 shadow-sm hover:bg-red-100"
                >
                  Réinitialiser
                </button>
              </div>
            )}
          </MenuItems>
        </Menu>

        {/* Order by visits */}
        <Menu as="div" className="relative inline-block">
          <MenuButton className="inline-flex items-center justify-center gap-x-1.5 rounded-full bg-white  py-2 px-3 text-sm font-medium text-gray-700 shadow-sm border border-gray-300 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200">
            Order by visits{" "}
            {filter.orderByVisits &&
              ` - ${
                orderByTypes.find((item) => item.value === filter.orderByVisits)
                  ?.title
              }`}
            <ChevronDownIcon
              aria-hidden="true"
              className="-mr-1 size-4 text-gray-400"
            />
          </MenuButton>

          <MenuItems
            transition
            className="absolute left-0 z-10 mt-2 w-[300px] origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none transition-all transform data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in p-2"
          >
            <div className="py-1">
              {orderByTypes.map((item) => {
                return (
                  <div className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 transition-colors duration-150">
                    <div className=" group flex items-center ">
                      <input
                        id={item.value}
                        name={item.value}
                        checked={filter.orderByVisits === item.value}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleFilterChange("orderByVisits", item.value);
                          }
                        }}
                        type="radio"
                        aria-describedby="comments-description"
                        className="relative size-5 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                      />
                    </div>
                    <div className="text-base">
                      <label
                        htmlFor={item.value}
                        className="text-sm font-medium text-gray-700 cursor-pointer select-none"
                      >
                        {item.title}
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
            {filter.orderByVisits && (
              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  onClick={() => {
                    handleFilterReset("orderByVisits");
                  }}
                  type="button"
                  className="rounded bg-red-50 py-2 px-3 text-xs font-semibold text-red-600 shadow-sm hover:bg-red-100"
                >
                  Réinitialiser
                </button>
              </div>
            )}
          </MenuItems>
        </Menu>

        {/* Order by distance */}
        {filter.longitude && filter.latitude && (
          <Menu as="div" className="relative inline-block">
            <MenuButton className="inline-flex items-center justify-center gap-x-1.5 rounded-full bg-white  py-2 px-3 text-sm font-medium text-gray-700 shadow-sm border border-gray-300 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200">
              Order by distance{" "}
              {filter.orderByDistance &&
                ` - ${
                  orderByTypes.find(
                    (item) => item.value === filter.orderByDistance
                  )?.title
                }`}
              <ChevronDownIcon
                aria-hidden="true"
                className="-mr-1 size-4 text-gray-400"
              />
            </MenuButton>

            <MenuItems
              transition
              className="absolute left-0 z-10 mt-2 w-[300px] origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none transition-all transform data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in p-2"
            >
              <div className="py-1">
                {orderByTypes.map((item) => {
                  return (
                    <div className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 transition-colors duration-150">
                      <div className=" group flex items-center ">
                        <input
                          id={item.value}
                          name={item.value}
                          checked={filter.orderByDistance === item.value}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleFilterChange("orderByDistance", item.value);
                            }
                          }}
                          type="radio"
                          aria-describedby="comments-description"
                          className="relative size-5 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                        />
                      </div>
                      <div className="text-base">
                        <label
                          htmlFor={item.value}
                          className="text-sm font-medium text-gray-700 cursor-pointer select-none"
                        >
                          {item.title}
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
              {filter.orderByDistance && (
                <div className="flex items-center justify-end gap-2 pt-3">
                  <button
                    onClick={() => {
                      handleFilterReset("orderByDistance");
                    }}
                    type="button"
                    className="rounded bg-red-50 py-2 px-3 text-xs font-semibold text-red-600 shadow-sm hover:bg-red-100"
                  >
                    Réinitialiser
                  </button>
                </div>
              )}
            </MenuItems>
          </Menu>
        )}

        {/* Geolocalization  */}
        <div className=" flex items-center gap-2">
          <input
            type="checkbox"
            id="geo"
            className=" size-4"
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
          <label htmlFor="geo">Geolocalization</label>
        </div>
      </div>

      <div className=" flex items-center gap-5 mt-5">
        <p className=" text-sm">
          Votre recherche renvoie <span className="font-bold">{total}</span>{" "}
          résultats.
        </p>
        <button
          onClick={() => {
            setName("");
            setProgramName("");
            setProgramMinPrice(undefined);
            setProgramMaxPrice(undefined);
            setCity(undefined);
            setCountry(undefined);
            setSearchParams({});
          }}
          className="text-sm text-blue-900 font-semibold flex items-center hover:underline"
        >
          Réinitialiser le filtre
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 ml-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12a9 9 0 0118 0m0 0l-3-3m3 3l-3 3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchFilters;
