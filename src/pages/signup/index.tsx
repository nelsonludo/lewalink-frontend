import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { CreateAccountFormType } from "../../types/forms";
import { useSignUp } from "../../api/AuthApi";
import LoadingLargeButton from "../../components/loading/LoadingLargeButton";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateAccountFormType>();

  const watchedPassword = watch("password");

  const { loading, signUp } = useSignUp();

  const onSubmit: SubmitHandler<CreateAccountFormType> = async (data) => {
    await signUp(data);
  };

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
              Sign up
            </h2>
          </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="fullname"
                className="block text-sm/6 font-medium text-gray-500"
              >
                Full name
              </label>
              <div className="mt-2">
                <input
                  id="fullname"
                  type="text"
                  autoComplete="fullname"
                  className="bg-white w-full border-2 border-purple-100 rounded-md py-3 px-6 text-gray-900 shadow-md shadow-purple-500 placeholder:text-gray-400  focus:border-purple-500 hover:border-purple-500 text-sm transition duration-300 "
                  {...register("name", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  })}
                />
              </div>
              {errors.name && (
                <span className=" text-red-700">{errors.name.message}</span>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-500"
              >
                Email address
              </label>
              <div className="mt-2">
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
                  className="bg-white w-full border-2 border-purple-100 rounded-md py-3 px-6 text-gray-900 shadow-md shadow-purple-500 placeholder:text-gray-400  focus:border-purple-500 hover:border-purple-500 text-sm transition duration-300 "
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
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirm-password"
                  className="block text-sm/6 font-medium text-gray-500"
                >
                  Confirm confirm-password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirm-password"
                  type="password"
                  autoComplete="current-confirm-password"
                  className="bg-white w-full border-2 border-purple-100 rounded-md py-3 px-6 text-gray-900 shadow-md shadow-purple-500 placeholder:text-gray-400  focus:border-purple-500 hover:border-purple-500 text-sm transition duration-300 "
                  {...register("confirmPassword", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                    validate: {
                      equals: (value) =>
                        value === watchedPassword || "passwords must match",
                    },
                  })}
                />
              </div>
              {errors.confirmPassword && (
                <span className=" text-red-700">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            <div>
              {loading ? (
                <LoadingLargeButton />
              ) : (
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-purple-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:scale-105 shadow-lg shadow-purple-500 transition duration-300"
                >
                  Sign up
                </button>
              )}
            </div>

            <div className="flex justify-end">
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
};

export default Signup;
