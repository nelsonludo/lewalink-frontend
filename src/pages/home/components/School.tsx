import { useParams } from "react-router-dom";
import Card from "./Card";
import CoursesDetailsCard from "./CoursesDetailsCard";
import RatingsAndReviews from "./RatingsAndReviews";
import { userHomeInitialStateType } from "../../../store/userHome.slice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useUserGetCurrentSchoolPrograms } from "../../../api/SchoolProgramApi";
import {
  useUserGetSchools,
  useUserGetSingleSchool,
} from "../../../api/SchoolApi";
import { SchoolType } from "../../../types/entities/school";
import StarRating from "./StarRating";

const SchoolScreen = () => {
  const { id } = useParams();
  const { userGetSchools } = useUserGetSchools();
  const { currentSchool, currentSchoolPrograms }: userHomeInitialStateType =
    useSelector(
      (state: any) => state.userHomeSlice as userHomeInitialStateType
    );

  const [programTypes, setProgramTypes] = useState<string[]>([]);
  const [allPrograms, setAllPrograms] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const { userGetCurrentSchoolPrograms } = useUserGetCurrentSchoolPrograms();
  const { userGetSingleSchool } = useUserGetSingleSchool();

  // Fetch schools and programs on mount or when id changes
  useEffect(() => {
    setLoading(true);
    Promise.all([
      userGetSchools({ type: SchoolType.PRIVATE_UNIVERSITY }),
      userGetCurrentSchoolPrograms({ id: id ?? "" }),
    ]).finally(() => setLoading(false));
  }, [id]);

  // Update currentSchool when schools or id changes
  useEffect(() => {
    userGetSingleSchool({ id: id ?? "" });
  }, []);

  // Update programTypes and allPrograms when currentSchoolPrograms changes
  useEffect(() => {
    if (currentSchoolPrograms && currentSchoolPrograms.length > 0) {
      setProgramTypes(currentSchoolPrograms.map((item) => item?.program?.type));
      setAllPrograms(currentSchoolPrograms.map((item) => item.program));
    } else {
      setProgramTypes([]);
      setAllPrograms([]);
    }
  }, [currentSchoolPrograms]);

  // Optionally, show a loading spinner or placeholder while loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <span>Loading...</span>
      </div>
    );
  }

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
                    {currentSchool?.name}
                  </h1>
                  <h2 className="text-white text-2xl ">school sub title</h2>
                </div>
              </div>
              <div className="w-full ">
                <h2 className="text-4xl text-[#6DFF29] font-bold">
                  {currentSchool?.type}
                </h2>
              </div>
              <div className="w-full ">
                <h2 className="text-md text-white">
                  {currentSchool?.description}
                </h2>
              </div>

              <div className="w-full ">
                <h2 className="text-md text-white">School Rating</h2>
                <StarRating
                  max={5}
                  rating={currentSchool?.rating}
                  className="flex"
                />
              </div>
            </div>

            <div className="flex flex-col justify-start w-[30%] h-full px-8 py-2">
              <div className="flex my-1 gap-2">
                <img src="/images/cameroun.png" alt="" className="w-6 h-6" />
                <h2 className="text-sm text-white">{currentSchool?.country}</h2>
              </div>
              <div className="flex my-1 gap-2">
                <img src="/images/cameroun.png" alt="" className="w-6 h-6" />
                <h2 className="text-sm text-white">
                  {currentSchool?.fullAddressName}
                </h2>
              </div>
              <div className="flex my-1 gap-2">
                <img src="/images/cameroun.png" alt="" className="w-6 h-6" />
                <h2 className="text-sm text-white">{currentSchool?.email}</h2>
              </div>
              <div className="flex my-1 gap-2">
                <img src="/images/cameroun.png" alt="" className="w-6 h-6" />
                <h2 className="text-sm text-white">
                  {currentSchool?.phoneNumber}
                </h2>
              </div>
              <a href={currentSchool?.website} className="flex my-1 gap-2">
                <img src="/images/cameroun.png" alt="" className="w-6 h-6" />
                <h2 className="text-sm text-white">{currentSchool?.website}</h2>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center items-center py-10">
        <div className="w-[70%] flex flex-col gap-4">
          <div>
            <div className="flex justify-between items-center border-b border-gray-300 my-4 pb-4">
              <h2 className="text-3xl font-bold text-[#37353A]">Programs</h2>
            </div>
            <Card
              child={
                <CoursesDetailsCard
                  Programs={allPrograms}
                  variant
                  tabs={programTypes}
                />
              }
            />
          </div>

          <div>
            <div className="flex justify-between items-center border-b border-gray-300 my-4 pb-4">
              <h2 className="text-3xl font-bold text-[#37353A]">
                School Google Maps
              </h2>
            </div>
            <Card
              child={
                currentSchool?.latitude && currentSchool?.longitude ? (
                  <iframe
                    title="School Location"
                    width="100%"
                    height="300"
                    style={{ border: 0, borderRadius: "12px" }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=${currentSchool.latitude},${currentSchool.longitude}&hl=es;z=14&output=embed`}
                  />
                ) : (
                  <div className="flex flex-col justify-center items-center h-72 text-gray-500">
                    <span className="text-5xl mb-2 animate-bounce">
                      <svg
                        width="48"
                        height="48"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 21c-4.418 0-8-3.582-8-8a8 8 0 1116 0c0 4.418-3.582 8-8 8zm0-11a3 3 0 100 6 3 3 0 000-6z"
                        />
                      </svg>
                    </span>
                    <span className="text-lg font-semibold mb-2">
                      Location Not Available
                    </span>
                    <button
                      className="mt-2 px-4 py-2 bg-[#bb29ff] text-white rounded-lg hover:bg-[#a020f0] transition"
                      onClick={() =>
                        window.alert(
                          "Please contact the school for location details."
                        )
                      }
                    >
                      Contact School
                    </button>
                  </div>
                )
              }
            />
          </div>

          <div>
            <div className="flex justify-between items-center border-b border-gray-300 my-4 pb-4">
              <h2 className="text-3xl font-bold text-[#37353A]">
                Rating and Reviews
              </h2>
            </div>
            <Card
              child={
                <RatingsAndReviews
                  currentSchoolId={currentSchool?.id}
                  currentSchoolRatingAverage={currentSchool?.rating}
                />
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolScreen;
