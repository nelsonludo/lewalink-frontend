import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import TablePagination from "@mui/material/TablePagination";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import BigSectionLoading from "../../../components/BigSectionLoading";
import NothingSelected from "../../../components/NothingSelected";
import { useDebounce } from "use-debounce";
import DeleteModal from "../../../components/DeleteModal";
import { ViewOrUpdateOrDeleteType } from "../../../types/general";
import ConfirmModal from "../../../components/ConfirmModal";
import { getEnumValues } from "../../../utils/smallFunctions";

import { User, UserType } from "../../../types/entities/user";
import {
  useAdminDeactivatesUser,
  useAdminDeletesUser,
  useAdminGetUsers,
  useAdminRestoresDeactivatedUser,
  useAdminRestoresDeletedUser,
} from "../../../api/AuthApi";
import { AuthInitialStateType } from "../../../store/auth.slice";
import { useSelector } from "react-redux";

const UsersList = () => {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [name, setName] = useState("");
  const [userType, setUserType] = useState<UserType>(UserType.Admin);

  const [search] = useDebounce(name, 1000);

  const { user: userState }: AuthInitialStateType = useSelector(
    (state: any) => state.authSlice as AuthInitialStateType
  );

  const [openDeleteUser, setOpenDeleteUser] = useState<
    ViewOrUpdateOrDeleteType<User | undefined>
  >({
    show: false,
    data: undefined,
  });

  const [openDeactivateUser, setOpenDeactivateUser] = useState<
    ViewOrUpdateOrDeleteType<User | undefined>
  >({
    show: false,
    data: undefined,
  });

  const [openRestoreDeletedUser, setOpenRestoreDeletedUser] = useState<
    ViewOrUpdateOrDeleteType<User | undefined>
  >({
    show: false,
    data: undefined,
  });

  const [openRestoreDeactivatedUser, setOpenRestoreDeactivatedUser] = useState<
    ViewOrUpdateOrDeleteType<User | undefined>
  >({
    show: false,
    data: undefined,
  });

  const { loading, users, adminGetUsers, totalPages, setUsers } =
    useAdminGetUsers();

  const { loading: loadingAdminRestoresDeletedUser, adminRestoresDeletedUser } =
    useAdminRestoresDeletedUser();

  const { loading: loadingAdminDeletesUser, adminDeletesUser } =
    useAdminDeletesUser();

  const { loading: loadingAdminDeactivatesUser, adminDeactivatesUser } =
    useAdminDeactivatesUser();

  const {
    loading: loadingAdminRestoresDeactivatedUser,
    adminRestoresDeactivatedUser,
  } = useAdminRestoresDeactivatedUser();

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

  const doConfirmDeleteUser = async () => {
    if (!openDeleteUser.data) return;

    const deletedUser = await adminDeletesUser({
      id: openDeleteUser.data.id,
    });

    if (!deletedUser) return;

    const newUsers = users.map((user) => {
      if (user.id === openDeleteUser?.data?.id) {
        return deletedUser;
      }

      return user;
    });

    setUsers(newUsers);

    setOpenDeleteUser({
      show: false,
      data: undefined,
    });
  };

  const doConfirmDeactivateUser = async () => {
    if (!openDeactivateUser.data) return;

    const deactivatedUser = await adminDeactivatesUser({
      id: openDeactivateUser.data.id,
    });

    if (!deactivatedUser) return;

    const newUsers = users.map((user) => {
      if (user.id === openDeactivateUser?.data?.id) {
        return deactivatedUser;
      }

      return user;
    });

    setUsers(newUsers);

    setOpenDeactivateUser({
      show: false,
      data: undefined,
    });
  };

  const doConfirmRestoreDeletedUser = async () => {
    if (!openRestoreDeletedUser.data) return;

    const restoredUser = await adminRestoresDeletedUser({
      id: openRestoreDeletedUser.data.id,
    });

    if (!restoredUser) return;

    const newUsers = users.map((user) => {
      if (user.id === openRestoreDeletedUser?.data?.id) {
        return restoredUser;
      }

      return user;
    });

    setUsers(newUsers);

    setOpenRestoreDeletedUser({
      show: false,
      data: undefined,
    });
  };

  const doConfirmRestoreDeactivatedUser = async () => {
    if (!openRestoreDeactivatedUser.data) return;

    const activatedUser = await adminRestoresDeactivatedUser({
      id: openRestoreDeactivatedUser.data.id,
    });

    if (!activatedUser) return;

    const newUsers = users.map((user) => {
      if (user.id === openRestoreDeactivatedUser?.data?.id) {
        return activatedUser;
      }

      return user;
    });

    setUsers(newUsers);

    setOpenRestoreDeactivatedUser({
      show: false,
      data: undefined,
    });
  };

  useEffect(() => {
    adminGetUsers({
      name: search,
      page: page + 1,
      itemsPerPage,
      userType,
    });
  }, [search, page, itemsPerPage, userType]);

  return (
    <section>
      <div>
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold text-gray-900">Users</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the users.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex items-center gap-4">
            <Link
              to={`/dashboard/users/new/${UserType.Admin}`}
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Admin
            </Link>
            <Link
              to={`/dashboard/users/new/${UserType.Editor}`}
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Editor
            </Link>
          </div>
        </div>
        <div className="relative mt-4 w-full  flex items-center gap-3">
          <input
            id="search"
            name="search"
            type="text"
            placeholder="Search for a user"
            className="block  py-2 pr-3 pl-9 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 border rounded-lg flex-grow"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <select
            id="duration-userType"
            autoComplete="duration-userType-name"
            className="block  py-3 px-3  text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 border rounded-lg bg-white text-left"
            value={userType}
            onChange={(e) => setUserType(e.target.value as UserType)}
          >
            {getEnumValues(UserType).map((item) => {
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

        {!loading && users.length === 0 && (
          <div className=" mt-4">
            <NothingSelected
              title="No user"
              bg=" bg-gray-50"
              description="All users will be displayed here"
              noDisplayButton
            />
          </div>
        )}

        {!loading && users.length > 0 && (
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
                          Email
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
                          Account active ?
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
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">
                            {user.name}
                          </td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                            {user.email}
                          </td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                            {user.type}
                          </td>

                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                            {user?.creator?.name}
                          </td>

                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                            {String(user?.createdAt)}
                          </td>

                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                            {String(user?.updatedAt)}
                          </td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                            {user.isActive ? (
                              <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
                                Activated
                              </span>
                            ) : (
                              <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/10 ring-inset">
                                Deactivated
                              </span>
                            )}
                          </td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                            {user.isDeleted ? (
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
                            {userState?.id !== user.id && (
                              <Menu
                                as="div"
                                className="relative inline-block text-left "
                              >
                                <div>
                                  <MenuButton className="flex items-center rounded-full bg-gray-100 text-gray-400 hover:text-gray-600 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 focus:outline-hidden">
                                    <span className="sr-only">
                                      Open options
                                    </span>
                                    <EllipsisVerticalIcon
                                      aria-hidden="true"
                                      className="size-5"
                                    />
                                  </MenuButton>
                                </div>
                                <MenuItems className="fixed right-[6%] mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden z-50">
                                  <div className="py-1">
                                    {user.isActive ? (
                                      <MenuItem>
                                        <button
                                          onClick={() =>
                                            setOpenDeactivateUser({
                                              data: user,
                                              show: true,
                                            })
                                          }
                                          className="block px-4 py-2 text-sm text-red-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden hover:bg-gray-50 w-full text-left "
                                        >
                                          Deactivate
                                        </button>
                                      </MenuItem>
                                    ) : (
                                      <MenuItem>
                                        <button
                                          onClick={() =>
                                            setOpenRestoreDeactivatedUser({
                                              data: user,
                                              show: true,
                                            })
                                          }
                                          className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden hover:bg-gray-50 w-full text-left "
                                        >
                                          Activate
                                        </button>
                                      </MenuItem>
                                    )}

                                    {user.isDeleted ? (
                                      <MenuItem>
                                        <button
                                          onClick={() =>
                                            setOpenRestoreDeletedUser({
                                              data: user,
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
                                            setOpenDeleteUser({
                                              data: user,
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
                            )}
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
      {!loading && users.length > 0 && (
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
        data={openDeleteUser}
        onConfirmDelete={doConfirmDeleteUser}
        setData={setOpenDeleteUser}
        title={`Are you sure you want to delete the user ${openDeleteUser.data?.name} ?`}
        loading={loadingAdminDeletesUser}
      />
      <DeleteModal
        data={openDeactivateUser}
        onConfirmDelete={doConfirmDeactivateUser}
        setData={setOpenDeactivateUser}
        title={`Are you sure you want to deactivate the user ${openDeactivateUser.data?.name} ?`}
        loading={loadingAdminDeactivatesUser}
      />
      <ConfirmModal
        data={openRestoreDeletedUser}
        onConfirm={doConfirmRestoreDeletedUser}
        setData={setOpenRestoreDeletedUser}
        title={`Are you sure you want to restore the user ${openRestoreDeletedUser.data?.name} ?`}
        loading={loadingAdminRestoresDeletedUser}
      />

      <ConfirmModal
        data={openRestoreDeactivatedUser}
        onConfirm={doConfirmRestoreDeactivatedUser}
        setData={setOpenRestoreDeactivatedUser}
        title={`Are you sure you want to activate the user ${openRestoreDeactivatedUser.data?.name} ?`}
        loading={loadingAdminRestoresDeactivatedUser}
      />
    </section>
  );
};

export default UsersList;
