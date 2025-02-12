import { useState } from "react";
import {
  MultipleItemsResponseType,
  SingleItemResponseType,
} from "../types/response/success-response-types";
import { AxiosError } from "axios";
import { ErrorResponseType } from "../types/response/error-response-type";
import useAxios from "../hooks/useAxios";
import { CODE, SUCCESS_CODE } from "../types/enums/error-codes";

import { displayErrorToastBasedOnCode } from "../utils/display-error-toast-based-on-code";
import { Payload, PayloadForm } from "../types/general";
import { failedToast, successToast } from "../utils/toasts";
import { ProgramCourse } from "../types/entities/program-course";

const API_URL = "/api/program-course/v1";

export const useSuperUserGetProgramCourses = () => {
  const [loading, setLoading] = useState(false);
  const [programCourses, setProgramCourses] = useState<ProgramCourse[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const { axios } = useAxios();

  const superUserGetProgramCourses = async ({
    page,
    itemsPerPage,
    id,
  }: Payload) => {
    try {
      setLoading(true);
      const { data } = await axios.get<
        MultipleItemsResponseType<ProgramCourse>
      >(
        `${API_URL}/super-user-get-courses/${id}?page=${page}&itemsPerPage=${itemsPerPage}`
      );
      if (data.code === SUCCESS_CODE.SUCCESS) {
        setProgramCourses(data.data);
        setTotalPages(data.totalPages);
      }
    } catch (err) {
      const error = err as AxiosError<ErrorResponseType>;
      const code = error.response?.data.code;

      console.log(error);

      displayErrorToastBasedOnCode(code);
    } finally {
      setLoading(false);
    }
  };

  return {
    superUserGetProgramCourses,
    loading,
    totalPages,
    programCourses,
    setProgramCourses,
  };
};
