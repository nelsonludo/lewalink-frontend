import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import TablePagination from "@mui/material/TablePagination";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import BigSectionLoading from "../../../components/BigSectionLoading";
import NothingSelected from "../../../components/NothingSelected";
import { useDebounce } from "use-debounce";
import DeleteModal from "../../../components/DeleteModal";
import { ViewOrUpdateOrDeleteType } from "../../../types/general";
import ConfirmModal from "../../../components/ConfirmModal";
import {
  Program,
  ProgramFieldType,
  ProgramType,
} from "../../../types/entities/program";
import { getEnumValues } from "../../../utils/smallFunctions";
import {
  useSuperUserDeletesProgram,
  useSuperUserGetPrograms,
  useSuperUserRestoresDeletedProgram,
} from "../../../api/ProgramApi";

const ProgramsList = () => {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [field, setField] = useState("");

  const [search] = useDebounce(name, 1000);

  const [openDeleteProgram, setOpenDeleteProgram] = useState<
    ViewOrUpdateOrDeleteType<Program | undefined>
  >({
    show: false,
    data: undefined,
  });

  const [openRestoreProgram, setOpenRestoreProgram] = useState<
    ViewOrUpdateOrDeleteType<Program | undefined>
  >({
    show: false,
    data: undefined,
  });

  const { loading, programs, superUserGetPrograms, totalPages, setPrograms } =
    useSuperUserGetPrograms();

  const {
    loading: loadingSuperUserRestoresDeletedProgram,
    superUserRestoresDeletedProgram,
  } = useSuperUserRestoresDeletedProgram();

  const { loading: loadingSuperUserDeletesProgram, superUserDeletesProgram } =
    useSuperUserDeletesProgram();

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

  const doConfirmDeleteProgram = async () => {
    if (!openDeleteProgram.data) return;

    const deletedProgram = await superUserDeletesProgram({
      id: openDeleteProgram.data.id,
    });

    if (!deletedProgram) return;

    const newPrograms = programs.map((program) => {
      if (program.id === openDeleteProgram?.data?.id) {
        return deletedProgram;
      }

      return program;
    });

    setPrograms(newPrograms);

    setOpenDeleteProgram({
      show: false,
      data: undefined,
    });
  };

  const doConfirmRestoreDeletedProgram = async () => {
    if (!openRestoreProgram.data) return;

    const restoredProgram = await superUserRestoresDeletedProgram({
      id: openRestoreProgram.data.id,
    });

    if (!restoredProgram) return;

    const newPrograms = programs.map((program) => {
      if (program.id === openRestoreProgram?.data?.id) {
        return restoredProgram;
      }

      return program;
    });

    setPrograms(newPrograms);

    setOpenRestoreProgram({
      show: false,
      data: undefined,
    });
  };

  useEffect(() => {
    superUserGetPrograms({
      name: search,
      page: page + 1,
      itemsPerPage,
      type,
      field,
    });
  }, [search, page, itemsPerPage, type, field]);

  return (
    <section>
      <div>
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold text-gray-900">Programs</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the programs.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <Link
              to={`/dashboard/programs/new`}
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add program
            </Link>
          </div>
        </div>
        <div className="relative mt-4 w-full  flex items-center gap-3">
          <input
            id="search"
            name="search"
            type="text"
            placeholder="Search for a program"
            className="block  py-2 pr-3 pl-9 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 border rounded-lg flex-grow"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <select
            id="duration-type"
            autoComplete="duration-type-name"
            className="block  py-3 px-3  text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 border rounded-lg bg-white text-left"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Select a program type</option>
            {getEnumValues(ProgramType).map((item) => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
          </select>

          <select
            id="duration-type"
            autoComplete="duration-type-name"
            className="block  py-3 px-3  text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 border rounded-lg bg-white text-left"
            value={field}
            onChange={(e) => setField(e.target.value)}
          >
            <option value="">Select a program field</option>
            {getEnumValues(ProgramFieldType).map((item) => {
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
        {loading && (
          <div className="mt-4 ">
            <BigSectionLoading />
          </div>
        )}

        {!loading && programs.length === 0 && (
          <div className=" mt-4">
            <NothingSelected
              title="No program"
              description="All programs will be displayed here"
              buttonText="New program"
              action={() => navigate("/dashboard/programs/new")}
            />
          </div>
        )}

        {!loading && programs.length > 0 && (
          <div className="mt-4">
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
                          Field
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Duration
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
                          Created at
                        </th>

                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Updated at
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
                      {programs.map((program) => (
                        <tr key={program.id}>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">
                            <Link to={`/dashboard/programs/${program.id}`}>
                              {program.name}
                            </Link>
                          </td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                            {program.type}
                          </td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                            {program.field}
                          </td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                            {program.duration} years
                          </td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                            {program?.creator?.name}
                          </td>

                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                            {String(program?.createdAt)}
                          </td>

                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                            {String(program?.updatedAt)}
                          </td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                            {program.isDeleted ? (
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
                                      to={`/dashboard/programs/${program.id}`}
                                      className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden hover:bg-gray-50 w-full text-left "
                                    >
                                      View
                                    </Link>
                                  </MenuItem>
                                  <MenuItem>
                                    <Link
                                      to={`/dashboard/programs/update/${program.id}`}
                                      className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden hover:bg-gray-50 w-full text-left "
                                    >
                                      Edit
                                    </Link>
                                  </MenuItem>
                                  {program.isDeleted ? (
                                    <MenuItem>
                                      <button
                                        onClick={() =>
                                          setOpenRestoreProgram({
                                            data: program,
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
                                          setOpenDeleteProgram({
                                            data: program,
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
      {!loading && (
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
        data={openDeleteProgram}
        onConfirmDelete={doConfirmDeleteProgram}
        setData={setOpenDeleteProgram}
        title={`Are you sure you want to delete the program ${openDeleteProgram.data?.name} ?`}
        loading={loadingSuperUserDeletesProgram}
      />
      <ConfirmModal
        data={openRestoreProgram}
        onConfirm={doConfirmRestoreDeletedProgram}
        setData={setOpenRestoreProgram}
        title={`Are you sure you want to restore the program ${openRestoreProgram.data?.name} ?`}
        loading={loadingSuperUserRestoresDeletedProgram}
      />
    </section>
  );
};

export default ProgramsList;
