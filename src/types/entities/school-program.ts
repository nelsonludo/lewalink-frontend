import { Creator } from "./creator";
import { Program } from "./program";
import { School } from "./school";

export type SchoolProgram = {
  id: string;
  school: Pick<School, "id" | "name" | "isDeleted">;
  program: Program;
  price?: number;
  createdAt: Date;
  updatedAt: Date;
  isDeleted?: boolean;
  creator?: Creator;
};
