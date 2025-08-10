import { ProgramFieldType, ProgramType } from "../types/entities/program";
import { SchoolType } from "../types/entities/school";

export const randomBgs = [
  "bg-pink-600",
  "bg-purple-600",
  "bg-yellow-500",
  "bg-green-500",
];

export const schoolTypes = [
  { value: SchoolType.PRIVATE_UNIVERSITY, title: "Private university" },
  {
    value: SchoolType.PUBLIC_STATE_UNIVERSITY,
    title: "Public state university",
  },
];

export const programTypes = [
  { value: ProgramType.BTECH, title: "Bachelor's of technology" },
  {
    value: ProgramType.HND,
    title: "Higher national diploma",
  },
];

export const programFields = [
  { value: ProgramFieldType.HEALTH, title: "Health" },
  {
    value: ProgramFieldType.TECHNOLOGY,
    title: "Technology",
  },
];
