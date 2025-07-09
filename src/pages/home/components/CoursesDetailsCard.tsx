import { FC, useEffect, useState } from "react";
import ButtonsThingy from "../../../components/ButtonsThingy";
import { Program } from "../../../types/entities/program";
import ProgramCoursesList from "./ProgramCourses";

type CoursesDetailsCardProps = {
  Programs: Program[];
  variant?: boolean;
  tabs: string[];
};

const CoursesDetailsCard: FC<CoursesDetailsCardProps> = ({
  Programs,
  variant,
  tabs,
}) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Filtered programs based on selectedTab
  const filteredPrograms = Programs.filter(
    (program) => !selectedTab || program.type === selectedTab
  );

  useEffect(() => {
    setOpenIndex(null); // Reset open index when selected tab changes
  }, [selectedTab]);

  return (
    <div className="flex flex-col gap-1 w-full">
      {variant && (
        <ButtonsThingy
          programs={tabs}
          selectedProgram={selectedTab}
          setSelectedProgram={setSelectedTab}
        />
      )}

      {filteredPrograms.map((program, filteredIndex) => (
        <div key={program.id} className="w-full">
          <div
            className="flex bg-[#f4eaff] rounded-lg p-4 justify-between w-full cursor-pointer items-center"
            onClick={() =>
              setOpenIndex(openIndex === filteredIndex ? null : filteredIndex)
            }
          >
            <h2>{program.name}</h2>
            <svg
              className={`h-4 w-4 text-gray-500 transform transition-transform duration-200 ${
                openIndex === filteredIndex ? "rotate-180" : ""
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {openIndex === filteredIndex && (
            <div className="bg-white rounded-b-lg p-4 border-t border-[#f4eaff]">
              <p>
                <strong>Description:</strong>{" "}
                {program.description || "No description available."}
              </p>
              <p>
                <strong>Duration:</strong> {program.duration || "N/A"}
              </p>
              <div>
                <strong>Courses:</strong>
                <ProgramCoursesList programId={program.id} />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CoursesDetailsCard;
