import { CODES as CODES } from "../types/enums/error-codes";
import { failedToast } from "./toasts";

export const displayErrorToastBasedOnCode = (code: CODES | undefined) => {
  switch (code) {
    case CODES.NO_ACCESS_TOKEN:
    case CODES.NO_REFRESH_TOKEN:
      failedToast("No token provided");
      break;
    case CODES.NOT_FOUND:
    case CODES.COURSE_DOES_NOT_EXIST:
    case CODES.SCHOOL_DOES_NOT_EXIST:
    case CODES.PROGRAM_DOES_NOT_EXIST:
    case CODES.PROGRAM_COURSE_DOES_NOT_EXIST:
    case CODES.SCHOOL_PROGRAM_DOES_NOT_EXIST:
      failedToast("Requested resource not found");
      break;
    case CODES.ACCOUNT_NOT_ACTIVATED:
      failedToast(
        "Your account has been created already, check your email to activate it."
      );
      break;
    case CODES.ACCOUNT_DELETED:
      failedToast("Account deleted");
      break;
    case CODES.CANNOT_DECODE_TOKEN:
      failedToast("Unable to validate credentials");
      break;
    case CODES.NOT_ALLOWED:
    case CODES.ADMIN_ONLY:
    case CODES.CLIENT_ONLY:
      failedToast("You are not allowed to perform this action");
      break;
    case CODES.UNAUTHORIZED:
      failedToast("Unauthorized access");
      break;
    case CODES.BAD_REQUEST:
      failedToast("Invalid request");
      break;
    case CODES.TOKEN_EXPIRED:
    case CODES.ACCESS_TOKEN_EXPIRED:
    case CODES.REFRESH_TOKEN_EXPIRED:
    case CODES.EXPIRED:
      failedToast("Token has expired, please log in again");
      break;
    case CODES.VALIDATION_REQUEST_ERROR:
      failedToast("Validation error in request");
      break;
    case CODES.EMAIL_IN_USE:
      failedToast("This email is already in use");
      break;
    case CODES.UNABLE_TO_LOGIN:
      failedToast("Login failed, check your credentials");
      break;
    case CODES.REUSE_DETECTION:
      failedToast("Suspicious activity detected");
      break;
    case CODES.MULTER_IMAGE_TYPE_ERROR:
    case CODES.MULTER_SIZE_ERROR:
    case CODES.MULTER_FILE_DOES_NOT_EXIST:
    case CODES.MULTER_TOO_MANY_IMAGES:
    case CODES.IMAGE_UPLOAD_ERROR:
    case CODES.PICTURE_DOES_NOT_EXIST:
    case CODES.CANNOT_DELETE_ALL_IMAGES:
      failedToast("Error processing image upload");
      break;
    case CODES.VIDEO_CONVERTED_ALREADY:
      failedToast("Video has already been converted");
      break;
    case CODES.VIDEO_IS_STILL_BEING_CONVERTED:
      failedToast("Video is still being processed");
      break;
    case CODES.PASSWORD_DOES_NOT_MATCH:
    case CODES.PASSWORDS_MUST_BE_THE_SAME:
      failedToast("Passwords do not match");
      break;
    case CODES.PASSWORD_EXIST_ALREADY:
      failedToast("A password is already set for this account");
      break;
    case CODES.NO_PASSWORD_TO_ACCOUNT:
      failedToast("No password found for this account");
      break;
    case CODES.SCHOOL_EXIST_ALREADY:
    case CODES.SCHOOL_PROGRAM_EXISTS_ALREADY:
    case CODES.PROGRAM_COURSE_EXISTS_ALREADY:
      failedToast("Resource already exists");
      break;
    case CODES.ROUTE_DOES_NOT_EXIST:
      failedToast("This route does not exist");
      break;
    case CODES.MAX_ADMINS:
      failedToast("Maximum number of admins reached");
      break;
    case CODES.NO_ID:
      failedToast("No ID provided");
      break;
    case CODES.GOOGLE_AUTH_ERROR:
      failedToast("Error with Google authentication");
      break;
    case CODES.DUPLICATE_RATING:
      failedToast("You have already rated this item");
      break;
    case CODES.NOT_YOUR_RATING:
      failedToast("You can only modify your own rating");
      break;
    case CODES.UNEXPECTED_ERROR:
    default:
      failedToast("Something went wrong");
      break;
  }
};
