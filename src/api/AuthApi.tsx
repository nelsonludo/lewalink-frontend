import { useState } from "react";
import {
  CreateAccountFormType,
  ForgotPasswordFormType,
  LoginFormType,
  ResetPasswordFormType,
} from "../types/forms";
import { failedToast, successToast } from "../utils/toasts";
import { ErrorResponseType } from "../types/response/error-response-type";
import {
  SimpleSuccessResponseType,
  SingleItemResponseType,
} from "../types/response/success-response-types";
import { User } from "../types/entities/user";
import { AxiosError } from "axios";
import { CODES, SUCCESS_CODE } from "../types/enums/error-codes";
import { setLoadingUser, setUser } from "../store/auth.slice";
import { useDispatch } from "react-redux";
import useAxios from "../hooks/useAxios";
import axiosMain from "axios";
import { useNavigate } from "react-router-dom";
import { TokenHelper } from "../utils/tokensHelper";

const API_URL = "/api/auth/v1";

export const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const { axios } = useAxios();

  const signUp = async ({ name, email, password }: CreateAccountFormType) => {
    try {
      setLoading(true);
      const { data } = await axios.post<SimpleSuccessResponseType>(
        `${API_URL}/create`,
        { name, email, password }
      );

      if (data.code === SUCCESS_CODE.SUCCESS) {
        successToast("Check your email to activate your account");
      } else {
        throw new Error();
      }
    } catch (err) {
      const error = err as AxiosError<ErrorResponseType>;
      const code = error.response?.data.code;

      console.log(error);

      switch (code) {
        case CODES.EMAIL_IN_USE:
          failedToast("Email already in use");
          break;
        case CODES.VALIDATION_REQUEST_ERROR:
          failedToast("Make sure you enter the correct info");
          break;
        case CODES.UNEXPECTED_ERROR:
          failedToast("Unexpected error occured");
          break;
        case CODES.ACCOUNT_NOT_ACTIVATED:
          failedToast(
            "Your account has been created already, check your email to activate it."
          );

          break;
        default:
          failedToast("Something went wrong");
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, signUp };
};

export const useSignin = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { axios } = useAxios();
  const navigate = useNavigate();

  const signIn = async (userFormData: LoginFormType, urlParam: string) => {
    try {
      setLoading(true);
      const { data } = await axios.post<SingleItemResponseType<User>>(
        `${API_URL}/signin`,
        {
          ...userFormData,
        }
      );

      if (
        data.code === SUCCESS_CODE.SUCCESS &&
        data.data.accessToken &&
        data.data.refreshToken
      ) {
        const tokenHelper = new TokenHelper();
        tokenHelper.setTokens(data.data.accessToken, data.data.refreshToken);
        const userState = { ...data.data };
        userState.refreshToken = undefined;
        userState.accessToken = undefined;
        dispatch(setUser(userState));
        navigate(urlParam);
      } else {
        throw new Error();
      }
    } catch (err) {
      const error = err as AxiosError<ErrorResponseType>;
      const code = error.response?.data.code;

      console.log(error);

      switch (code) {
        case CODES.UNABLE_TO_LOGIN:
          failedToast("Unable to login");
          break;
        case CODES.UNEXPECTED_ERROR:
          failedToast("Unexpected error occured");
          break;
        default:
          failedToast("Something went wrong");
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, signIn };
};

export const useLogout = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { axios } = useAxios();

  const logout = async () => {
    try {
      dispatch(setLoadingUser(true));
      const { data } = await axios.post<SimpleSuccessResponseType>(
        `${API_URL}/logout`
      );

      console.log("data", data);

      if (data.code === SUCCESS_CODE.SUCCESS) {
        const tokenHelper = new TokenHelper();
        tokenHelper.deleteTokens();
        dispatch(setUser(null));
        navigate("/signin");
      }
    } catch (err) {
      const error = err as AxiosError<ErrorResponseType>;
      console.log(error);

      const code = error.response?.data.code;
      switch (code) {
        case CODES.UNEXPECTED_ERROR:
          failedToast("Unable to logout");
          break;
        default:
          failedToast("Something went wrong");
          break;
      }
    } finally {
      dispatch(setLoadingUser(false));
      setLoading(false);
    }
  };

  return { loading, logout };
};

export const useGoogleAuth = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { axios } = useAxios();
  const navigate = useNavigate();

  const googleAuth = async (code: string, urlParam: string) => {
    try {
      setLoading(true);
      const { data } = await axios.post<SingleItemResponseType<User>>(
        `${API_URL}/oauth-google`,
        {
          code,
        }
      );

      if (
        data.code === SUCCESS_CODE.SUCCESS &&
        data.data.accessToken &&
        data.data.refreshToken
      ) {
        const tokenHelper = new TokenHelper();
        tokenHelper.setTokens(data.data.accessToken, data.data.refreshToken);
        const userState = { ...data.data };
        userState.refreshToken = undefined;
        userState.accessToken = undefined;
        dispatch(setUser(userState));
        navigate(urlParam);
      } else {
        throw new Error();
      }
    } catch (err) {
      const error = err as AxiosError<ErrorResponseType>;
      const code = error.response?.data.code;

      console.log(error);

      switch (code) {
        case CODES.UNABLE_TO_LOGIN:
          failedToast("Unable to login");
          break;
        case CODES.CLIENT_ONLY:
          failedToast("Super users cannot use this method to login");
          break;
        case CODES.UNEXPECTED_ERROR:
          failedToast("Unexpected error occured");
          break;
        default:
          failedToast("Something went wrong");
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, googleAuth };
};

export const useGetProfile = () => {
  const dispatch = useDispatch();
  const { axios } = useAxios();

  const getProfile = async () => {
    dispatch(setLoadingUser(true));
    try {
      const { data } = await axios.get<SingleItemResponseType<User>>(
        `${API_URL}/profile`
      );
      if (data.code === SUCCESS_CODE.SUCCESS) {
        dispatch(setUser(data.data));
      }
    } catch (err) {
      const error = err as AxiosError<ErrorResponseType>;
      console.log(error);
    } finally {
      dispatch(setLoadingUser(false));
    }
  };

  return { getProfile };
};

// export const useLogout = () => {
//
// };

// export const useUpdateAccount = () => {
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();
//   const { axios } = useAxios();

//   const updateAccount = async (userFormData: UpdateAccountFormType) => {
//     try {
//       setLoading(true);
//       const { data } = await axios.put<SingleItemResponseType<User>>(
//         `${API_URL}`,
//         { ...userFormData }
//       );

//       if (data.code) {
//         dispatch(setUser(data.data));
//         successToast("Account updated successfully");
//       } else {
//         throw new Error();
//       }
//     } catch (err) {
//       const error = err as AxiosError<ErrorResponseType>;
//       console.log(error);

//       const code = error.response?.data.code;
//       switch (code) {
//         case CODES.VALIDATION_REQUEST_ERROR:
//           failedToast("Make sure you enter the correct info");
//           break;
//         case CODES.NOT_FOUND:
//           failedToast("Account not found");
//           break;
//         case CODES.UNEXPECTED_ERROR:
//           failedToast("Unexpected error occured");
//           break;
//         default:
//           failedToast("Something went wrong");
//           break;
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { loading, updateAccount };
// };

// export const useUpdatePassword = () => {
//   const [loading, setLoading] = useState(false);
//   const { axios } = useAxios();

//   const updatePassword = async (userFormData: UpdatePasswordFormType) => {
//     try {
//       setLoading(true);
//       const { data } = await axios.patch<SimpleSuccessResponseType>(
//         `${API_URL}/password`,
//         { ...userFormData }
//       );

//       successToast("Password updated successfully");
//       return data;
//     } catch (err) {
//       const error = err as AxiosError<ErrorResponseType>;
//       console.log(error);

//       const code = error.response?.data.code;
//       switch (code) {
//         case CODES.VALIDATION_REQUEST_ERROR:
//           failedToast("Make sure you enter the correct info");
//           break;
//         case CODES.NOT_FOUND:
//           failedToast("Account not found");
//           break;
//         case CODES.PASSWORD_DOES_NOT_MATCH:
//           failedToast("Wrong current password");
//           break;
//         case CODES.PASSWORDS_MUST_BE_THE_SAME:
//           failedToast("Make sure that you confirm your new password");
//           break;
//         case CODES.UNEXPECTED_ERROR:
//           failedToast("Unexpected error occured");
//           break;
//         default:
//           failedToast("Something went wrong");
//           break;
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { loading, updatePassword };
// };

export const useRefreshToken = () => {
  const axios = axiosMain.create({
    baseURL: "http://localhost:3000/",
  });
  const dispatch = useDispatch();

  const tokenHelper = new TokenHelper();
  const { refreshToken: token } = tokenHelper.getTokens();

  const refreshToken = async () => {
    try {
      const { data } = await axios.post<SingleItemResponseType<User>>(
        `${API_URL}/token`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (
        data.code === SUCCESS_CODE.SUCCESS &&
        data.data.accessToken &&
        data.data.refreshToken
      ) {
        const tokenHelper = new TokenHelper();
        tokenHelper.setTokens(data.data.accessToken, data.data.refreshToken);
        const userState = { ...data.data };
        userState.refreshToken = undefined;
        userState.accessToken = undefined;
        dispatch(setUser(userState));

        return data;
      } else {
        throw new Error();
      }
    } catch (err) {
      const error = err as AxiosError<ErrorResponseType>;
      console.log(error);

      failedToast("Your session has expired, login to continue");

      setTimeout(() => {
        dispatch(setUser(null));

        const { pathname } = window.location;

        if (pathname !== "/signin" && pathname !== "/signup") {
          window.location.href = `/signin?url=${pathname}`;
        }
      }, 4000);
    }
  };

  return { refreshToken };
};

export const useActivateAccount = () => {
  const navigate = useNavigate();
  const { axios } = useAxios();

  const activateAccount = async (code: string) => {
    try {
      const { data } = await axios.post<SimpleSuccessResponseType>(
        `${API_URL}/activate`,
        {
          code,
        }
      );

      if (data.code === SUCCESS_CODE.SUCCESS) {
        successToast(
          "Your account has been activated successfully. You can now login."
        );
        navigate("/signin");
      } else {
        throw new Error();
      }
    } catch (err) {
      const error = err as AxiosError<ErrorResponseType>;
      const code = error.response?.data.code;

      console.log(error);

      switch (code) {
        case CODES.NOT_FOUND:
          failedToast("User does not exist");
          break;
        case CODES.VALIDATION_REQUEST_ERROR:
          failedToast("Make sure you enter the correct info");
          break;
        case CODES.UNEXPECTED_ERROR:
          failedToast("Unexpected error occured");
          break;
        default:
          failedToast("Something went wrong");
          break;
      }
    }
  };

  return { activateAccount };
};

export const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const { axios } = useAxios();

  const forgotPassword = async (userFormData: ForgotPasswordFormType) => {
    try {
      setLoading(true);

      const { data } = await axios.post<SimpleSuccessResponseType>(
        `${API_URL}/forgot-password`,
        {
          ...userFormData,
        }
      );

      if (data.code === SUCCESS_CODE.SUCCESS) {
        successToast("Check your email to reset your password");
      } else {
        throw new Error();
      }
    } catch (err) {
      const error = err as AxiosError<ErrorResponseType>;
      const code = error.response?.data.code;

      console.log(error);

      switch (code) {
        case CODES.NOT_FOUND:
          failedToast("Account does not exist");
          break;
        case CODES.VALIDATION_REQUEST_ERROR:
          failedToast("Make sure you enter the correct info");
          break;
        case CODES.ACCOUNT_NOT_ACTIVATED:
          failedToast("First check your email to activate your account");
          break;
        case CODES.UNEXPECTED_ERROR:
          failedToast("Unexpected error occured");
          break;
        default:
          failedToast("Something went wrong");
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, forgotPassword };
};

export const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const { axios } = useAxios();
  const navigate = useNavigate();

  const resetPassword = async (
    userFormData: ResetPasswordFormType,
    code: string
  ) => {
    try {
      setLoading(true);

      const { data } = await axios.patch<SimpleSuccessResponseType>(
        `${API_URL}/reset-password`,
        {
          code,
          password: userFormData.password,
        }
      );

      if (data.code === SUCCESS_CODE.SUCCESS) {
        successToast("Password has been reset successfully");
        navigate("/signin");
      } else {
        throw new Error();
      }
    } catch (err) {
      const error = err as AxiosError<ErrorResponseType>;
      const code = error.response?.data.code;

      console.log(error);

      switch (code) {
        case CODES.NOT_FOUND:
          failedToast("Account does not exist");
          break;
        case CODES.VALIDATION_REQUEST_ERROR:
          failedToast("Make sure you enter the correct info");
          break;
        case CODES.ACCOUNT_NOT_ACTIVATED:
          failedToast("First check your email to activate your account");
          break;
        case CODES.UNEXPECTED_ERROR:
          failedToast("Unexpected error occured");
          break;
        default:
          failedToast("Something went wrong");
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, resetPassword };
};
