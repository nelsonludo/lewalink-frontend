import { FC, useState } from "react";

interface ButtonsThingyProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
}

const ButtonsThingy: FC<ButtonsThingyProps> = ({ left, right }) => {
  const [isFrench, setIsFrench] = useState(false);
  return (
    <div className="flex rounded-full bg-[#DDB6FF] overflow-hidden">
      <button
        className={`px-4 py-2 font-medium transition-colors rounded-full w-[50%] ${
          !isFrench ? "bg-[#bb29ff] text-white" : "text-black"
        }`}
        onClick={() => setIsFrench(false)}
      >
        {left}
      </button>
      <button
        className={`px-4 py-2 font-medium transition-colors rounded-full w-[50%] ${
          isFrench ? "bg-[#bb29ff] text-white" : "text-black"
        }`}
        onClick={() => setIsFrench(true)}
      >
        {right}
      </button>
    </div>
  );
};

export default ButtonsThingy;
