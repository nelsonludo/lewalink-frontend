import { FC } from "react";
import { Link } from "react-router-dom";
import StarRating from "../pages/home/components/StarRating";
import { useState, useEffect } from "react";

interface SearchResultCardProps {
  schoolid: string;
  schoolName: string;
  type: string;
  // language: string;
  // duration: string;
  distance: number | undefined;
  // diploma: string;
  location: string;
  rating: number;
  // coursesNumber: number;
}

const FAVORITES_KEY = "favoriteSchools";

const SearchResultCard: FC<SearchResultCardProps> = ({
  schoolid,
  schoolName,
  type,
  distance,
  location,
  rating,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
    setIsFavorite(favorites.includes(schoolid));
  }, [schoolid]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const favorites: string[] = JSON.parse(
      localStorage.getItem(FAVORITES_KEY) || "[]"
    );
    let updatedFavorites;
    if (favorites.includes(schoolid)) {
      updatedFavorites = favorites.filter((id) => id !== schoolid);
      setIsFavorite(false);
    } else {
      updatedFavorites = [...favorites, schoolid];
      setIsFavorite(true);
    }
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  };

  return (
    <Link
      to={`/home/universities/school/${schoolid}`}
      className="bg-white rounded-xl p-1 lg:p-6 w-full flex flex-row text-base  text-xs lg:text-sm cursor-pointer hover:shadow-lg transition-shadow duration-200"
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
        </div>
        <h2 className="text-xl lg:2xl text-[#BB29FF] font-bold">{type}</h2>
        <h2 className="text-xs text-gray-400">{location}</h2>
        <div className="my-2 flex flex-row lg:gap-8 gap-1 text-[9px] lg:text-xs">
          <div className="flex items-center">
            <img
              src="/images/icons/clockIcon.png"
              alt=""
              className="w-3 h-3 lg:w-4 lg:h-4"
            />
            <span className="ml-1">{distance || 0}m away</span>
          </div>
        </div>
        <StarRating
          className={`flex items-center rounded-lg w-full cursor-pointer `}
          rating={rating}
        />
      </div>
      <div className=" w-[10%] ">
        <button
          name="favoriteButton"
          type="button"
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className="focus:outline-none hover:scale-110 transition-transform duration-150 relative group"
        >
          <img
            src={isFavorite ? "/images/liked.png" : "/images/like.png"}
            alt={isFavorite ? "Favorited" : "Not favorited"}
          />
          <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-10">
            {isFavorite ? "Remove from favorites" : "Add to favorites"}
          </span>
        </button>
      </div>
    </Link>
  );
};

export default SearchResultCard;
