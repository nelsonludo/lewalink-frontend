// import { useSelector } from "react-redux";
import Router from "./Router";
// import { AuthInitialStateType } from "./store/auth.slice";

function LewalinkApp() {
  // const { loadingUser }: AuthInitialStateType = useSelector(
  //   (state: any) => state.authSlice
  // );

  // // This is where all the major initial requests should be made like get the current logged in user. Create an async function for that

  // const loadInitialAppData = async () => {};

  // if (loadingUser) {
  //   return <h1>This should be a full page loading</h1>;
  // }

  return <Router />;
}

export default LewalinkApp;
