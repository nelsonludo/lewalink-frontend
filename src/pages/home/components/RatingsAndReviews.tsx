import { FC, useEffect, useState } from "react";
import {
  useUserCreateSchoolRating,
  useUserGetCurrentSchoolRating,
} from "../../../api/SchoolRatingApi";
// import { useSelector } from "react-redux";
// import { userHomeInitialStateType } from "../../../store/userHome.slice";
import StarRating from "./StarRating";
import RatingButtons from "../../../components/RatingButtons";
import { SchoolRating } from "../../../types/entities/school-rating";

type RatingsAndReviewsProps = {
  currentSchoolId?: string;
  currentSchoolRatingAverage?: number;
};

type RatingsPerStarType = {
  [key: number]: SchoolRating[];
};

const RatingsAndReviews: FC<RatingsAndReviewsProps> = ({
  currentSchoolId,
  currentSchoolRatingAverage,
}) => {
  const [ratingsPerStar, setRatingsPerStar] = useState<RatingsPerStarType>({});
  const { userGetCurrentSchoolRating } = useUserGetCurrentSchoolRating();
  const [review, setReview] = useState<string>("");
  const [userRating, setUserRating] = useState<number | null>(null);
  const { userCreateSchoolRating } = useUserCreateSchoolRating();

  // const { currentSchoolRating }: userHomeInitialStateType = useSelector(
  //   (state: any) => state.userHomeSlice as userHomeInitialStateType
  // );

  // Fetch ratings per star count
  useEffect(() => {
    const fetchRatings = async () => {
      const result: RatingsPerStarType = {};

      for (let star of [5, 4, 3, 2, 1]) {
        const ratings = await userGetCurrentSchoolRating({
          schoolId: currentSchoolId ?? "",
          ratingCount: star,
        });

        if (ratings) {
          result[star] = ratings;
        } else {
          result[star] = [];
        }
      }

      setRatingsPerStar(result);
    };

    if (currentSchoolId) fetchRatings();
  }, [currentSchoolId]);

  const total = Object.values(ratingsPerStar).reduce(
    (acc, list) => acc + list.length,
    0
  );

  const handleRate = (rating: number) => {
    setUserRating(rating);
  };
  // Handle submit review
  const handleSubmitReview = () => {
    userCreateSchoolRating({
      schoolId: currentSchoolId ?? "",
      stars: userRating ?? 0,
      message: review,
    });
    setUserRating(null);
    setReview("");
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex flex-col justify-center items-center lg:justify-start lg:items-start">
        <h2 className="text-lg font-bold w-fit">Rate Us</h2>
        <h2 className="text-xs lg:text-lg w-fit">
          Tell others about your experience
        </h2>
        <RatingButtons onRate={handleRate} />
        <div className="flex justify-center items-center gap-2">
          <textarea
            placeholder="Write a review..."
            value={review}
            onChange={(e) => {
              setReview(e.target.value);
            }}
            className="border rounded px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-[#DDB6FF]"
          />
          <button
            className={`px-4 py-2 rounded transition text-white ${
              !review || !userRating
                ? "bg-[#b48be3] cursor-not-allowed"
                : "bg-[#bb29ff] hover:bg-[#a020f0]"
            }`}
            onClick={handleSubmitReview}
            disabled={!review || !userRating}
          >
            Submit Review
          </button>
        </div>
      </div>

      <div className="flex gap-8 flex-wrap justify-center lg:justify-start ">
        <div className="flex flex-col gap-2 items-center">
          <h2 className="text-3xl font-bold">{currentSchoolRatingAverage}</h2>
          <StarRating
            max={5}
            rating={currentSchoolRatingAverage ?? 0}
            className="flex"
          />
          <h2 className="text-xs text-gray-500">
            {total >= 1_000_000
              ? `${(total / 1_000_000).toFixed(
                  total % 1_000_000 === 0 ? 0 : 1
                )}M`
              : total >= 1_000
              ? `${(total / 1_000).toFixed(total % 1_000 === 0 ? 0 : 1)}K`
              : total}{" "}
            reviews
          </h2>
        </div>

        <div className="w-full max-w-md">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = ratingsPerStar[star]?.length ?? 0;
            const percent = total === 0 ? 0 : (count / total) * 100;

            return (
              <div key={star} className="flex items-center gap-2">
                <h2 className="w-4">{star}</h2>
                <div className="bg-[#f4eaff] w-full rounded-full h-3">
                  <div
                    className="bg-[#FF5029] h-full rounded-full"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RatingsAndReviews;
