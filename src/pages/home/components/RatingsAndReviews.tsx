import { FC } from "react";

type RatingsAndReviewsProps = {
  averageStars: number;
  ratingsNumber: number;
};

const RatingsAndReviews: FC<RatingsAndReviewsProps> = ({
  averageStars,
  ratingsNumber,
}) => {
  return (
    <div className="flex flex-col gap-6 p-4">
      <div>
        <h2 className="text-lg font-bold">Rate Us</h2>
        <h2 className="text-md  ">Tell others about your experience</h2>
      </div>
      <div>
        <button
          type="button"
          className={`flex items-center rounded-lg w-full cursor-pointer`}
        >
          {[...Array(5)].map((_, i) => (
            <img
              key={i}
              src={"/images/emptyStar.png"}
              alt=""
              className="w-7 h-7 mr-8"
            />
          ))}
        </button>
      </div>
      <div className="flex gap-8">
        <div className="flex flex-col gap-2 items-center">
          <h2 className="text-3xl font-bold">{averageStars}</h2>
          <div className="flex items-center w-full">
            {[...Array(5)].map((_, i) => (
              <img key={i} src={"/images/emptyStar.png"} alt="" />
            ))}
          </div>
          <h2>{ratingsNumber}</h2>
        </div>
        <div className="w-full">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex w-full gap-2 items-center">
              <h2>{i + 1}</h2>
              <div className="bg-[#f4eaff] w-[85%] rounded-full h-3">
                <div
                  className={`bg-[#FF5029] w-[${50}%] rounded-full h-full`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RatingsAndReviews;
