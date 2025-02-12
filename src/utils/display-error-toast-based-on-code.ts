import { CODE } from "../types/enums/error-codes";
import { failedToast } from "./toasts";

export const displayErrorToastBasedOnCode = (code: CODE | undefined) => {
  switch (code) {
    case CODE.NO_ACCESS_TOKEN:
      failedToast("No token provided");
      break;
    case CODE.NOT_FOUND:
      failedToast("User not found");
      break;
    case CODE.ACCOUNT_NOT_ACTIVATED:
      failedToast(
        "Your account has been created already, check your email to activate it."
      );
      break;
    case CODE.ACCOUNT_DELETED:
      failedToast("Account deleted");
      break;
    case CODE.CANNOT_DECODE_TOKEN:
      failedToast("Unable to validate credentials");
      break;
    case CODE.NOT_ALLOWED:
      failedToast("You are not allowed to perform this action");
      break;
    default:
      failedToast("Something went wrong");
      break;
  }
};
