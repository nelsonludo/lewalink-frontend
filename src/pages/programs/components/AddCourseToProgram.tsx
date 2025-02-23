import React, { useEffect, useState } from "react";
import Modal from "../../../components/Modal";

import { Program } from "../../../types/entities/program";
import { useSuperUserGetCourses } from "../../../api/CourseApi";
import { Course } from "../../../types/entities/course";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useSuperUserAddsCourseToProgram } from "../../../api/ProgramCourseApi";
import LoadingButton from "../../../components/Buttons/LoadingButton";
import { useDebounce } from "use-debounce";

type Props = {
  openAddCourseToProgram: boolean;
  setOpenAddCourseToProgram: React.Dispatch<React.SetStateAction<boolean>>;
  program: Program;
};

const AddCourseToProgram = ({
  openAddCourseToProgram,
  setOpenAddCourseToProgram,
  program,
}: Props) => {
  const [selectedCourses, setSelectedCourses] = React.useState<Course[]>([]);
  const [query, setQuery] = useState("");
  const [name] = useDebounce(query, 1000);

  const {
    courses,
    loading: loadingCourses,
    superUserGetCourses,
    setCourses,
  } = useSuperUserGetCourses();

  const { loading: loadingAddCourse, superUserAddsCourseToProgram } =
    useSuperUserAddsCourseToProgram();

  const handleAddCourse = async (course: Course) => {
    const programCourse = await superUserAddsCourseToProgram({
      programId: program?.id,
      courseId: course?.id,
    });
    if (programCourse) {
      setSelectedCourses((prev) => prev.filter((c) => c.id !== course.id));
      setCourses((prev) => prev.filter((c) => c.id !== course.id));
    }
  };

  useEffect(() => {
    if (query.length > 0) {
      superUserGetCourses({
        name,
        page: 1,
        itemsPerPage: 5,
      });
    } else {
      setCourses([]);
    }
  }, [name]);

  return (
    <Modal
      open={openAddCourseToProgram}
      clickOutside={true}
      setOpen={(visible) => {
        if (!visible && !loadingCourses && !loadingCourses) {
          setOpenAddCourseToProgram(visible);
        }
      }}
      title={`Add course to program ${program?.name}`}
      dontShowButton={true}
      xlSize="2"
    >
      <div>
        <input
          id="search"
          name="search"
          type="text"
          placeholder="Search for a course"
          aria-label="Email"
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border-gray-400 border outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {loadingCourses ? (
          <div className=" w-full animate-pulse flex flex-col gap-y-2">
            <p className=" w-full bg-gray-200 h-4 mt-1"></p>
            <p className=" w-full bg-gray-200 h-4 "></p>
          </div>
        ) : (
          <div className=" max-h-30 overflow-auto bg-gray-50 border border-gray-200  ">
            {courses.map((course) => {
              if (
                course.id ===
                selectedCourses.find(
                  (selectedCourse) => selectedCourse.id === course.id
                )?.id
              )
                return;

              return (
                <div
                  className="group relative cursor-default py-2 pr-4 pl-8 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden hover:bg-indigo-600 hover:text-white hover:outline-hidden"
                  key={course.id}
                  onClick={() => {
                    setSelectedCourses([...selectedCourses, course]);
                  }}
                >
                  <span className="block truncate font-normal group-data-selected:font-semibold">
                    {course.title}
                  </span>

                  <span className="absolute inset-y-0 left-0 flex items-center pl-1.5 text-gray-100 group-not-data-selected:hidden group-data-focus:text-white">
                    <CheckIcon aria-hidden="true" className="size-5" />
                  </span>
                </div>
              );
            })}
          </div>
        )}

        <ul role="list" className="divide-y divide-gray-100 mt-3">
          {selectedCourses.map((course) => (
            <li
              key={course.id}
              className={`flex items-center justify-between gap-x-6 py-2   rounded-lg `}
            >
              <div className="min-w-0">
                <div className="flex items-start gap-x-3">
                  <p className="text-sm/6 font-semibold text-gray-900">
                    {course.title} ( {course.code} )
                  </p>

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
                  <p className="truncate">
                    Created by {course.creator?.name}, {course.creator?.email}
                  </p>
                </div>
              </div>
              <div className="flex flex-none items-center gap-x-4">
                <button
                  type="button"
                  className="rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  onClick={() =>
                    setSelectedCourses((prev) =>
                      prev.filter((c) => c.id !== course.id)
                    )
                  }
                >
                  Remove
                </button>
                {loadingAddCourse ? (
                  <LoadingButton />
                ) : (
                  <button
                    type="button"
                    className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => handleAddCourse(course)}
                  >
                    Add
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
};

export default AddCourseToProgram;
