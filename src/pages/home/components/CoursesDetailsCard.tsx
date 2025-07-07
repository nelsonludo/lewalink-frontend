import { FC, useState } from "react";
import ButtonsThingy from "../../../components/ButtonsThingy";

type CoursesDetailsCardProps = {
  courses: string[];
  variant?: boolean;
};

const CoursesDetailsCard: FC<CoursesDetailsCardProps> = ({
  courses,
  variant,
}) => {
  const tabs = ["HND", "Bachelor's", "Masters", "PHD"]; 
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
    
  
    
  return (
    <div className="flex flex-col gap-1 w-full">
      {variant && (
        <ButtonsThingy programs={tabs} selectedProgram={selectedTab} setSelectedProgram={setSelectedTab} />
      )}
      {courses.map((course, index) => (
        <div
          key={index}
          className="flex bg-[#f4eaff] rounded-lg p-4 justify-between w-full"
        >
          <h2>{course}</h2>
          <svg
            className="h-4 w-4 text-gray-500"
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
      ))}
    </div>
  );
};

export default CoursesDetailsCard;
