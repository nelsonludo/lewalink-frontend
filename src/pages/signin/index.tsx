import { Link, useNavigate } from "react-router-dom";
import { LoginFormType } from "../../types/forms";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSignin } from "../../api/AuthApi";
import LoadingLargeButton from "../../components/loading/LoadingLargeButton";
import { useEffect } from "react";
import { AuthInitialStateType } from "../../store/auth.slice";
import { useSelector } from "react-redux";
import { FcGoogle } from "react-icons/fc";

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

  const { loading, signIn, googleSignIn } = useSignin();

  const navigate = useNavigate();

  const queryParams = new URLSearchParams(window.location.search);
  const urlParam = queryParams.get("url") as string; // Extract the 'url' query parameter

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
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link to={"/"}>
            <img
              alt="Your Company"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              className="mx-auto h-10 w-auto"
            />
          </Link>
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
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
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
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
                <Link
                  to="/forgot-password"
                  className="font-semibold text-indigo-600 hover:text-indigo-500 mt-1 text-sm"
                >
                  Forgot password
                </Link>
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
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                  {/* Google Button */}
                  <button
                    className="w-full flex items-center justify-center py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-blue-500 hover:text-white transition"
                    onClick={googleSignIn}
                  >
                    <FcGoogle className="mr-2 text-lg" />
                    Connexion avec Google
                  </button>
                </div>
              )}
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            No account yet?{" "}
            <Link
              to="/signup"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
