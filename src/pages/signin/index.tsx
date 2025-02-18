import { Link, useNavigate } from "react-router-dom";
import { LoginFormType } from "../../types/forms";
import { SubmitHandler, useForm } from "react-hook-form";
import { useGoogleAuth, useSignin } from "../../api/AuthApi";
import LoadingLargeButton from "../../components/loading/LoadingLargeButton";
import { useEffect } from "react";
import { AuthInitialStateType } from "../../store/auth.slice";
import { useSelector } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { failedToast } from "../../utils/toasts";

export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>();

  const { user }: AuthInitialStateType = useSelector(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: any) => state.authSlice as AuthInitialStateType
  );

  const { loading, signIn } = useSignin();
  const { loading: loadingGoogleAuth, googleAuth } = useGoogleAuth();

  const navigate = useNavigate();

  const queryParams = new URLSearchParams(window.location.search);
  const urlParam = queryParams.get("url") as string; // Extract the 'url' query parameter

  const initiateGooglePopup = useGoogleLogin({
    flow: "auth-code",
    redirect_uri: "http://localhost:5173",
    onSuccess: async (response: { code: string; }) => {
      let redirect: string;

      if (!urlParam || urlParam === "/signin" || urlParam === "signup") {
        redirect = "/home";
      } else {
        redirect = urlParam;
      }

      await googleAuth(response.code, redirect);
    },
    onError: () => {
      failedToast("Something went wrong");
    },
  });

  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    let redirect: string;

    if (!urlParam || urlParam === "/signin" || urlParam === "signup") {
      redirect = "/home";
    } else {
      redirect = urlParam;
    }

    await signIn(data, redirect);
  };

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
      <div className="flex justify-center align-center w-full h-screen items-center">

      
        <div className="w-[45%] inset-shadow-sm inset-shadow-purple-500 h-fit p-5">

          <div >
            <Link className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 flex justify-center items-center" to={"/"}>
              <div className="w-11 h-11 mr-2 bg-gray-100 shadow-lg shadow-purple-500">

              {/* <img
                alt=""
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                className="mx-auto h-10 w-auto"
              /> */}
              </div>
              <div className="bg-gray-100 py-1 px-5 shadow-lg shadow-purple-500">

              <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900 ">
              LewaLink
            </h2>
              </div>
            </Link>
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-purple-400">
              Sign in
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-500"
                >
                  Email
                </label>
                <div className="mt-2 ">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className="bg-white w-full border-2 border-purple-100 rounded-md py-3 px-6 text-gray-900 shadow-md shadow-purple-500 placeholder:text-gray-400  focus:border-purple-500 hover:border-purple-500 text-sm transition duration-300 "
                    {...register("email", {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "This should be an email",
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <span className=" text-red-700">{errors.email.message}</span>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium text-gray-500"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    className="bg-white w-full border-2 border-purple-100 rounded-md py-3 px-6 text-gray-900 shadow-md shadow-purple-500 placeholder:text-gray-400 utline-offset-2 outline-purple-500 focus:border-purple-500 hover:border-purple-500 text-sm transition duration-300 "
                    {...register("password", {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                      validate: {
                        minLength: (value) =>
                          value.length >= 4 ||
                          "Must be at least 4 characters long",
                        maxLength: (value) =>
                          value.length <= 20 ||
                          "Must be at most 20 characters long",
                      },
                    })}
                  />
                  
                </div>
                {errors.password && (
                  <span className=" text-red-700">{errors.password.message}</span>
                )}
              </div>

              <div>
                {loading ? (
                  <LoadingLargeButton />
                ) : (
                  <div className="grid gap-3">
                    <button
                      type="submit"
                      disabled={loadingGoogleAuth ? true : false}
                      className="flex w-full justify-center rounded-md bg-purple-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:scale-105 shadow-lg shadow-purple-500 transition duration-300"
                    >
                      Sign in
                    </button>
                  </div>
                )}
              </div>

              <div>
                {loadingGoogleAuth ? (
                  <LoadingLargeButton />
                ) : (
                  <div className="grid gap-3">
                    <button
                      type="button"
                      disabled={loading ? true : false}
                      className="w-full flex items-center justify-center py-2 bg-gray-100 text-sm/6 font-semibold text-purple-500 rounded-lg hover:scale-105 shadow-lg shadow-purple-500 transition duration-300"
                      onClick={initiateGooglePopup}
                    >
                      <FcGoogle className="mr-2 text-lg" />
                      Google
                    </button>
                  </div>
                )}
              </div>
              <div className="flex justify-between">

              <Link
                    to="/forgot-password"
                    className="font-regular underline underline-offset-1 hover:text-indigo-500 mt-1 text-sm"
                  >
                    Forgotten password
                  </Link>
              <Link
                    to="/signup"
                    className="font-regular text-purple-600 underline underline-offset-1  mt-1 text-sm"
                  >
                    Sign up
                  </Link>
              </div>
            </form>

          </div>
        </div>
      </div>
  );
}
