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
