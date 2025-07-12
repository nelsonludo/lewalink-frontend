import { useState } from "react";
import {
  MultipleItemsResponseType,
  SingleItemResponseType,
} from "../types/response/success-response-types";
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

interface GetSchoolRatingsParams {
  schoolId?: string; // Optional: filter by school ID
  ratingCount?: number; // Optional: filter by star count
  page?: number;
  itemsPerPage?: number;
}

export const useUserGetCurrentSchoolRating = () => {
  const [loading, setLoading] = useState(false);
  const [localCurrentSchoolRating, setlocalCurrentSchoolRating] = useState<
    SchoolRating[]
  >([]);

  const [notFound, setNotFound] = useState(false);
  const dispatch = useDispatch();

  const { axios } = useAxios();

  const userGetCurrentSchoolRating = async ({
    schoolId,
    ratingCount,
    page = 1,
    itemsPerPage = 10,
  }: GetSchoolRatingsParams) => {
    setNotFound(false);
    try {
      setLoading(true);
      const { data } = await axios.get<MultipleItemsResponseType<SchoolRating>>(
        `${API_URL}/${schoolId}`,
        {
          params: {
            ratingCount,
            page,
            itemsPerPage,
          },
        }
      );
      if (data.code === SUCCESS_CODE.SUCCESS) {
        setlocalCurrentSchoolRating(data.data);
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
    localCurrentSchoolRating,
  };
};
