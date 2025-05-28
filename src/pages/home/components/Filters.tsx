import { useState } from "react";

const Filters = () => {
  const [sort, setSort] = useState<"ascending" | "descending">("ascending");
  const [schoolCategory, setSchoolCategory] = useState<"public" | "private">(
    "public"
  );
  const [rating, setRating] = useState<number>(5);
  return (
    <div className="bg-white rounded-xl p-6 h-full">
      <div className="flex justify-between border-b border-gray-200 pb-4 ">
        <h2 className="text-2xl font-bold ">Filters</h2>
        <img src="/images/filter.png" alt="" className="w-6 h-6" />
      </div>
      <div className="w-[80%]">
        <div className="my-2">
          <span className="font-semibold text-gray-700">Sort</span>
          <button
            type="button"
            className={`flex gap-2 items-center mt-2 px-4 py-1 rounded-xl w-full cursor-pointer ${
              sort === "ascending" ? "bg-[#F4EAFF]" : ""
            }`}
            onClick={() => setSort("ascending")}
          >
            <img src="/images/ArrowUp.png" alt="" />
            <span>Ascending order</span>
          </button>
          <button
            type="button"
            className={`flex gap-2 items-center mt-2 px-4 py-1 rounded-xl w-full cursor-pointer ${
              sort === "descending" ? "bg-[#F4EAFF]" : ""
            }`}
            onClick={() => setSort("descending")}
          >
            <img src="/images/ArrowUp.png" alt="" className="rotate-180" />
            <span>Descending order</span>
          </button>
        </div>
        <div className="my-2">
          <span className="font-semibold text-gray-700">School Categories</span>
          <button
            type="button"
            className={`flex gap-2 items-center mt-2 px-4 py-1 rounded-xl w-full cursor-pointer ${
              schoolCategory === "public" ? "bg-[#F4EAFF]" : ""
            }`}
            onClick={() => setSchoolCategory("public")}
          >
            <span>Public universities</span>
          </button>
          <button
            type="button"
            className={`flex gap-2 items-center mt-2 px-4 py-1 rounded-xl w-full cursor-pointer ${
              schoolCategory === "private" ? "bg-[#F4EAFF]" : ""
            }`}
            onClick={() => setSchoolCategory("private")}
          >
            <span>Private universities</span>
          </button>
        </div>
        <div className="my-2">
          <span className="font-semibold text-gray-700 mt-4">
            School Rating
          </span>
          {[5, 4, 3, 2, 1].map((star) => (
            <button
              key={star}
              type="button"
              className={`flex items-center rounded-lg px-4 py-2 w-full cursor-pointer ${
                rating === star ? "bg-[#F4EAFF]" : ""
              }`}
              onClick={() => setRating(star)}
            >
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={
                    i < star ? "/images/fullStar.png" : "/images/emptyStar.png"
                  }
                  alt=""
                />
              ))}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
