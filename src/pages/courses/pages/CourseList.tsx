import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import TablePagination from "@mui/material/TablePagination";
import {
  useSuperUserDeletesCourse,
  useSuperUserGetCourses,
  useSuperUserRestoresDeletedCourse,
} from "../../../api/CourseApi";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import BigSectionLoading from "../../../components/BigSectionLoading";
import NothingSelected from "../../../components/NothingSelected";
import { useDebounce } from "use-debounce";
import DeleteModal from "../../../components/DeleteModal";
import { Course } from "../../../types/entities/course";
import { ViewOrUpdateOrDeleteType } from "../../../types/general";
import ConfirmModal from "../../../components/ConfirmModal";

const CourseList = () => {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [name, setName] = useState("");
  const [search] = useDebounce(name, 1000);

  const [openDeleteCourse, setOpenDeleteCourse] = useState<
    ViewOrUpdateOrDeleteType<Course | undefined>
  >({
    show: false,
    data: undefined,
  });

  const [openRestoreCourse, setOpenRestoreCourse] = useState<
    ViewOrUpdateOrDeleteType<Course | undefined>
  >({
    show: false,
    data: undefined,
  });

  const { loading, courses, superUserGetCourses, totalPages, setCourses } =
    useSuperUserGetCourses();

  const {
    loading: loadingSuperUserRestoresDeletedCourse,
    superUserRestoresDeletedCourse,
  } = useSuperUserRestoresDeletedCourse();

  const { loading: loadingSuperUserDeletesCourse, superUserDeletesCourse } =
    useSuperUserDeletesCourse();

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

  const doConfirmDeleteCourse = async () => {
    if (!openDeleteCourse.data) return;

    const deletedCourse = await superUserDeletesCourse({
      id: openDeleteCourse.data.id,
    });

    if (!deletedCourse) return;

    const newCourses = courses.map((course) => {
      if (course.id === openDeleteCourse?.data?.id) {
        return deletedCourse;
      }

      return course;
    });

    setCourses(newCourses);

    setOpenDeleteCourse({
      show: false,
      data: undefined,
    });
  };

  const doConfirmRestoreDeletedCourse = async () => {
    if (!openRestoreCourse.data) return;

    const restoredCourse = await superUserRestoresDeletedCourse({
      id: openRestoreCourse.data.id,
    });

    if (!restoredCourse) return;

    const newCourses = courses.map((course) => {
      if (course.id === openRestoreCourse?.data?.id) {
        return restoredCourse;
      }

      return course;
    });

    setCourses(newCourses);

    setOpenRestoreCourse({
      show: false,
      data: undefined,
    });
  };

  useEffect(() => {
    superUserGetCourses({ name: search, page: page + 1, itemsPerPage });
  }, [search, page, itemsPerPage]);

  return (
    <section>
      <div>
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold text-gray-900">Courses</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the courses in your account including their name,
              title, email and role.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <Link
              to={`/dashboard/courses/new`}
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add course
            </Link>
          </div>
        </div>
        <div className="relative mt-4 w-full">
          <input
            id="search"
            name="search"
            type="text"
            placeholder="Search for a course"
            className="block w-full  py-2 pr-3 pl-9 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 border rounded-lg flex-grow"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

        {!loading && courses.length === 0 && (
          <div className=" mt-4">
            <NothingSelected
              title="No course"
              description="All courses will be displayed here"
              buttonText="New course"
              action={() => navigate("/dashboard/courses/new")}
            />
          </div>
        )}

        {!loading && courses.length > 0 && (
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
                          Code
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Title
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Credits
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
                      {courses.map((course) => (
                        <tr key={course.id}>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">
                            {course.code}
                          </td>
                          <Link to={`/dashboard/courses/${course.id}`}>
                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                              {course.title}
                            </td>
                          </Link>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                            {course.credits}
                          </td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                            {course?.creator?.name}
                          </td>

                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                            {String(course?.createdAt)}
                          </td>

                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                            {String(course?.updatedAt)}
                          </td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                            {course.isDeleted ? (
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
                                      to={`/dashboard/courses/${course.id}`}
                                      className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden hover:bg-gray-50 w-full text-left "
                                    >
                                      View
                                    </Link>
                                  </MenuItem>
                                  <MenuItem>
                                    <Link
                                      to={`/dashboard/courses/update/${course.id}`}
                                      className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden hover:bg-gray-50 w-full text-left "
                                    >
                                      Edit
                                    </Link>
                                  </MenuItem>
                                  {course.isDeleted ? (
                                    <MenuItem>
                                      <button
                                        onClick={() =>
                                          setOpenRestoreCourse({
                                            data: course,
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
                                          setOpenDeleteCourse({
                                            data: course,
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
        data={openDeleteCourse}
        onConfirmDelete={doConfirmDeleteCourse}
        setData={setOpenDeleteCourse}
        title={`Are you sure you want to delete the course ${openDeleteCourse.data?.title} ?`}
        loading={loadingSuperUserDeletesCourse}
      />
      <ConfirmModal
        data={openRestoreCourse}
        onConfirm={doConfirmRestoreDeletedCourse}
        setData={setOpenRestoreCourse}
        title={`Are you sure you want to restore the course ${openRestoreCourse.data?.title} ?`}
        loading={loadingSuperUserRestoresDeletedCourse}
      />
    </section>
  );
};

export default CourseList;
