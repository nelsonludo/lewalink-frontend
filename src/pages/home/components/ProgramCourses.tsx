import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { userHomeInitialStateType } from "../../../store/userHome.slice";
import { useUserGetCurrentSchoolProgramCourses } from "../../../api/ProgramCourseApi";

type ProgramCoursesListProps = {
  programId: string;
};

const ProgramCoursesList: FC<ProgramCoursesListProps> = ({ programId }) => {
  const { currentSchoolProgramCourses }: userHomeInitialStateType = useSelector(
    (state: any) => state.userHomeSlice as userHomeInitialStateType
  );

  const allCourses = currentSchoolProgramCourses
    ? currentSchoolProgramCourses.map((item) => item.course)
    : [];

  const { userGetCurrentSchoolProgramCourses } =
    useUserGetCurrentSchoolProgramCourses();

  useEffect(() => {
    userGetCurrentSchoolProgramCourses({ id: programId });
  }, []);

  if (
    !currentSchoolProgramCourses ||
    currentSchoolProgramCourses.length === 0
  ) {
    return <div>No courses available for this program.</div>;
  }

  return (
    <ul className="list-disc pl-5">
      {allCourses.map((course) => (
        <li key={course.id}>
          <strong>{course.title}</strong>
          {course.description && <span>: {course.description}</span>}
        </li>
      ))}
    </ul>
  );
};

export default ProgramCoursesList;
