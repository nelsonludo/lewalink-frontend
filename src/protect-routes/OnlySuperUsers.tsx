import { ReactElement } from "react";
import { AuthInitialStateType } from "../store/auth.slice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { UserType } from "../types/entities/user";

type Props = {
  children: ReactElement | ReactElement[];
};
const OnlySuperUsers = ({ children }: Props) => {
  const { user }: AuthInitialStateType = useSelector(
    (state: any) => state.authSlice as AuthInitialStateType
  );

  if (user === null) {
    return <Navigate to={"/signin"} replace />;
  }

  if (user?.type === UserType.Client) {
    return <Navigate to={"/unauthorized"} replace />;
  }

  return children;
};

export default OnlySuperUsers;
