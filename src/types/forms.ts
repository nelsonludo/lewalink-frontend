import { ProgramFieldType, ProgramType } from "./entities/program";
import { SchoolType } from "./entities/school";

export type CreateAccountFormType = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

export type LoginFormType = {
  email: string;
  password: string;
};

export type CourseFormType = {
  code: string;
  title: string;
  description: string;
  credits: number;
};

export type ForgotPasswordFormType = {
  email: string;
};

export type ResetPasswordFormType = {
  password: string;
  confirmPassword: string;
};

export type ProgramFormType = {
  name: string;
  description: string;
  type: ProgramType;
  field: ProgramFieldType;
  duration: number;
};

export type SchoolFormType = {
  name: string;
  type: SchoolType;
  longitude: number;
  latitude: number;
  country: string;
  city: string;
  description?: string;
  email?: string;
  phoneNumber?: string;
  website?: string;
};
