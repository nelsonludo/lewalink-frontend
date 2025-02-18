import { Creator } from "./creator";
import { Program } from "./program";
import { School } from "./school";

enum Currency {
  XAF = "XAF",
}

export type SchoolProgram = {
  id: string;
  school: Pick<School, "id" | "name" | "isDeleted">;
  program: Program;
  price: number;
  currency: Currency;
  createdAt: Date;
  updatedAt: Date;
  isDeleted?: boolean;
  creator?: Creator;
};
