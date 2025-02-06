// import { useSelector } from "react-redux";
import { useSelector } from "react-redux";
import Router from "./Router";
import { AuthInitialStateType } from "./store/auth.slice";
import { useGetProfile } from "./api/AuthApi";
import { useEffect } from "react";
// import { AuthInitialStateType } from "./store/auth.slice";

function LewalinkApp() {
  const { loadingUser }: AuthInitialStateType = useSelector(
    (state: any) => state.authSlice
  );

  const { getProfile } = useGetProfile();

  const loadInitialAppData = async () => {
    getProfile();
  };

  useEffect(() => {
    loadInitialAppData();
  }, []);

  if (loadingUser) {
    return <h1>This should be a full page loading</h1>;
  }

  return <Router />;
}

export default LewalinkApp;
