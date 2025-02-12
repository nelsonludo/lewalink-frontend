import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import BigSectionLoading from "../../../components/BigSectionLoading";
import NothingSelected from "../../../components/NothingSelected";
import DeleteModal from "../../../components/DeleteModal";
import ConfirmModal from "../../../components/ConfirmModal";
import { Program } from "../../../types/entities/program";
import { ViewOrUpdateOrDeleteType } from "../../../types/general";
import {
  useSuperUserDeletesProgram,
  useSuperUserGetsProgram,
  useSuperUserRestoresDeletedProgram,
} from "../../../api/ProgramApi";

import { classNames, getInitials } from "../../../utils/smallFunctions";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSuperUserGetProgramCourses } from "../../../api/ProgramCourseApi";
import { randomBgs } from "../../../utils/constants";

const SingleProgram = () => {
  const { id } = useParams();
  const { loading, program, notFound, superUserGetsProgram, setProgram } =
    useSuperUserGetsProgram();
  const {
    loading: loadingCourses,
    programCourses,
    // setProgramCourses,
    superUserGetProgramCourses,
  } = useSuperUserGetProgramCourses();
  const navigate = useNavigate();

  const {
    loading: loadingSuperUserRestoresDeletedProgram,
    superUserRestoresDeletedProgram,
  } = useSuperUserRestoresDeletedProgram();

  const { loading: loadingSuperUserDeletesProgram, superUserDeletesProgram } =
    useSuperUserDeletesProgram();

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

  const doConfirmDeleteCourse = async () => {
    if (!openDeleteProgram.data) return;

    const deletedProgram = await superUserDeletesProgram({
      id: openDeleteProgram.data.id,
    });

    if (!deletedProgram) return;

    setProgram(deletedProgram);
    setOpenDeleteProgram({
      show: false,
      data: undefined,
    });
  };

  const doConfirmRestoreDeletedCourse = async () => {
    if (!openRestoreProgram.data) return;

    const restoredProgram = await superUserRestoresDeletedProgram({
      id: openRestoreProgram.data.id,
    });

    if (!restoredProgram) return;

    setProgram(restoredProgram);
    setOpenRestoreProgram({
      show: false,
      data: undefined,
    });
  };

  useEffect(() => {
    superUserGetsProgram({
      id,
    });

    superUserGetProgramCourses({ id, itemsPerPage: 1000, page: 1 });
  }, [id]);

  if (loading || loadingCourses) {
    return <BigSectionLoading />;
  }

  if (notFound || !program) {
    return (
      <NothingSelected
        bg=" bg-gray-100"
        title="Program does not exist"
        description="Program information will be displayed here"
        buttonText="New program"
        action={() => navigate("/dashboard/programs/new")}
      />
    );
  }

  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base/7 font-semibold text-gray-900">
          Program Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">
          Here is the complete information about the program
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Name</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-4 sm:mt-0">
              {program.name}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Type</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-4 sm:mt-0">
              {program.type}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Field</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-4 sm:mt-0">
              {program.field}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">State</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-4 sm:mt-0">
              {program.isDeleted ? (
                <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/10 ring-inset">
                  Deleted
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
                  Active
                </span>
              )}{" "}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Creator</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-4 sm:mt-0">
              {program.creator?.name}, {program.creator?.email}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Description</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-4 sm:mt-0">
              {program.description}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Created at</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-4 sm:mt-0">
              {String(program.createdAt)}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Updated at</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-4 sm:mt-0">
              {String(program.updatedAt)}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">
              Associated courses
            </dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-4 sm:mt-0">
              <ul
                role="list"
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
              >
                {programCourses.map((programCourse) => {
                  const course = programCourse.course;
                  return (
                    <li
                      key={course.code}
                      className={`col-span-1 flex   shadow-xs   ${
                        course.isDeleted &&
                        "border-4 rounded-xl border-red-600 line-through"
                      }`}
                    >
                      <div
                        className={classNames(
                          `${
                            randomBgs[
                              Math.floor(Math.random() * randomBgs.length)
                            ]
                          }`,
                          "flex w-16 shrink-0 items-center justify-center  text-sm font-medium text-white rounded-l-lg"
                        )}
                      >
                        {getInitials(course.title)}
                      </div>
                      <div className="flex flex-1 items-center justify-between truncate  border-t border-r border-b border-gray-200 bg-white rounded-r-lg">
                        <div className="flex-1 truncate px-4 py-2 text-sm">
                          <Link to={`/dashboard/courses/${course.id}`}>
                            <span>{course.code}</span>
                          </Link>
                          <p className="text-gray-500">
                            {course.title.slice(0, 20)}{" "}
                          </p>
                        </div>
                        <div className="shrink-0 pr-2">
                          <button
                            type="button"
                            className="inline-flex size-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
                            title={`Remove the course asdf`}
                          >
                            <span className="sr-only">Open options</span>
                            <XMarkIcon
                              aria-hidden="true"
                              className="size-5 text-red-600 hover:text-red-500"
                            />
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </dd>
          </div>
        </dl>
      </div>
      <div className=" flex items-center justify-end mt-10">
        <div className=" flex items-center gap-5">
          <Link
            to={"/dashboard/programs"}
            className="rounded-md bg-indigo-50 px-2.5 py-1.5 text-sm font-semibold text-indigo-600 shadow-xs hover:bg-indigo-100"
          >
            Back
          </Link>
          <button className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Add course
          </button>
          <Link
            to={`/dashboard/programs/update/${program.id}`}
            className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() =>
              setOpenDeleteProgram({
                data: program,
                show: true,
              })
            }
          >
            Update
          </Link>
          {program.isDeleted && (
            <button
              type="button"
              className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() =>
                setOpenRestoreProgram({
                  data: program,
                  show: true,
                })
              }
            >
              Restore
            </button>
          )}

          {!program.isDeleted && (
            <button
              type="button"
              className="rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              onClick={() =>
                setOpenDeleteProgram({
                  data: program,
                  show: true,
                })
              }
            >
              Delete
            </button>
          )}
        </div>
      </div>

      <DeleteModal
        data={openDeleteProgram}
        onConfirmDelete={doConfirmDeleteCourse}
        setData={setOpenDeleteProgram}
        title={`Are you sure you want to delete the program ${openDeleteProgram.data?.name} ?`}
        loading={loadingSuperUserDeletesProgram}
      />
      <ConfirmModal
        data={openRestoreProgram}
        onConfirm={doConfirmRestoreDeletedCourse}
        setData={setOpenRestoreProgram}
        title={`Are you sure you want to restore the program ${openRestoreProgram.data?.name} ?`}
        loading={loadingSuperUserRestoresDeletedProgram}
      />
    </div>
  );
};

export default SingleProgram;
