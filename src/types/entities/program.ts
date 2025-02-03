import { Creator } from "./creator";

export enum ProgramType {
  HND = "HND",
  BTECH = "BTECH",
  LICENCE = "LICENCE",
}

export enum ProgramFieldType {
  SCIENCE = "SCIENCE",
  TECHNOLOGY = "TECHNOLOGY",
  HEALTH = "HEALTH",
}

export type Program = {
  id: string;
  name: string;
  description: string;
  type: ProgramType;
  field: ProgramFieldType;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
  isDeleted?: boolean;
  creator?: Creator;
};
