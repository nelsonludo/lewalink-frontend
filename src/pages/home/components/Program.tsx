import { useParams } from "react-router-dom";
import ProgramDetailCard from "./ProgramDetailCard";
import { Description } from "@headlessui/react";
import { useState } from "react";
import Card from "./Card";
import CoursesDetailsCard from "./CoursesDetailsCard";
import RatingsAndReviews from "./RatingsAndReviews";

const Program = () => {
  const { id } = useParams();
  const [program, setProgram] = useState({
    schoolName: "Harvard University",
    speciality: "Computer Science",
    Description:
      "A comprehensive program in computer science covering algorithms, data structures, and software engineering.",
    time: "Full-time",
    duration: "4 years",
    diploma: "Bachelor's Degree",
    language: "English",
    coursesNumber: 120,
  });

  return (
    <div className="h-full bg-[#f4eaff]">
      <div className="h-100 bg-[#bb29ff]">
        <div
          className="h-full w-full flex justify-center items-center"
          style={{
            backgroundImage: "url('/images/billBoardOrangeDottedLine.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0,
          }}
        >
          <div className="bg-black/50 flex w-[70%] h-full">
            <div className="flex flex-col justify-start items-start w-[70%] h-full px-8 py-4 gap-4">
              <div className="flex w-full items-center">
                <div className=" w-[20%] rounded-xp mr-1 lg:mr-4">
                  <img
                    src="/images/userCircle.png"
                    alt=""
                    className="w-full h-full border border-gray-400 rounded-xl object-cover"
                  />
                </div>
                <div className="w-full">
                  <h1 className="text-white text-xl lg:text-4xl font-bold  ">
                    {program.schoolName}
                  </h1>
                  <h2 className="text-white text-2xl ">school sub title</h2>
                </div>
              </div>
              <div className="w-full ">
                <h2 className="text-4xl text-[#6DFF29] font-bold">
                  {program.speciality}
                </h2>
              </div>
              <div className="w-full ">
                <h2 className="text-md text-white">{program.Description}</h2>
              </div>
              <div className="w-full ">
                <h2 className="text-md text-white">School Rating</h2>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <img key={i} src={"/images/emptyStar.png"} alt="" />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-start w-[30%] h-full px-8 py-2">
              <div className="flex my-1 gap-2">
                <img src="/images/cameroun.png" alt="" className="w-6 h-6" />
                <h2 className="text-sm text-white">{"program country"}</h2>
              </div>
              <div className="flex my-1 gap-2">
                <img src="/images/cameroun.png" alt="" className="w-6 h-6" />
                <h2 className="text-sm text-white">{"program address"}</h2>
              </div>
              <div className="flex my-1 gap-2">
                <img src="/images/cameroun.png" alt="" className="w-6 h-6" />
                <h2 className="text-sm text-white">{"program email"}</h2>
              </div>
              <div className="flex my-1 gap-2">
                <img src="/images/cameroun.png" alt="" className="w-6 h-6" />
                <h2 className="text-sm text-white">{"program telephon"}</h2>
              </div>
              <div className="flex my-1 gap-2">
                <img src="/images/cameroun.png" alt="" className="w-6 h-6" />
                <h2 className="text-sm text-white">{"program website"}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center items-center py-10">
        <div className="w-[70%] flex flex-col gap-4">
          <div>
            <div className="flex justify-between items-center border-b border-gray-300 my-4 pb-4">
              <h2 className="text-3xl font-bold text-[#37353A]">Program</h2>
            </div>
            <Card
              child={
                <ProgramDetailCard
                  time={program.time}
                  diploma={program.diploma}
                  duration={program.duration}
                  language={program.language}
                  speciality={program.speciality}
                />
              }
            />
          </div>
          <div>
            <div className="flex justify-between items-center border-b border-gray-300 my-4 pb-4">
              <h2 className="text-3xl font-bold text-[#37353A]">Courses</h2>
            </div>
            <Card
              child={
                <CoursesDetailsCard
                  courses={[
                    "bananenoienasnetsetn",
                    "bananenoienasnetsetn",
                    "bananenoienasnetsetn bananenoienasnetsetn",
                  ]}
                />
              }
            />
          </div>
          <div>
            <div className="flex justify-between items-center border-b border-gray-300 my-4 pb-4">
              <h2 className="text-3xl font-bold text-[#37353A]">
                Fee Structure
              </h2>
            </div>
            <Card
              child={
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
                  ipsum fugiat quos autem, excepturi optio modi. Nobis
                  temporibus cupiditate voluptate.
                </p>
              }
            />
          </div>
          <div>
            <div className="flex justify-between items-center border-b border-gray-300 my-4 pb-4">
              <h2 className="text-3xl font-bold text-[#37353A]">
                School Google Maps
              </h2>
            </div>
            <Card child={<img src="/images/mapPlaceHolder.png" />} />
          </div>
          <div>
            <div className="flex justify-between items-center border-b border-gray-300 my-4 pb-4">
              <h2 className="text-3xl font-bold text-[#37353A]">
                Rating and Reviews
              </h2>
            </div>
            <Card
              child={
                <RatingsAndReviews averageStars={2.4} ratingsNumber={300300} />
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Program;
