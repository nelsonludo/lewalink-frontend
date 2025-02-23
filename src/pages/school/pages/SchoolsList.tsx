import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import TablePagination from "@mui/material/TablePagination";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import BigSectionLoading from "../../../components/BigSectionLoading";
import NothingSelected from "../../../components/NothingSelected";
import { useDebounce } from "use-debounce";
import { getEnumValues } from "../../../utils/smallFunctions";

import {
  useSuperUserDeletesSchool,
  useSuperUserGetSchools,
  useSuperUserRestoresDeletedSchool,
} from "../../../api/SchoolApi";
import { School, SchoolType } from "../../../types/entities/school";
import { Sort, ViewOrUpdateOrDeleteType } from "../../../types/general";
import { SortEnum } from "../../../types/enums/sort";
import DeleteModal from "../../../components/DeleteModal";
import ConfirmModal from "../../../components/ConfirmModal";

const SchoolsList = () => {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [orderByRating, setOrderByRating] = useState<Sort>(SortEnum.desc);
  const [orderByVisits, setOrderByVisits] = useState<Sort>(SortEnum.desc);

  const [search] = useDebounce(name, 1000);
  const [delayedCity] = useDebounce(city, 1000);
  const [delayedCountry] = useDebounce(country, 1000);

  const { loading, schools, superUserGetSchools, totalPages, setSchools } =
    useSuperUserGetSchools();

  const [openDeleteSchool, setOpenDeleteSchool] = useState<
    ViewOrUpdateOrDeleteType<School | undefined>
  >({
    show: false,
    data: undefined,
  });

  const [openRestoreSchool, setOpenRestoreSchool] = useState<
    ViewOrUpdateOrDeleteType<School | undefined>
  >({
    show: false,
    data: undefined,
  });

  const {
    loading: loadingSuperUserRestoresDeletedSchool,
    superUserRestoresDeletedSchool,
  } = useSuperUserRestoresDeletedSchool();

  const { loading: loadingSuperUserDeletesSchool, superUserDeletesSchool } =
    useSuperUserDeletesSchool();

  const navigate = useNavigate();

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const doConfirmDeleteSchool = async () => {
    if (!openDeleteSchool.data) return;

    const deletedSchool = await superUserDeletesSchool({
      id: openDeleteSchool.data.id,
    });

    if (!deletedSchool) return;

    const newSchools = schools.map((program) => {
      if (program.id === openDeleteSchool?.data?.id) {
        return deletedSchool;
      }

      return program;
    });

    setSchools(newSchools);

    setOpenDeleteSchool({
      show: false,
      data: undefined,
    });
  };

  const doConfirmRestoreDeletedSchool = async () => {
    if (!openRestoreSchool.data) return;

    const restoredSchool = await superUserRestoresDeletedSchool({
      id: openRestoreSchool.data.id,
    });

    if (!restoredSchool) return;

    const newSchools = schools.map((program) => {
      if (program.id === openRestoreSchool?.data?.id) {
        return restoredSchool;
      }

      return program;
    });

    setSchools(newSchools);

    setOpenRestoreSchool({
      show: false,
      data: undefined,
    });
  };

  useEffect(() => {
    superUserGetSchools({
      name: search,
      page: page + 1,
      itemsPerPage,
      type,
      city: delayedCity,
      country: delayedCountry,
      orderByRating,
      orderByVisits,
    });
  }, [
    search,
    page,
    itemsPerPage,
    type,
    delayedCity,
    delayedCountry,
    orderByVisits,
    orderByRating,
  ]);

  return (
    <section>
      <div>
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold text-gray-900">Schools</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the schools.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <Link
              to={`/dashboard/schools/new`}
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add school
            </Link>
          </div>
        </div>
        <div className="relative mt-4 w-full  flex items-center gap-3">
          <input
            id="search"
            name="search"
            type="text"
            placeholder="Search for a school"
            className="block  py-2 pr-3 pl-9 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 border rounded-lg flex-grow"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            id="search"
            name="search"
            type="text"
            placeholder="City"
            className="block  py-2 px-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 border rounded-lg "
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <input
            id="search"
            name="search"
            type="text"
            placeholder="Country"
            className="block  py-2 px-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 border rounded-lg "
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />

          <select
            id="duration-type"
            autoComplete="duration-type-name"
            className="block  py-3 px-3  text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 border rounded-lg bg-white text-left"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Select a school type</option>
            {getEnumValues(SchoolType).map((item) => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
          </select>

          <FiSearch
            size={16}
            className=" absolute text-gray-400 top-3 left-3"
          />
        </div>
        <div className=" mt-3 flex  gap-4">
          <div>
            <span className=" mb-1 text-xs block">Order by rating</span>
            <select
              id="order-by-rating-type"
              autoComplete="order-by-rating-type-name"
              className="block  py-1 px-3  text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 border rounded-lg bg-white text-left "
              value={orderByRating}
              onChange={(e) => setOrderByRating(e.target.value as SortEnum)}
            >
              {getEnumValues(SortEnum).map((item) => {
                return (
                  <option key={item} value={item}>
                    {item === SortEnum.asc ? "Ascending" : "Descending"}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <span className=" mb-1 text-xs block">Order by visits</span>
            <select
              id="order-by-visits-type"
              autoComplete="order-by-visits-type-name"
              className="block  py-1 px-3  text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 border rounded-lg bg-white text-left "
              value={orderByVisits}
              onChange={(e) => setOrderByVisits(e.target.value as SortEnum)}
            >
              {getEnumValues(SortEnum).map((item) => {
                return (
                  <option key={item} value={item}>
                    {item === SortEnum.asc ? "Ascending" : "Descending"}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {loading && (
          <div className="mt-8 ">
            <BigSectionLoading />
          </div>
        )}

        {!loading && schools.length === 0 && (
          <div className=" mt-8">
            <NothingSelected
              title="No program"
              bg=" bg-gray-50"
              description="All schools will be displayed here"
              buttonText="New program"
              action={() => navigate("/dashboard/schools/new")}
            />
          </div>
        )}

        {!loading && schools.length > 0 && (
          <div className="mt-8">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden ring-1 shadow-sm ring-black/5 sm:rounded-lg ">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Type
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          City
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Country
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Visits
                        </th>{" "}
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Rating
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Creator
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Deleted ?
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white  ">
                      {schools.map((school) => (
                        <tr key={school.id}>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">
                            <Link to={`/dashboard/schools/${school.id}`}>
                              {school.name}
                            </Link>
                          </td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                            {school.type}
                          </td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                            {school.city}
                          </td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                            {school.country}
                          </td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                            {school.visits}
                          </td>{" "}
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                            {school.rating}
                          </td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                            {school?.creator?.name}{" "}
                          </td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                            {school.isDeleted ? (
                              <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/10 ring-inset">
                                Deleted
                              </span>
                            ) : (
                              <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
                                Active
                              </span>
                            )}
                          </td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                            <Menu
                              as="div"
                              className="relative inline-block text-left "
                            >
                              <div>
                                <MenuButton className="flex items-center rounded-full bg-gray-100 text-gray-400 hover:text-gray-600 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 focus:outline-hidden">
                                  <span className="sr-only">Open options</span>
                                  <EllipsisVerticalIcon
                                    aria-hidden="true"
                                    className="size-5"
                                  />
                                </MenuButton>
                              </div>
                              <MenuItems className="fixed right-[6%] mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden z-50">
                                <div className="py-1">
                                  <MenuItem>
                                    <Link
                                      to={`/dashboard/schools/${school.id}`}
                                      className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden hover:bg-gray-50 w-full text-left "
                                    >
                                      View
                                    </Link>
                                  </MenuItem>
                                  <MenuItem>
                                    <Link
                                      to={`/dashboard/schools/update/${school.id}`}
                                      className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden hover:bg-gray-50 w-full text-left "
                                    >
                                      Edit
                                    </Link>
                                  </MenuItem>
                                  {school.isDeleted ? (
                                    <MenuItem>
                                      <button
                                        onClick={() =>
                                          setOpenRestoreSchool({
                                            data: school,
                                            show: true,
                                          })
                                        }
                                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden hover:bg-gray-50 w-full text-left "
                                      >
                                        Restore
                                      </button>
                                    </MenuItem>
                                  ) : (
                                    <MenuItem>
                                      <button
                                        onClick={() =>
                                          setOpenDeleteSchool({
                                            data: school,
                                            show: true,
                                          })
                                        }
                                        className="block px-4 py-2 text-sm text-red-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden hover:bg-gray-50 w-full text-left "
                                      >
                                        Delete
                                      </button>
                                    </MenuItem>
                                  )}
                                </div>
                              </MenuItems>
                            </Menu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {!loading && schools.length > 0 && (
        <div className=" mt-4 flex items-center justify-end">
          <TablePagination
            component="div"
            count={totalPages}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={itemsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      )}

      <DeleteModal
        data={openDeleteSchool}
        onConfirmDelete={doConfirmDeleteSchool}
        setData={setOpenDeleteSchool}
        title={`Are you sure you want to delete the school ${openDeleteSchool.data?.name} ?`}
        loading={loadingSuperUserDeletesSchool}
      />
      <ConfirmModal
        data={openRestoreSchool}
        onConfirm={doConfirmRestoreDeletedSchool}
        setData={setOpenRestoreSchool}
        title={`Are you sure you want to restore the school ${openRestoreSchool.data?.name} ?`}
        loading={loadingSuperUserRestoresDeletedSchool}
      />
    </section>
  );
};

export default SchoolsList;
