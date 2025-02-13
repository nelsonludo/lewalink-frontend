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
import {
  useSuperUserDeletesProgramCourse,
  useSuperUserGetProgramCourses,
  useSuperUserRestoresDeletedProgramCourse,
} from "../../../api/ProgramCourseApi";
import { ProgramCourse } from "../../../types/entities/program-course";
import AddCourseToProgram from "../components/AddCourseToProgram";

const SingleProgram = () => {
  const { id } = useParams();
  const { loading, program, notFound, superUserGetsProgram, setProgram } =
    useSuperUserGetsProgram();
  const {
    loading: loadingCourses,
    programCourses,
    setProgramCourses,
    superUserGetProgramCourses,
  } = useSuperUserGetProgramCourses();
  const navigate = useNavigate();

  const {
    loading: loadingSuperUserRestoresDeletedProgram,
    superUserRestoresDeletedProgram,
  } = useSuperUserRestoresDeletedProgram();

  const { loading: loadingSuperUserDeletesProgram, superUserDeletesProgram } =
    useSuperUserDeletesProgram();

  const {
    loading: loadingSuperUserRestoresDeletedProgramCourse,
    superUserRestoresDeletedProgramCourse,
  } = useSuperUserRestoresDeletedProgramCourse();

  const {
    loading: loadingSuperUserDeleteProgramCourse,
    superUserDeletesProgramCourse,
  } = useSuperUserDeletesProgramCourse();

  const [openDeleteProgram, setOpenDeleteProgram] = useState<
    ViewOrUpdateOrDeleteType<Program | undefined>
  >({
    show: false,
    data: undefined,
  });

  const [openDeleteProgramCourse, setOpenDeleteProgramCourse] = useState<
    ViewOrUpdateOrDeleteType<ProgramCourse | undefined>
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

  const [openRestoreProgramCourse, setOpenRestoreProgramCourse] = useState<
    ViewOrUpdateOrDeleteType<ProgramCourse | undefined>
  >({
    show: false,
    data: undefined,
  });

  const [openAddCourseToProgram, setOpenAddCourseToProgram] = useState(false);

  const doConfirmDeleteProgram = async () => {
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

  const doConfirmDeleteProgramCourse = async () => {
    if (!openDeleteProgramCourse.data) return;

    const deletedProgramCourse = await superUserDeletesProgramCourse({
      id: openDeleteProgramCourse.data.id,
    });

    if (!deletedProgramCourse) return;

    const newProgramCourses = programCourses.map((programCourse) => {
      if (programCourse.id === openDeleteProgramCourse?.data?.id) {
        return deletedProgramCourse;
      }

      return programCourse;
    });

    setProgramCourses(newProgramCourses);
    setOpenDeleteProgramCourse({
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

    setProgram(restoredProgram);
    setOpenRestoreProgram({
      show: false,
      data: undefined,
    });
  };

  const doConfirmRestoreProgramCourse = async () => {
    if (!openRestoreProgramCourse.data) return;

    const restoredProgramCourse = await superUserRestoresDeletedProgramCourse({
      id: openRestoreProgramCourse.data.id,
    });

    if (!restoredProgramCourse) return;

    const newProgramCourses = programCourses.map((programCourse) => {
      if (programCourse.id === openRestoreProgramCourse?.data?.id) {
        return restoredProgramCourse;
      }

      return programCourse;
    });

    setProgramCourses(newProgramCourses);
    setOpenRestoreProgramCourse({
      show: false,
      data: undefined,
    });
  };

  useEffect(() => {
    superUserGetsProgram({
      id,
    });
  }, [id]);

  useEffect(() => {
    if (id && !openAddCourseToProgram) {
      superUserGetProgramCourses({ id, itemsPerPage: 1000, page: 1 });
    }
  }, [id, openAddCourseToProgram]);

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
              {programCourses.length > 0 ? (
                <ul role="list" className="divide-y divide-gray-100">
                  {programCourses.map((programCourse) => {
                    const course = programCourse.course;

                    return (
                      <li
                        key={course.id}
                        className={`flex items-center justify-between gap-x-6 py-5  mb-2 rounded-lg `}
                      >
                        <div className="min-w-0">
                          <div className="flex items-start gap-x-3">
                            <p className="text-sm/6 font-semibold text-gray-900">
                              {course.title} ( {course.code} )
                            </p>
                            {programCourse.isDeleted ? (
                              <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/10 ring-inset">
                                Deleted asscociation
                              </span>
                            ) : (
                              <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
                                Active asscociation
                              </span>
                            )}

                            {course.isDeleted ? (
                              <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/10 ring-inset">
                                Deleted course
                              </span>
                            ) : (
                              <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
                                Active course
                              </span>
                            )}
                          </div>
                          <div className="mt-1 flex items-center gap-x-2 text-xs/5 text-gray-500">
                            <p className="whitespace-nowrap">
                              Due on{" "}
                              <time dateTime={String(course.createdAt)}>
                                {String(course.createdAt)}
                              </time>
                            </p>
                            <svg
                              viewBox="0 0 2 2"
                              className="size-0.5 fill-current"
                            >
                              <circle r={1} cx={1} cy={1} />
                            </svg>
                            <p className="truncate">
                              Created by {course.creator?.name},{" "}
                              {course.creator?.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-none items-center gap-x-4">
                          <Link
                            to={`/dashboard/courses/${course.id}`}
                            className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:block"
                          >
                            View course
                          </Link>
                          {programCourse.isDeleted ? (
                            <button
                              className="hidden rounded-md bg-indigo-600 hover:bg-indigo-500 px-2.5 py-1.5 text-sm font-semibold text-white ring-1 shadow-xs ring-gray-300 ring-inset  sm:block"
                              onClick={() =>
                                setOpenRestoreProgramCourse({
                                  show: true,
                                  data: programCourse,
                                })
                              }
                            >
                              Restore
                            </button>
                          ) : (
                            <button
                              className="hidden rounded-md bg-indigo-600 hover:bg-indigo-500 px-2.5 py-1.5 text-sm font-semibold text-white ring-1 shadow-xs ring-gray-300 ring-inset  sm:block"
                              onClick={() =>
                                setOpenDeleteProgramCourse({
                                  show: true,
                                  data: programCourse,
                                })
                              }
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                "No course associated"
              )}
            </dd>
          </div>
        </dl>
      </div>
      <div className=" flex items-center justify-end mt-5">
        <div className=" flex items-center gap-5">
          <Link
            to={"/dashboard/programs"}
            className="rounded-md bg-indigo-50 px-2.5 py-1.5 text-sm font-semibold text-indigo-600 shadow-xs hover:bg-indigo-100"
          >
            Back
          </Link>
          <button
            className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => setOpenAddCourseToProgram(true)}
          >
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
      {openAddCourseToProgram && (
        <AddCourseToProgram
          openAddCourseToProgram={openAddCourseToProgram}
          setOpenAddCourseToProgram={setOpenAddCourseToProgram}
          program={program}
        />
      )}

      <DeleteModal
        data={openDeleteProgram}
        onConfirmDelete={doConfirmDeleteProgram}
        setData={setOpenDeleteProgram}
        title={`Are you sure you want to delete the program ${openDeleteProgram.data?.name} ?`}
        loading={loadingSuperUserDeletesProgram}
      />
      <DeleteModal
        data={openDeleteProgramCourse}
        onConfirmDelete={doConfirmDeleteProgramCourse}
        setData={setOpenDeleteProgramCourse}
        title={`Are you sure you want to remove the course ${openDeleteProgramCourse.data?.course.title} ?`}
        loading={loadingSuperUserDeleteProgramCourse}
      />
      <ConfirmModal
        data={openRestoreProgram}
        onConfirm={doConfirmRestoreDeletedProgram}
        setData={setOpenRestoreProgram}
        title={`Are you sure you want to restore the program ${openRestoreProgram.data?.name} ?`}
        loading={loadingSuperUserRestoresDeletedProgram}
      />
      <ConfirmModal
        data={openRestoreProgramCourse}
        onConfirm={doConfirmRestoreProgramCourse}
        setData={setOpenRestoreProgramCourse}
        title={`Are you sure you want to restore the course ${openRestoreProgramCourse.data?.course.title} ?`}
        loading={loadingSuperUserRestoresDeletedProgramCourse}
      />
    </div>
  );
};

export default SingleProgram;
