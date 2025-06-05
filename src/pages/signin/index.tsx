import { Link, useNavigate } from "react-router-dom";
import { LoginFormType } from "../../types/forms";
import { SubmitHandler, useForm } from "react-hook-form";
import { useGoogleAuth, useSignin } from "../../api/AuthApi";
import LoadingLargeButton from "../../components/loading/LoadingLargeButton";
import { useEffect } from "react";
import { AuthInitialStateType } from "../../store/auth.slice";
import { useSelector } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";
import { failedToast } from "../../utils/toasts";
import AuthLayout from "../../components/AuthLayout";
import AuthInput from "../../components/inputs/AuthInputs";
import AuthButton from "../../components/Buttons/AuthButton";

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
    onSuccess: async (response: { code: string }) => {
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
    <AuthLayout
      title="Sign in"
      form={
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-md font-medium text-black"
            >
              Email
            </label>
            <div className="mt-2">
              <AuthInput
                type="email"
                placeholder=""
                register={register("email", {
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
              <span className="text-md text-red-700">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-md font-medium text-black"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <AuthInput
                type="password"
                placeholder=""
                register={register("password", {
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                  validate: {
                    minLength: (value) =>
                      value.length >= 4 || "Must be at least 4 characters long",
                    maxLength: (value) =>
                      value.length <= 20 ||
                      "Must be at most 20 characters long",
                  },
                })}
              />
            </div>
            {errors.password && (
              <span className="text-md text-red-700">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="my-10 space-y-8">
            <div>
              {loading ? (
                <LoadingLargeButton />
              ) : (
                <div className="grid gap-3">
                  <AuthButton type="submit" loading={false} variant="primary">
                    Sign in
                  </AuthButton>
                </div>
              )}
            </div>

            <div>
              {loadingGoogleAuth ? (
                <LoadingLargeButton />
              ) : (
                <div className="grid gap-3">
                  <AuthButton
                    type="button"
                    loading={false}
                    variant="google"
                    onClick={initiateGooglePopup}
                  >
                    Google
                  </AuthButton>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between">
            <Link
              to="/forgot-password"
              className="font-regular underline underline-offset-1 hover:text-indigo-500 mt-1 text-md"
            >
              Forgotten password
            </Link>
            <Link
              to="/signup"
              className="font-regular text-[#bb29ff] underline underline-offset-1 mt-1 text-md"
            >
              Sign up
            </Link>
          </div>
        </form>
      }
    />
  );
}
