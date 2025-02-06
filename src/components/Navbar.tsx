import { useSelector } from "react-redux";
import { AuthInitialStateType } from "../store/auth.slice";

type Props = {};

const Navbar = ({}: Props) => {
  const { user }: AuthInitialStateType = useSelector(
    (state: any) => state.authSlice as AuthInitialStateType
  );
  return <div>Navbar {JSON.stringify(user)}</div>;
};

export default Navbar;
