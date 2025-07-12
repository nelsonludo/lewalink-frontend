import { Creator } from "./creator";
import { User } from "./user";

export type SchoolRating = {
  id: string;
  stars: number;
  message: string;
  schoolId: string;
  client: Pick<User, "name">;
  createdAt: Date;
  updatedAt: Date;
  isDeleted?: boolean;
  creator?: Creator;
};

export type SchoolRatingInfo = {
  schoolRating: SchoolRating[];
  totalItems: number;
};
