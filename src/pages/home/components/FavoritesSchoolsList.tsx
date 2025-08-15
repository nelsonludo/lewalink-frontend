import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { School } from "../../../types/entities/school";
import { userHomeInitialStateType } from "../../../store/userHome.slice";
import { useSelector } from "react-redux";
import { useUserGetSchools } from "../../../api/SchoolApi";
import StarRating from "./StarRating";

const FAVORITES_KEY = "favoriteSchools";

const FavoritesSchoolsList: React.FC = () => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [favoritedSchools, setFavoritedSchools] = useState<School[]>([]);
  const { schools }: userHomeInitialStateType = useSelector(
    (state: any) => state.userHomeSlice as userHomeInitialStateType
  );
  const { loading } = useUserGetSchools();

  useEffect(() => {
    const ids = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
    setFavoriteIds(ids);
  }, []);

  useEffect(() => {
    // Only include schools whose ids are in favoriteIds
    const filteredSchools = schools.filter((school) =>
      favoriteIds.includes(school.id)
    );

    setFavoritedSchools(filteredSchools);
  }, [favoriteIds]);

  const handleRemoveFavorite = (schoolid: string) => {
    const updatedIds = favoriteIds.filter((id) => id !== schoolid);
    setFavoriteIds(updatedIds);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedIds));
  };

  if (loading) {
    return <div className="p-4 text-center">Loading favorites...</div>;
  }

  if (!favoriteIds || favoriteIds.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No favorite schools yet. Add some from the search page!
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Favorite Schools</h2>
      <ul className="space-y-4">
        {favoritedSchools.map((school) => (
          <li
            key={school.id}
            className="bg-white rounded-xl p-4 flex flex-row items-center shadow hover:shadow-lg transition-shadow"
          >
            <img
              src="/images/userCircle.png"
              alt=""
              className="w-16 h-16 border border-gray-400 rounded-xl object-cover mr-4"
            />
            <div className="flex-1">
              <Link
                to={`/home/universities/school/${school.id}`}
                className="text-lg font-semibold hover:underline"
              >
                {school.name}
              </Link>
              <div className="text-purple-600 font-bold">{school.type}</div>

              <StarRating rating={school.rating} className="flex flex-row" />
            </div>
            <button
              onClick={() => handleRemoveFavorite(school.id)}
              className="ml-4 p-2 rounded-full bg-gray-100 hover:bg-red-100 transition-colors"
              aria-label="Remove from favorites"
              title="Remove from favorites"
            >
              <img
                src="/images/liked.png"
                alt="Remove favorite"
                className="w-6 h-6"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesSchoolsList;
