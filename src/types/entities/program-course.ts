import { Course } from "./course";
import { Creator } from "./creator";
import { Program } from "./program";

export type ProgramCourse = {
  id: string;
  program: Pick<Program, "id" | "name" | "isDeleted">;
  course: Course;
  createdAt: Date;
  updatedAt: Date;
  isDeleted?: boolean;
  creator?: Creator;
};
