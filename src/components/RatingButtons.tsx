import { FC, useState } from "react";
import StarRating from "../pages/home/components/StarRating";
import { useSelector } from "react-redux";
import { AuthInitialStateType } from "../store/auth.slice";
import { failedToast } from "../utils/toasts";
import { useNavigate } from "react-router-dom";

type RatingButtonsProps = {
  max?: number;
  onRate?: (rating: number) => void;
  initialRating?: number;
};

const RatingButtons: FC<RatingButtonsProps> = ({
  max = 5,
  onRate,
  initialRating = 0,
}) => {
  const [selected, setSelected] = useState(initialRating);

  const { user }: AuthInitialStateType = useSelector(
    (state: any) => state.authSlice as AuthInitialStateType
  );
  const navigate = useNavigate();

  const handleRate = (rating: number) => {
    if (!user) {
      failedToast("Please log in to rate.");
      navigate("/signin");
      return;
    }
    setSelected(rating);
    onRate?.(rating);
  };

  return (
    <div className="flex items-center gap-2">
      {[...Array(max)].map((_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Rate ${i + 1} star${i === 0 ? "" : "s"}`}
          onClick={() => handleRate(i + 1)}
          className="focus:outline-none"
        >
          <StarRating
            buttonVariant
            max={1}
            rating={selected > i ? 1 : 0}
            className="inline-flex"
          />
        </button>
      ))}
    </div>
  );
};

export default RatingButtons;
