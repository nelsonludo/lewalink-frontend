import { FC } from "react";
import ProgramDetailImages from "./ProgramDetailImages";

type ProgramDetailCardProps = {
  time: string;
  diploma: string;
  duration: string;
  language: string;
  speciality: string;
  coursesNumber?: number;
};

const ProgramDetailCard: FC<ProgramDetailCardProps> = ({
  time,
  diploma,
  duration,
  language,
  speciality,
  coursesNumber = 0, // Default value if not provided
}) => {
  return (
    <>
      <div className="my-2 flex flex-row lg:gap-8 gap-1 text-[9px] lg:text-xs">
        <ProgramDetailImages
          img={"/images/icons/graduation-capIcon.png"}
          label={diploma}
        />
        <ProgramDetailImages img={"/images/icons/clockIcon.png"} label={time} />
        <ProgramDetailImages
          img={"/images/icons/calendarIcon.png"}
          label={duration}
        />
        <ProgramDetailImages
          img={"/images/icons/languageIcon.png"}
          label={language}
        />
      </div>
      <h2 className="text-xl lg:2xl text-[#BB29FF] font-bold">{speciality}</h2>
      <h2 className="text-sm ">Courses: {coursesNumber}</h2>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero quam
        rerum suscipit animi atque vitae aliquam? Totam eum temporibus tenetur
        amet exercitationem fugit saepe. Ea soluta, vitae ab sunt suscipit id
        blanditiis cumque quidem quo impedit inventore iste minus molestiae
        perferendis earum animi dolore debitis, excepturi dignissimos libero,
        dolor quasi.
      </p>
    </>
  );
};

export default ProgramDetailCard;
