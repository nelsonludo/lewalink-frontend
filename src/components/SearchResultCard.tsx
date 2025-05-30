import { FC } from "react";
import { Link } from "react-router-dom";

interface SearchResultCardProps {
  schoolName: string;
  speciality: string;
  language: string;
  duration: string;
  time: string;
  diploma: string;
  location: string;
  coursesNumber: number;
}

const SearchResultCard: FC<SearchResultCardProps> = ({
  schoolName,
  speciality,
  language,
  duration,
  time,
  diploma,
  location,
  coursesNumber,
}) => {
  return (
    <Link
      to={""}
      className="bg-white rounded-xl p-1 lg:p6 w-full flex flex-row text-base  text-xs lg:text-sm cursor-pointer hover:shadow-lg transition-shadow duration-200"
    >
      <div className=" w-[20%] rounded-xp mr-1 lg:mr-8">
        <img
          src="/images/userCircle.png"
          alt=""
          className="w-full h-[50%] lg:h-full border border-gray-400 rounded-xl object-cover"
        />
      </div>
      <div className="flex flex-col gap-1 w-[80%] items-start">
        <div className="flex w-full justify-between items-center">
          <h2 className="text-sm lg:xl font-semibold">{schoolName}</h2>
          <img src="/images/like.png" alt="" className="hidden lg:block" />
        </div>
        <h2 className="text-xl lg:2xl text-[#BB29FF] font-bold">
          {speciality}
        </h2>
        <h2 className="text-xs text-gray-400">{location}</h2>
        <h2 className="text-xs text-gray-400">Courses: {coursesNumber}</h2>
        <div className="my-2 flex flex-row lg:gap-8 gap-1 text-[9px] lg:text-xs">
          <div className="flex items-center">
            <img
              src="/images/icons/graduation-capIcon.png"
              alt=""
              className="w-4 h-4 lg:w-4 lg:h-4"
            />
            <span className="ml-1">{diploma}</span>
          </div>
          <div className="flex items-center">
            <img
              src="/images/icons/clockIcon.png"
              alt=""
              className="w-3 h-3 lg:w-4 lg:h-4"
            />
            <span className="ml-1">{time}</span>
          </div>
          <div className="flex items-center">
            <img
              src="/images/icons/calendarIcon.png"
              alt=""
              className="w-3 h-3 lg:w-4 lg:h-4"
            />
            <span className="ml-1">{duration}</span>
          </div>
          <div className="flex items-center">
            <img
              src="/images/icons/languageIcon.png"
              alt=""
              className="w-3 h-3 lg:w-4 lg:h-4"
            />
            <span className="ml-1">{language}</span>
          </div>
        </div>
        <div
          className={`flex items-center rounded-lg w-full cursor-pointer 
               `}
        >
          {[...Array(5)].map((_, i) => (
            <img
              key={i}
              src={i < 3 ? "/images/fullStar.png" : "/images/emptyStar.png"}
              alt=""
            />
          ))}
        </div>
      </div>
    </Link>
  );
};

export default SearchResultCard;
