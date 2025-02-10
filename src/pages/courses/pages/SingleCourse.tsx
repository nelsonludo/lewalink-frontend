import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useSuperUserDeletesCourse,
  useSuperUserGetsCourse,
  useSuperUserRestoresDeletedCourse,
} from "../../../api/CourseApi";
import BigSectionLoading from "../../../components/BigSectionLoading";
import NothingSelected from "../../../components/NothingSelected";
import DeleteModal from "../../../components/DeleteModal";
import ConfirmModal from "../../../components/ConfirmModal";
import { Course } from "../../../types/entities/course";
import { ViewOrUpdateOrDeleteType } from "../../../types/general";

const SingleCourse = () => {
  const { id } = useParams();
  const { loading, course, notFound, superUserGetsCourse, setCourse } =
    useSuperUserGetsCourse();
  const navigate = useNavigate();

  const {
    loading: loadingSuperUserRestoresDeletedCourse,
    superUserRestoresDeletedCourse,
  } = useSuperUserRestoresDeletedCourse();

  const { loading: loadingSuperUserDeletesCourse, superUserDeletesCourse } =
    useSuperUserDeletesCourse();

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

  const doConfirmDeleteCourse = async () => {
    if (!openDeleteCourse.data) return;

    const deletedCourse = await superUserDeletesCourse({
      id: openDeleteCourse.data.id,
    });

    if (!deletedCourse) return;

    setCourse(deletedCourse);
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

    setCourse(restoredCourse);
    setOpenRestoreCourse({
      show: false,
      data: undefined,
    });
  };

  useEffect(() => {
    superUserGetsCourse({
      id,
    });
  }, [id]);

  if (loading) {
    return <BigSectionLoading />;
  }

  if (notFound || !course) {
    return (
      <NothingSelected
        bg=" bg-gray-100"
        title="Course does not exist"
        description="Course information will be displayed here"
        buttonText="New course"
        action={() => navigate("/dashboard/courses/new")}
      />
    );
  }

  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base/7 font-semibold text-gray-900">
          Course Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">
          Here is the complete information about the course
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Code</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {course.code}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Title</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {course.title}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Credits</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {course.isDeleted ? (
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
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Status</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {course.credits} credits
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Creator</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {course.creator?.name}, {course.creator?.email}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Description</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {course.description}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Created at</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {String(course.createdAt)}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Updated at</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {String(course.updatedAt)}
            </dd>
          </div>
        </dl>
      </div>
      <div className=" flex items-center justify-end">
        <div className=" flex items-center gap-5">
          <Link
            to={"/dashboard/courses"}
            className="rounded-md bg-indigo-50 px-2.5 py-1.5 text-sm font-semibold text-indigo-600 shadow-xs hover:bg-indigo-100"
          >
            Back
          </Link>
          <Link
            to={`/dashboard/courses/update/${course.id}`}
            className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() =>
              setOpenDeleteCourse({
                data: course,
                show: true,
              })
            }
          >
            Update
          </Link>
          {course.isDeleted && (
            <button
              type="button"
              className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() =>
                setOpenRestoreCourse({
                  data: course,
                  show: true,
                })
              }
            >
              Restore
            </button>
          )}

          {!course.isDeleted && (
            <button
              type="button"
              className="rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              onClick={() =>
                setOpenDeleteCourse({
                  data: course,
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
    </div>
  );
};

export default SingleCourse;
