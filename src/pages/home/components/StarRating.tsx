type StarRatingProps = {
  rating?: number;
  max?: number;
  className?: string;
  buttonVariant?: boolean;
};

const StarRating: React.FC<StarRatingProps> = ({
  rating = 0,
  max = 5,
  className,
  buttonVariant = false,
}) => (
  <div className={className}>
    {[...Array(max)].map((_, i) => {
      const diff = rating - i;
      let starSrc = "/images/emptyStar.png";
      if (diff >= 1) {
        starSrc = "/images/fullStar.png";
      } else if (diff >= 0.5) {
        starSrc = "/images/halfStar.png";
      }
      return (
        <img
          key={i}
          src={starSrc}
          alt=""
          className={`${buttonVariant && "w-7 h-7"}`}
        />
      );
    })}
  </div>
);

export default StarRating;
