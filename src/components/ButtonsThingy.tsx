import { FC} from "react";

interface ButtonsThingyProps {
  selectedProgram?: string;
  setSelectedProgram?: (program: string) => void;
  variant?: boolean;
  programs?: string[];
}

const ButtonsThingy: FC<ButtonsThingyProps> = ({ programs, selectedProgram, setSelectedProgram }) => {
  if (!programs || programs.length === 0) {
    return null; // Return null or a placeholder if no programs are provided
  }

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
          onClick={() => setSelectedProgram && setSelectedProgram(program)}
        >
          {program}
        </button>
      ))}
    </div>
  );
};

export default ButtonsThingy;
