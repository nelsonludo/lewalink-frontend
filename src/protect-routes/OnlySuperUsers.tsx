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

  if (user?.type === UserType.Client) {
    return <Navigate to={"/home"} replace />;
  }

  return children;
};

export default OnlySuperUsers;
