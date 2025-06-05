import { FC } from "react";

type ProgramDetailImagesProps = {
  img: string;
  label: string;
};

const ProgramDetailImages: FC<ProgramDetailImagesProps> = ({ img, label }) => {
  return (
    <div className="flex items-center p-2 rounded-lg border border-gray-300">
      <img src={img} alt="" className="w-4 h-4 lg:w-10 lg:h-10" />
      <span className="ml-1 text-lg ">{label}</span>
    </div>
  );
};

export default ProgramDetailImages;
