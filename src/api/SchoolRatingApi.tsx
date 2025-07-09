import { useState } from "react";
import { SingleItemResponseType } from "../types/response/success-response-types";
import { AxiosError } from "axios";
import { ErrorResponseType } from "../types/response/error-response-type";
import useAxios from "../hooks/useAxios";
import { CODES, SUCCESS_CODE } from "../types/enums/error-codes";

import { displayErrorToastBasedOnCode } from "../utils/display-error-toast-based-on-code";
import { Payload } from "../types/general";

import { failedToast } from "../utils/toasts";
import { useDispatch } from "react-redux";
import { setCurrentSchoolRating } from "../store/userHome.slice";
import { SchoolRating } from "../types/entities/school-rating";

const API_URL = "/api/school-rating/v1";

export const useUserGetCurrentSchoolRating = () => {
  const [loading, setLoading] = useState(false);

  const [notFound, setNotFound] = useState(false);
  const dispatch = useDispatch();

  const { axios } = useAxios();

  const userGetCurrentSchoolRating = async ({ id }: Payload) => {
    setNotFound(false);
    try {
      setLoading(true);
      const { data } = await axios.get<SingleItemResponseType<SchoolRating>>(
        `${API_URL}/${id}`
      );
      if (data.code === SUCCESS_CODE.SUCCESS) {
        dispatch(setCurrentSchoolRating(data.data));
      }

      return data.data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponseType>;
      const code = error.response?.data.code;

      console.log(error);

      if (code === CODES.NOT_FOUND) {
        failedToast("Program does not exist");
        setNotFound(true);
        return;
      }

      displayErrorToastBasedOnCode(code);
    } finally {
      setLoading(false);
    }
  };

  return {
    userGetCurrentSchoolRating,
    loading,
    notFound,
  };
};
