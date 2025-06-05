import { FC, useState } from "react";

interface ButtonsThingyProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  variant?: boolean;
  programs?: string[];
}

const ButtonsThingy: FC<ButtonsThingyProps> = ({ programs }) => {
  const [selectedProgram, setSelectedProgram] = useState(programs?.[0] || "");

  return (
    <div className="flex rounded-full bg-[#DDB6FF] overflow-hidden mb-4">
      {programs?.map((program, index) => (
        <button
          key={index}
          className={`px-4 py-2 font-medium transition-colors rounded-full w-[50%] cursor-pointer ${
            selectedProgram === program
              ? "bg-[#bb29ff] text-white"
              : "text-black"
          }`}
          onClick={() => setSelectedProgram(program)}
        >
          {program}
        </button>
      ))}
    </div>
  );
};

export default ButtonsThingy;
