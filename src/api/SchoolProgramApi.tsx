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
import { setCurrentSchoolPrograms } from "../store/userHome.slice";
import { Program } from "../types/entities/program";
import { SchoolProgram } from "../types/entities/school-program";

const API_URL = "/api/school-program/v1";

export const useUserGetCurrentSchoolPrograms = () => {
  const [loading, setLoading] = useState(false);

  const [notFound, setNotFound] = useState(false);
  const dispatch = useDispatch();

  const { axios } = useAxios();

  const userGetCurrentSchoolPrograms = async ({ id }: Payload) => {
    setNotFound(false);
    try {
      setLoading(true);
      const { data } = await axios.get<SingleItemResponseType<SchoolProgram[]>>(
        `${API_URL}/programs/${id}`
      );
      if (data.code === SUCCESS_CODE.SUCCESS) {
        dispatch(setCurrentSchoolPrograms(data.data));
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
    userGetCurrentSchoolPrograms,
    loading,
    notFound,
  };
};
