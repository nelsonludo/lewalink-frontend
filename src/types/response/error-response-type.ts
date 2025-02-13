import { CODES } from "../enums/error-codes";

export type ErrorResponseType = {
  code: CODES;
  message: string;
};
