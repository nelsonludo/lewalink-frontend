import { ReactElement } from "react";
import { AuthInitialStateType } from "../store/auth.slice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { UserType } from "../types/entities/user";

type Props = {
  children: ReactElement;
};
const OnlyAdmins = ({ children }: Props) => {
  const { user }: AuthInitialStateType = useSelector(
    (state: any) => state.authSlice as AuthInitialStateType
  );

  if (user?.type !== UserType.Admin) {
    return <Navigate to={"/home"} replace />;
  }

  return children;
};

export default OnlyAdmins;
