import { ProgramFieldType, ProgramType } from "./entities/program";

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
